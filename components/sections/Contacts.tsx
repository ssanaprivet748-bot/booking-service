export default function Contacts() {
  return (
    <section className="border-t border-stone-800 px-4 py-16 sm:py-24">
      <h2 className="text-3xl font-bold sm:text-4xl">Контакты</h2>
      <div className="mt-10 max-w-md space-y-4 text-stone-300">
        <p>
          <span className="block text-xs uppercase tracking-widest text-stone-500">Адрес</span>
          г. Москва, ул. Примерная, д. 12
        </p>
        <p>
          <span className="block text-xs uppercase tracking-widest text-stone-500">Телефон</span>
          +7 (999) 123-45-67
        </p>
        <p>
          <span className="block text-xs uppercase tracking-widest text-stone-500">
            Время работы
          </span>
          Ежедневно с 10:00 до 21:00
        </p>
      </div>
    </section>
  );
}
