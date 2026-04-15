"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

interface SearchBarProps {
  account: string;
  filter: string;
  q: string;
}

export default function SearchBar({ account, filter, q }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = inputRef.current?.value.trim() ?? "";
    const params = new URLSearchParams({ filter, page: "1" });
    if (value) params.set("q", value);
    router.push(`/${account}?${params.toString()}`);
  }

  function handleClear() {
    if (inputRef.current) inputRef.current.value = "";
    const params = new URLSearchParams({ filter, page: "1" });
    router.push(`/${account}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 max-w-lg">
      <div className="relative flex-1">
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          defaultValue={q}
          placeholder="Search emails…"
          className="w-full pl-8 pr-7 py-1.5 text-sm rounded border border-teal-100 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-teal-400 focus:border-teal-400 placeholder:text-slate-300"
        />
        {q && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-3 py-1.5 text-xs font-medium rounded border border-teal-100 text-slate-500 hover:bg-slate-100 transition-colors duration-150 cursor-pointer shrink-0"
      >
        Search
      </button>
    </form>
  );
}
