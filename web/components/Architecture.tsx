import {getTranslations} from "next-intl/server";

export default async function Architecture() {
  const t = await getTranslations();
  return (
    <section id="architecture" className="bg-white">
      <div className="container py-20">
        <h2 className="text-3xl font-semibold">{t('architecture.title')}</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">{t('architecture.subtitle')}</p>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="col-span-2 rounded-xl border bg-white p-6 h-64 flex items-center justify-center text-gray-500">
            {t('architecture.diagram.placeholder')}
          </div>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>• {t('architecture.points.1')}</li>
            <li>• {t('architecture.points.2')}</li>
            <li>• {t('architecture.points.3')}</li>
            <li>• {t('architecture.points.4')}</li>
            <li>• {t('architecture.points.5')}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
