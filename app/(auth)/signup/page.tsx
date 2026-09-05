"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);

    const users = JSON.parse(localStorage.getItem("fittrack_users") || "{}");
    if (users[email]) {
      setError("Account already exists. Please log in.");
      setLoading(false);
      return;
    }

    users[email] = { password, name: email.split("@")[0], createdAt: Date.now() };
    localStorage.setItem("fittrack_users", JSON.stringify(users));
    localStorage.setItem("fittrack_user", JSON.stringify({ email, name: email.split("@")[0] }));
    router.push("/onboarding");
  };

  return (
    <div className="min-h-dvh flex flex-col justify-center px-6 py-10">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center overflow-hidden rounded-2xl bg-accent-soft">
            <Image src="/fittrack-logo-small.png" alt="FitTrack logo" width={48} height={48} priority sizes="48px" className="size-12 object-cover" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-text-secondary">Takes under a minute</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
              placeholder="At least 6 characters"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent py-3.5 font-semibold text-ink disabled:opacity-60 active:scale-[0.98] transition"
          >
            {loading ? "Creating..." : "Continue"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent">
            Log in
          </Link>
        </p>
      </div>
      <p className="mt-10 text-center text-xs text-text-muted">Developed by Muhammad Shoaib</p>
    </div>
  );
}
