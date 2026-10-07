export default function Footer() {
  return (
    <footer className="border-t border-stone-800 px-4 py-10 text-center">
      <div className="flex justify-center gap-8 text-sm uppercase tracking-widest text-stone-400">
        <a href="#" className="transition hover:text-amber-400">
          Telegram
        </a>
        <a href="#" className="transition hover:text-amber-400">
          VK
        </a>
        <a href="#" className="transition hover:text-amber-400">
          Instagram
        </a>
      </div>
      <p className="mt-6 text-xs text-stone-600">© 2026 Booking Service. Все права защищены.</p>
    </footer>
  );
}
