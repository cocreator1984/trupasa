"use client";
import { useTransition } from "react";

const locales = [
  { code: "en", label: "EN" },
  { code: "sv", label: "SV" },
  { code: "so", label: "SO" }
];

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();

  const setLocale = (code: string) => {
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}`;
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => setLocale(l.code)}
          disabled={isPending}
          className="text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded px-2 py-1"
          aria-label={`Switch language to ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
