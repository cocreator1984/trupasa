export default async function Testimonials({ t }: { t: (k: string) => string }) {
  const items = [
    { q: t('testimonials.1.q'), a: t('testimonials.1.a') },
    { q: t('testimonials.2.q'), a: t('testimonials.2.a') }
  ];
  return (
    <section id="testimonials" className="bg-white">
      <div className="container py-20">
        <h2 className="text-3xl font-semibold">{t('testimonials.title')}</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((x, i) => (
            <figure key={i} className="rounded-lg border bg-white p-6 shadow-sm">
              <blockquote className="text-gray-800">"{x.q}"</blockquote>
              <figcaption className="mt-3 text-sm text-gray-600">{x.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
