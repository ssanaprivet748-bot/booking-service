import { Booking } from '@/types';

export async function sendBookingNotification(booking: Booking): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = `🆕 Новая заявка\nИмя: ${booking.name}\nТелефон: ${booking.phone}\nУслуга: ${booking.service}\nДата: ${booking.date}\nВремя: ${booking.time}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (e) {
    console.error('Telegram notification failed');
  }
}
