"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  function toggleTheme() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  }

  if (!mounted) return null;

  return (
    <button
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      onClick={toggleTheme}
      onMouseDown={(e) => e.preventDefault()}
      className="
        fixed top-4 right-4 z-40
        group overflow-hidden
        w-12 h-12 
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-xl shadow-lg dark:shadow-gray-900/20
        hover:shadow-xl dark:hover:shadow-gray-900/40
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        focus:outline-none focus-visible:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        select-none
        isolate
      "
      type="button"
    >
      <div
        className="
        absolute inset-0 
        bg-gradient-to-br from-yellow-400/20 to-orange-500/20 
        dark:from-blue-500/20 dark:to-purple-600/20
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        rounded-xl
      "
      />

      <div className="relative z-12 flex items-center justify-center w-full h-full">
        <svg
          className={`
            absolute w-5 h-5 text-yellow-600 dark:text-gray-400
            transition-all duration-500 ease-in-out
            ${
              isDark
                ? "opacity-0 rotate-90 scale-75"
                : "opacity-100 rotate-0 scale-100"
            }
          `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="5" strokeWidth={2} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.414-1.414M6.464 6.464L5.05 5.05m12.02 0l-1.414 1.414M6.464 17.536l-1.414 1.414"
          />
        </svg>

        <svg
          className={`
            absolute w-5 h-5 text-gray-400 dark:text-blue-400
            transition-all duration-500 ease-in-out
            ${
              isDark
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-75"
            }
          `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          />
        </svg>
      </div>

      <div
        className="
        absolute inset-0 
        bg-current opacity-0 
        rounded-xl
        group-active:opacity-10 group-active:animate-ping
        transition-opacity duration-200
      "
      />
    </button>
  );
}
