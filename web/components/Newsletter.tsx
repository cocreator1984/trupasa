"use client";
import {useState} from 'react';
import {useTranslations} from 'next-intl';

export default function Newsletter() {
  const t = useTranslations('default');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    // Honeypot check
    if ((formData.get('company') as string)?.length) {
      setStatus('success');
      return;
    }
    setStatus('loading');
    setError(null);
    const payload = {
      email: formData.get('email'),
      role: formData.get('role')
    };
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError('Something went wrong.');
    }
  }

  return (
    <section id="newsletter" className="bg-white">
      <div className="container py-20">
        <h2 className="text-3xl font-semibold">{t('newsletter.title')}</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">{t('newsletter.subtitle')}</p>
        <form className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4" onSubmit={onSubmit}>
          {/* Honeypot */}
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

          <label className="md:col-span-2">
            <span className="sr-only">{t('newsletter.email.label')}</span>
            <input name="email" type="email" required placeholder={t('newsletter.email.placeholder')} className="w-full rounded-md border px-4 py-3" />
          </label>
          <label className="md:col-span-2">
            <span className="sr-only">{t('newsletter.role.label')}</span>
            <select name="role" className="w-full rounded-md border px-4 py-3">
              <option value="gov">{t('newsletter.role.gov')}</option>
              <option value="inst">{t('newsletter.role.inst')}</option>
              <option value="dev">{t('newsletter.role.dev')}</option>
              <option value="gen">{t('newsletter.role.gen')}</option>
            </select>
          </label>
          <button className="md:col-span-1 bg-[var(--trust-green)] text-white rounded-md px-4 py-3 font-medium hover:opacity-90 disabled:opacity-60" type="submit" disabled={status==='loading'}>
            {t('newsletter.cta')}
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-4 text-sm text-green-700">{t('newsletter.success')}</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-sm text-red-700">{error}</p>
        )}
      </div>
    </section>
  );
}


