import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { validateBooking } from '@/lib/validators';
import { checkRateLimit } from '@/lib/rateLimit';
import { sendBookingNotification } from '@/lib/telegram';
import { Booking } from '@/types';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 });
  }

  const data = body as Record<string, string>;

  const errors = validateBooking({
    name: data?.name ?? '',
    phone: data?.phone ?? '',
    service: data?.service ?? '',
    date: data?.date ?? '',
    time: data?.time ?? '',
  });
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: Object.values(errors)[0] }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Слишком много заявок. Попробуйте позже.' }, { status: 429 });
  }

  // Данные передаются параметрически — Supabase сам формирует параметризованный SQL, без конкатенации строк
  const { data: inserted, error } = await supabaseAdmin
    .from('bookings')
    .insert({
      name: data.name,
      phone: data.phone,
      service: data.service,
      date: data.date,
      time: data.time,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Не удалось сохранить заявку' }, { status: 500 });
  }

  await sendBookingNotification(inserted as Booking);

  return NextResponse.json({ success: true }, { status: 201 });
}
