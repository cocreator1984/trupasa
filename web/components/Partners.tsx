import {getTranslations} from "next-intl/server";

export default async function Partners() {
  const t = await getTranslations();
  const items = ['Partner A', 'Partner B', 'Partner C', 'Partner D', 'Partner E', 'Partner F'];
  return (
    <section id="partners" className="bg-white">
      <div className="container py-20">
        <h2 className="text-3xl font-semibold">{t('partners.title')}</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">{t('partners.subtitle')}</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {items.map((x) => (
            <div key={x} className="h-14 rounded-md border bg-gray-50 text-gray-500 flex items-center justify-center text-sm">
              {x}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
