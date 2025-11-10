import {getTranslations} from "next-intl/server";

export default async function HowItWorks() {
  const t = await getTranslations('default');
  const steps = [
    {title: t('how.steps.1.title'), desc: t('how.steps.1.desc')},
    {title: t('how.steps.2.title'), desc: t('how.steps.2.desc')},
    {title: t('how.steps.3.title'), desc: t('how.steps.3.desc')},
    {title: t('how.steps.4.title'), desc: t('how.steps.4.desc')}
  ];
  return (
    <section id="how" className="bg-white">
      <div className="container py-20">
        <h2 className="text-3xl font-semibold">{t('how.title')}</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">{t('how.subtitle')}</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="h-10 w-10 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] flex items-center justify-center font-semibold">{i+1}</div>
              <h3 className="mt-4 font-medium text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

