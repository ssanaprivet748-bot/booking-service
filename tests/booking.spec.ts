import { describe, it, expect } from 'vitest';
import { validateBooking } from '@/lib/validators';

const valid = {
  name: 'Иван',
  phone: '+79991234567',
  service: 'Стрижка',
  date: '2099-12-31',
  time: '14:00',
};

describe('validateBooking', () => {
  it('пустое имя → ошибка', () => {
    const errors = validateBooking({ ...valid, name: '' });
    expect(errors.name).toBeTruthy();
  });

  it('короткое имя → ошибка', () => {
    const errors = validateBooking({ ...valid, name: 'Я' });
    expect(errors.name).toBeTruthy();
  });

  it('кривой телефон → ошибка', () => {
    const errors = validateBooking({ ...valid, phone: '89991234567' });
    expect(errors.phone).toBeTruthy();
  });

  it('прошедшая дата → ошибка', () => {
    const errors = validateBooking({ ...valid, date: '2020-01-01' });
    expect(errors.date).toBeTruthy();
  });

  it('время вне диапазона 09:00–21:00 → ошибка', () => {
    expect(validateBooking({ ...valid, time: '08:00' }).time).toBeTruthy();
    expect(validateBooking({ ...valid, time: '22:00' }).time).toBeTruthy();
  });

  it('валидные данные → нет ошибок', () => {
    const errors = validateBooking(valid);
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
