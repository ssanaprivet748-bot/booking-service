'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError('Неверный email или пароль');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full border border-stone-700 bg-stone-900 px-4 py-3 text-stone-100 placeholder:text-stone-600 focus:border-amber-400 focus:outline-none';

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold">Вход в админку</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="email"
          className={inputClass}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className={inputClass}
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full border-2 border-amber-400 bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-widest text-stone-950 transition hover:bg-transparent hover:text-amber-400 disabled:opacity-50"
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </main>
  );
}
