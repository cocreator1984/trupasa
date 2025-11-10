"use client";
import { useTransition } from "react";
import {useLocale} from 'next-intl';

const locales = [
  { code: "en", label: "EN" },
  { code: "sv", label: "SV" },
  { code: "so", label: "SO" }
];

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const active = useLocale();

  const setLocale = (code: string) => {
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}`;
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((l) => {
        const isActive = active === l.code;
        return (
          <button
            key={l.code}
            onClick={() => setLocale(l.code)}
            disabled={isPending}
            aria-pressed={isActive}
            aria-current={isActive ? 'true' : undefined}
            className={
              `text-sm rounded px-2 py-1 border ${
                isActive
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'text-gray-600 hover:text-gray-900 border-gray-200'
              }`
            }
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
