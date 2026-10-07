'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Booking, BookingStatus } from '@/types';

const STATUS_STYLES: Record<BookingStatus, string> = {
  new: 'bg-yellow-500/20 text-yellow-300',
  confirmed: 'bg-blue-500/20 text-blue-300',
  done: 'bg-emerald-500/20 text-emerald-300',
  cancelled: 'bg-stone-500/20 text-stone-400',
};

const STATUS_LABELS: Record<BookingStatus, string> = {
  new: 'новая',
  confirmed: 'подтверждена',
  done: 'выполнена',
  cancelled: 'отменена',
};

type DateFilter = 'all' | 'today' | 'week';

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [error, setError] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const now = new Date();
  const filtered = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    const d = new Date(b.date);
    if (dateFilter === 'today') {
      if (d.toDateString() !== now.toDateString()) return false;
    }
    if (dateFilter === 'week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      if (d < weekAgo) return false;
    }
    return true;
  });

  async function setStatus(id: string, status: BookingStatus) {
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (error) setError('Не удалось обновить статус');
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm('Удалить заявку? Это действие необратимо.')) return;
    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) setError('Не удалось удалить заявку');
    router.refresh();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  const selectClass = 'border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-200';

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <select
          className={selectClass}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value as DateFilter)}
        >
          <option value="all">Все даты</option>
          <option value="today">Сегодня</option>
          <option value="week">Неделя</option>
        </select>
        <select
          className={selectClass}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'all')}
        >
          <option value="all">Все статусы</option>
          <option value="new">new</option>
          <option value="confirmed">confirmed</option>
          <option value="done">done</option>
          <option value="cancelled">cancelled</option>
        </select>
        <button
          onClick={logout}
          className="ml-auto border border-stone-700 px-4 py-2 text-sm text-stone-300 transition hover:border-amber-400 hover:text-amber-400"
        >
          Выйти
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-800 text-left text-stone-500">
              <th className="py-3 pr-4">Имя</th>
              <th className="py-3 pr-4">Телефон</th>
              <th className="py-3 pr-4">Услуга</th>
              <th className="py-3 pr-4">Дата</th>
              <th className="py-3 pr-4">Время</th>
              <th className="py-3 pr-4">Статус</th>
              <th className="py-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-stone-900">
                <td className="py-3 pr-4">{b.name}</td>
                <td className="py-3 pr-4">{b.phone}</td>
                <td className="py-3 pr-4">{b.service}</td>
                <td className="py-3 pr-4">{b.date}</td>
                <td className="py-3 pr-4">{b.time}</td>
                <td className="py-3 pr-4">
                  <span className={`rounded px-2 py-1 text-xs ${STATUS_STYLES[b.status]}`}>
                    {STATUS_LABELS[b.status]}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex gap-2">
                    {b.status !== 'confirmed' && (
                      <button
                        onClick={() => setStatus(b.id, 'confirmed')}
                        className="text-xs text-blue-400 hover:underline"
                      >
                        Подтвердить
                      </button>
                    )}
                    {b.status !== 'done' && (
                      <button
                        onClick={() => setStatus(b.id, 'done')}
                        className="text-xs text-emerald-400 hover:underline"
                      >
                        Выполнить
                      </button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button
                        onClick={() => setStatus(b.id, 'cancelled')}
                        className="text-xs text-stone-400 hover:underline"
                      >
                        Отменить
                      </button>
                    )}
                    <button
                      onClick={() => remove(b.id)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-stone-600">
                  Заявок не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
