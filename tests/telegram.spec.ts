import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendBookingNotification } from '@/lib/telegram';

const booking = {
  id: '1',
  name: 'Иван',
  phone: '+79991234567',
  service: 'Стрижка',
  date: '2026-10-15',
  time: '14:00',
  status: 'new' as const,
  created_at: '',
};

describe('sendBookingNotification', () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = 'test-token';
    process.env.TELEGRAM_CHAT_ID = '12345';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('отправляет сообщение в Telegram с нужным текстом', async () => {
    const fetchMock = vi.fn(() => Promise.resolve(new Response('{}', { status: 200 })));
    vi.stubGlobal('fetch', fetchMock);

    await sendBookingNotification(booking);

    expect(fetchMock).toHaveBeenCalledOnce();
    const call = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    const [url, init] = call;
    expect(String(url)).toContain('api.telegram.org/bottest-token/sendMessage');
    const body = JSON.parse(String(init?.body));
    expect(body.chat_id).toBe('12345');
    expect(body.text).toContain('Иван');
    expect(body.text).toContain('+79991234567');
    expect(body.text).toContain('Стрижка');
    expect(body.text).toContain('2026-10-15');
    expect(body.text).toContain('14:00');
  });

  it('ошибка Telegram не ломает основной поток', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('network down'))));
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(sendBookingNotification(booking)).resolves.toBeUndefined();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('без токенов — ничего не отправляет', async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await sendBookingNotification(booking);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
