import Image from 'next/image';

const services = [
  {
    num: '01',
    name: 'Стрижка',
    price: '1500₽',
    duration: '60 мин',
    image: '/images/service-haircut.jpg',
  },
  { num: '02', name: 'Борода', price: '1000₽', duration: '30 мин', image: '/images/service-beard.jpg' },
  {
    num: '03',
    name: 'Комплекс',
    price: '2000₽',
    duration: '90 мин',
    image: '/images/service-complex.jpg',
  },
];

export default function Services() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <h2 className="text-3xl font-bold sm:text-4xl">Услуги</h2>
      <div className="mt-10 divide-y divide-stone-800 border-y border-stone-800">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex flex-col gap-4 border-b border-stone-800 py-6 transition hover:bg-stone-900/50 sm:flex-row sm:items-center sm:gap-8"
          >
            <Image
              src={service.image}
              alt={service.name}
              width={120}
              height={80}
              className="h-20 w-full object-cover sm:w-28"
            />
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
