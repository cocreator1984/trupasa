"use client";
import Link from 'next/link';
import {useLocale} from 'next-intl';

const locales = [
  { code: "en", label: "EN" },
  { code: "sv", label: "SV" },
  { code: "so", label: "SO" }
];

export default function LanguageSwitcher() {
  const active = useLocale();
  return (
    <div className="flex items-center gap-2">
      {locales.map((l) => {
        const isActive = active === l.code;
        return (
          <Link
            key={l.code}
            href={`/${l.code}/`}
            prefetch={false}
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
          </Link>
        );
      })}
    </div>
  );
}
