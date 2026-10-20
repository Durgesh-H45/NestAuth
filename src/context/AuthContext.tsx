'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { UserProfile, SignupPayload, LoginPayload } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  coldStarting: boolean;
  pendingSeconds: number;
  login: (payload: LoginPayload) => Promise<{ success: boolean; error?: string }>;
  signup: (payload: SignupPayload) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [coldStarting, setColdStarting] = useState<boolean>(false);
  const [pendingSeconds, setPendingSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const coldStartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const startColdStartTracking = () => {
    setPendingSeconds(0);
    // If request takes > 2.5s, trigger cold start indicator
    coldStartTimeoutRef.current = setTimeout(() => {
      setColdStarting(true);
      timerRef.current = setInterval(() => {
        setPendingSeconds((prev) => prev + 1);
      }, 1000);
    }, 2500);
  };

  const stopColdStartTracking = () => {
    if (coldStartTimeoutRef.current) clearTimeout(coldStartTimeoutRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setColdStarting(false);
    setPendingSeconds(0);
  };

  const refreshProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/profile');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.user) {
          setUser(json.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const login = async (payload: LoginPayload): Promise<{ success: boolean; error?: string }> => {
    startColdStartTracking();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Login failed' };
      }

      await refreshProfile();
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Network error occurred',
      };
    } finally {
      stopColdStartTracking();
    }
  };

  const signup = async (payload: SignupPayload): Promise<{ success: boolean; error?: string }> => {
    startColdStartTracking();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Signup failed' };
      }

      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Network error occurred',
      };
    } finally {
      stopColdStartTracking();
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    } finally {
      setUser(null);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        coldStarting,
        pendingSeconds,
        login,
        signup,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
