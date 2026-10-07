'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateBooking, BookingErrors } from '@/lib/validators';

const SERVICES = ['Стрижка', 'Борода', 'Комплекс'];

export default function BookPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState<BookingErrors>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');

    const data = { name, phone, service, date, time };
    const validationErrors = validateBooking(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert('Мы вам перезвоним');
        router.push('/');
      } else {
        const body = await res.json().catch(() => ({}));
        setServerError(body.error ?? 'Не удалось отправить заявку. Попробуйте ещё раз.');
      }
    } catch {
      setServerError('Ошибка сети. Проверьте подключение и попробуйте снова.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full border border-stone-700 bg-stone-900 px-4 py-3 text-stone-100 placeholder:text-stone-600 focus:border-amber-400 focus:outline-none';

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Записаться</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
        <div>
          <input
            className={inputClass}
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>
        <div>
          <input
            className={inputClass}
            placeholder="+79991234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
        </div>
        <div>
          <select
            className={inputClass}
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">Выберите услугу</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-sm text-red-400">{errors.service}</p>}
        </div>
        <div>
          <input
            type="date"
            className={inputClass}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <p className="mt-1 text-sm text-red-400">{errors.date}</p>}
        </div>
        <div>
          <input
            type="time"
            className={inputClass}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          {errors.time && <p className="mt-1 text-sm text-red-400">{errors.time}</p>}
        </div>
        {serverError && <p className="text-sm text-red-400">{serverError}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full border-2 border-amber-400 bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-widest text-stone-950 transition hover:bg-transparent hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Отправка...' : 'Отправить заявку'}
        </button>
      </form>
    </main>
  );
}
