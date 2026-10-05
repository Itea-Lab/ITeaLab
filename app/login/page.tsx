"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/app/components/lib/supabase";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admindeptrai";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Unexpected error during login.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-8 shadow-2xl relative">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-light-green transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to website
      </Link>

      <div className="mb-6">
        <h1 className="font-michroma text-2xl font-bold text-background-light mb-2">
          Management Portal
        </h1>
        <p className="text-sm text-gray-400">
          Sign in to manage ITeaLab content
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-950/50 border border-red-800 rounded text-red-300 text-sm flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
            Username
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@itealab.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-background-light placeholder-gray-600 focus:outline-none focus:border-light-green transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-background-light placeholder-gray-600 focus:outline-none focus:border-light-green transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-light-green text-background font-semibold py-2.5 px-4 rounded-lg hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-background-light flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
