"use client";

import { LoginForm } from "@/components/login/login-form";

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-br from-white to-red-50 dark:from-zinc-900 dark:to-zinc-950 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
