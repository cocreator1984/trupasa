import {getTranslations} from "next-intl/server";
import HowItWorks from "../components/HowItWorks";
import Architecture from "../components/Architecture";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import Logo from '../components/Logo';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Newsletter from '../components/Newsletter';

export default async function Home() {
  const t = await getTranslations('default');
  return (
    <main>
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="container flex items-center justify-between h-28 md:h-32">
          <div className="flex items-center gap-4">
            <Logo size="2xl" alt="Trupasa logo" />
            <span className="font-semibold text-xl md:text-2xl">{t('brand')}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#how" className="hover:text-gray-900">{t('nav.how')}</a>
            <a href="#architecture" className="hover:text-gray-900">{t('nav.architecture')}</a>
            <a href="#partners" className="hover:text-gray-900">{t('nav.partners')}</a>
            <a href="#insights" className="hover:text-gray-900">{t('nav.insights')}</a>
            <a href="#faqs" className="hover:text-gray-900">{t('nav.faqs')}</a>
            <a href="#contact" className="hover:text-gray-900">{t('nav.contact')}</a>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      <section className="bg-[var(--brand-navy)] text-white">
        <div className="container py-24 md:py-32">
          <div className="mb-8">
            <Logo size="3xl" alt="Trupasa emblem" priority />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl text-blue-100">
            {t('hero.sub')}
          </p>
          <div className="mt-10 flex gap-4">
            <a href="#newsletter" className="inline-block bg-[var(--trust-green)] hover:opacity-90 text-white px-6 py-3 rounded-md font-medium">
              {t('cta.join')}
            </a>
            <a href="#how" className="inline-block border border-white/30 hover:bg-white/10 px-6 py-3 rounded-md font-medium">
              {t('cta.how')}
            </a>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Architecture />
      <Partners />
      <Testimonials />

      <Newsletter />

      <section id="insights" className="bg-white">
        <div className="container py-20">
          <h2 className="text-3xl font-semibold">{t('insights.title')}</h2>
          <p className="text-gray-600 mt-2 max-w-3xl">{t('insights.subtitle')}</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <article key={i} className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="font-medium text-lg">{t(`insights.items.${i}.title` as any)}</h3>
                <p className="text-sm text-gray-600 mt-2">{t(`insights.items.${i}.excerpt` as any)}</p>
                <a href="#" className="inline-block mt-4 text-[var(--accent-blue)] hover:underline">{t('insights.readMore')}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="bg-white">
        <div className="container py-20">
          <h2 className="text-3xl font-semibold">{t('faqs.title')}</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4].map((i) => (
              <div key={i} className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="font-medium">{t(`faqs.${i}.q` as any)}</h3>
                <p className="text-sm text-gray-600 mt-2">{t(`faqs.${i}.a` as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white">
        <div className="container py-20">
          <h2 className="text-3xl font-semibold">{t('nav.contact')}</h2>
          <p className="text-gray-600 mt-2">Email: info@trupasa.org</p>
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="container py-8 text-sm text-gray-600 flex items-center justify-between">
          <span>{t('footer.copyright')}</span>
          <div className="flex gap-4">
            <a href="#" aria-label={t('footer.linkedin')}>{t('footer.linkedin')}</a>
            <a href="#" aria-label={t('footer.twitter')}>{t('footer.twitter')}</a>
            <a href="#" aria-label={t('footer.youtube')}>{t('footer.youtube')}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

