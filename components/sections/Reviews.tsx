const reviews = [
  {
    author: 'Андрей',
    text: 'Записался на стрижку с телефона за минуту. Мастер позвонил и подтвердил запись — очень удобно.',
  },
  {
    author: 'Мария',
    text: 'Нравится, что не нужно звонить. Выбрала время онлайн и просто пришла к назначенному часу.',
  },
  {
    author: 'Дмитрий',
    text: 'Хожу на комплекс уже полгода. Всегда есть удобные слоты, а качество стабильно отличное.',
  },
];

export default function Reviews() {
  return (
    <section className="border-t border-stone-800 bg-stone-950 px-4 py-16 sm:py-24">
      <h2 className="text-3xl font-bold sm:text-4xl">Отзывы</h2>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {reviews.map((review) => (
          <figure key={review.author} className="border-l-2 border-amber-400 pl-5">
            <blockquote className="text-stone-300">«{review.text}»</blockquote>
            <figcaption className="mt-4 text-sm font-bold uppercase tracking-widest text-stone-500">
              {review.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
