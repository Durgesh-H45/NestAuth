'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Lock, UserCheck, Zap, ArrowRight, Server, KeyRound, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20">
      <div className="max-w-4xl w-full mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Connected to NestJS + Prisma backend on Render</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Full-Stack Auth Interface <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Next.js &bull; NestJS &bull; Prisma
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed">
            A clean, secure authentication frontend communicating with your NestJS 10 API.
            Includes zero-CORS route proxies, httpOnly cookie token storage, and proactive Render
            cold-start handling.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {loading ? (
            <div className="h-11 w-44 rounded-xl bg-zinc-800 animate-pulse" />
          ) : user ? (
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/30 transition-all text-sm group"
            >
              <UserCheck className="w-4 h-4" />
              <span>Go to Profile Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/30 transition-all text-sm group"
              >
                <Lock className="w-4 h-4" />
                <span>Log In</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-medium transition-all text-sm"
              >
                <KeyRound className="w-4 h-4 text-indigo-400" />
                <span>Create Account</span>
              </Link>
            </>
          )}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 text-left">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-white text-sm">httpOnly Cookies</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              JWT tokens are stored securely in httpOnly cookies via Next.js Route Handlers, completely safe from XSS.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-800/50 flex items-center justify-center text-amber-400">
              <Server className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-white text-sm">Cold Start Resilient</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Equipped with live countdowns, timeout extension, and status banners for Render&apos;s 30–50s spin-up cycle.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-white text-sm">Roles Guard Verified</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Validates your NestJS <code className="text-emerald-400">@Roles(Role.User)</code> and <code className="text-emerald-400">AuthGuard</code> on the protected profile route.
            </p>
          </div>
        </div>

        {/* Endpoints check table */}
        <div className="mt-8 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 text-left">
          <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
            Connected NestJS Endpoints
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/50">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded font-mono font-bold bg-blue-950 text-blue-400 border border-blue-800 text-[10px]">
                  POST
                </span>
                <span className="font-mono text-zinc-200">/users/signup</span>
              </div>
              <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Wired
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/50">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                  POST
                </span>
                <span className="font-mono text-zinc-200">/users/login</span>
              </div>
              <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Wired
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/50">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded font-mono font-bold bg-purple-950 text-purple-400 border border-purple-800 text-[10px]">
                  GET
                </span>
                <span className="font-mono text-zinc-200">/users/profile</span>
              </div>
              <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Guard Protected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
