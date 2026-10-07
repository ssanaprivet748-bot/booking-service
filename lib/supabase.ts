import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Публичный клиент — для браузера и клиентских компонентов. Только anon-права (RLS: insert).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Серверный клиент — только в API routes, обходит RLS. Никогда не импортировать в клиентский код!
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});
