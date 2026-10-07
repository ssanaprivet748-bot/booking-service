const services = [
  { num: '01', name: 'Стрижка', price: '1500₽', duration: '60 мин' },
  { num: '02', name: 'Борода', price: '1000₽', duration: '30 мин' },
  { num: '03', name: 'Комплекс', price: '2000₽', duration: '90 мин' },
];

export default function Services() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <h2 className="text-3xl font-bold sm:text-4xl">Услуги</h2>
      <div className="mt-10 divide-y divide-stone-800 border-y border-stone-800">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex items-baseline gap-4 py-6 transition hover:bg-stone-900/50 sm:gap-8"
          >
            <span className="text-sm text-stone-600">{service.num}</span>
            <h3 className="flex-1 text-xl font-semibold sm:text-2xl">{service.name}</h3>
            <span className="text-sm text-stone-500">{service.duration}</span>
            <span className="text-xl font-bold text-amber-400">{service.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
