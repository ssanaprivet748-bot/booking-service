import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stone-800 px-4 py-20 sm:py-32">
      <Image
        src="/images/hero.jpg"
        alt="Барбершоп"
        fill
        priority
        className="object-cover opacity-30"
      />
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="relative">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
        Барбершоп • Москва
      </p>
      <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-none text-stone-100 sm:text-7xl">
        Booking
        <br />
        <span className="text-amber-400">Service</span>
      </h1>
      <p className="mt-6 max-w-md text-base text-stone-400 sm:text-lg">
        Запись к мастеру за 30 секунд. Без звонков, без переписок — выбрал время и пришёл.
      </p>
      <Link
        href="/book"
        className="mt-10 inline-block border-2 border-amber-400 px-10 py-4 text-sm font-bold uppercase tracking-widest text-amber-400 transition hover:bg-amber-400 hover:text-stone-950"
      >
        Записаться
      </Link>
      </div>
    </section>
  );
}
