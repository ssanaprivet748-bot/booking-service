import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() =>
            Promise.resolve({
              data: {
                id: '1',
                name: 'Иван',
                phone: '+79991234567',
                service: 'Стрижка',
                date: '2099-12-31',
                time: '14:00',
                status: 'new',
                created_at: '',
              },
              error: null,
            }),
          ),
        })),
      })),
    })),
  },
}));

vi.mock('@/lib/telegram', () => ({
  sendBookingNotification: vi.fn(() => Promise.resolve()),
}));

import { POST } from '@/app/api/bookings/route';
import { resetRateLimit } from '@/lib/rateLimit';

const validBody = {
  name: 'Иван',
  phone: '+79991234567',
  service: 'Стрижка',
  date: '2099-12-31',
  time: '14:00',
};

function makeRequest(body: unknown, ip = '1.2.3.4') {
  return new Request('http://localhost/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  });
}

describe('POST /api/bookings', () => {
  beforeEach(() => resetRateLimit());

  it('невалидные данные → 400', async () => {
    const res = await POST(makeRequest({ ...validBody, name: '' }));
    expect(res.status).toBe(400);
  });

  it('валидные данные → success', async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(201);
    expect((await res.json()).success).toBe(true);
  });

  it('4-я заявка с одного IP за час → 429', async () => {
    await POST(makeRequest(validBody, '9.9.9.9'));
    await POST(makeRequest(validBody, '9.9.9.9'));
    await POST(makeRequest(validBody, '9.9.9.9'));
    const res = await POST(makeRequest(validBody, '9.9.9.9'));
    expect(res.status).toBe(429);
  });

  it('запросы с разных IP не блокируются', async () => {
    await POST(makeRequest(validBody, '8.8.8.8'));
    const res = await POST(makeRequest(validBody, '7.7.7.7'));
    expect(res.status).toBe(201);
  });
});
