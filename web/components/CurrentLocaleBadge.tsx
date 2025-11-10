"use client";
import {useLocale} from 'next-intl';

export default function CurrentLocaleBadge() {
  const locale = useLocale();
  return (
    <span
      className="ml-2 inline-flex items-center rounded-full border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-600"
      title={`Current locale: ${locale}`}
    >
      locale: {locale.toUpperCase()}
    </span>
  );
}
