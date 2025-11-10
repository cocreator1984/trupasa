"use client";
import {useEffect, useState} from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const has = document.cookie.split('; ').find((x) => x.startsWith('cookie_consent='));
    if (!has) setVisible(true);
  }, []);

  function accept() {
    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `cookie_consent=true; path=/; max-age=${oneYear}`;
    setVisible(false);
  }

  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,680px)] rounded-lg border bg-white shadow-lg">
      <div className="p-4 text-sm text-gray-700">
        We use cookies for analytics as described in our privacy policy. You can withdraw consent anytime.
      </div>
      <div className="p-3 pt-0 flex justify-end gap-2">
        <button onClick={accept} className="bg-[var(--accent-blue)] text-white rounded px-3 py-2 text-sm">I Agree</button>
      </div>
    </div>
  );
}
