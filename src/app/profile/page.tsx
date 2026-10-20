'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  Shield,
  Clock,
  RefreshCw,
  LogOut,
  Code,
  CheckCircle2,
  Calendar,
  Key,
  Hash,
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, refreshProfile, logout } = useAuth();
  const [refetching, setRefetching] = useState(false);
  const [lastRefetchLatency, setLastRefetchLatency] = useState<number | null>(null);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleRefetch = async () => {
    setRefetching(true);
    const start = Date.now();
    await refreshProfile();
    setLastRefetchLatency(Date.now() - start);
    setRefetching(false);
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getExpirationStatus = (exp?: number) => {
    if (!exp) return null;
    const now = Math.floor(Date.now() / 1000);
    const diff = exp - now;
    if (diff <= 0) return { label: 'Expired', color: 'text-rose-400 bg-rose-950 border-rose-800' };
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    return {
      label: `Valid (${hours}h ${minutes}m left)`,
      color: 'text-emerald-400 bg-emerald-950 border-emerald-800',
    };
  };

  if (loading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin text-indigo-400 mx-auto" />
          <p className="text-xs text-zinc-400">Verifying session with NestJS guards...</p>
        </div>
      </div>
    );
  }

  const expStatus = getExpirationStatus(user.exp);

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-purple-950/40 to-zinc-900 border border-indigo-900/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{user.email}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-900/80 text-indigo-300 border border-indigo-700/60 uppercase">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Authenticated via NestJS <code className="text-zinc-300">AuthGuard</code> +{' '}
              <code className="text-zinc-300">RolesGuard</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={handleRefetch}
            disabled={refetching}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-zinc-600 text-zinc-200 text-xs font-medium transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refetching ? 'animate-spin text-indigo-400' : ''}`} />
            <span>Refetch</span>
          </button>
          <button
            onClick={() => logout()}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/60 border border-rose-800/80 hover:bg-rose-900/80 text-rose-300 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {lastRefetchLatency !== null && (
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
          <span>Profile endpoint re-verified with Render backend:</span>
          <span className="font-mono text-emerald-400 font-semibold">{lastRefetchLatency}ms</span>
        </div>
      )}

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Card */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            User Identity
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/60">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-zinc-500" /> User ID:
              </span>
              <span className="font-mono font-medium text-zinc-200">#{user.id}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-zinc-800/60">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-zinc-500" /> Email Address:
              </span>
              <span className="font-mono font-medium text-zinc-200">{user.email}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-zinc-500" /> Authorization Role:
              </span>
              <span className="font-mono font-semibold text-emerald-400 uppercase">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Token Card */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            JWT Session Lifecycle
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/60">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" /> Issued At (iat):
              </span>
              <span className="font-mono text-zinc-200">{formatDate(user.iat)}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-zinc-800/60">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-500" /> Expires At (exp):
              </span>
              <span className="font-mono text-zinc-200">{formatDate(user.exp)}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-zinc-400">Token Status:</span>
              {expStatus && (
                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] border font-medium ${expStatus.color}`}
                >
                  {expStatus.label}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Raw Payload Inspector */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowJson(!showJson)}
          className="w-full px-6 py-4 flex items-center justify-between text-left text-xs font-semibold text-zinc-300 hover:bg-zinc-800/40 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Code className="w-4 h-4 text-indigo-400" />
            Inspect Decoded JWT Payload (req.user returned by /users/profile)
          </span>
          <span className="text-zinc-500 font-mono text-[11px]">
            {showJson ? '▲ Hide' : '▼ Show JSON'}
          </span>
        </button>

        {showJson && (
          <div className="p-4 bg-zinc-950 border-t border-zinc-800">
            <pre className="text-xs font-mono text-emerald-400 overflow-x-auto p-4 rounded-xl bg-black/60 border border-zinc-900">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Architecture note */}
      <div className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 text-xs text-zinc-400 space-y-1">
        <p className="font-semibold text-zinc-300">How authentication works here:</p>
        <p>
          1. Next.js server proxies login requests to NestJS <code className="text-zinc-300">/users/login</code>.
        </p>
        <p>
          2. The returned <code className="text-zinc-300">accessToken</code> is saved in an <code className="text-indigo-400">httpOnly</code> cookie (inaccessible to malicious client scripts).
        </p>
        <p>
          3. When loading the profile, Next.js server passes the token in <code className="text-zinc-300">Authorization: Bearer &lt;token&gt;</code> to <code className="text-zinc-300">/users/profile</code>, which executes NestJS <code className="text-zinc-300">AuthGuard</code> and <code className="text-zinc-300">RolesGuard</code>.
        </p>
      </div>
    </div>
  );
}
