export type BookingFormData = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
};

export type BookingErrors = Partial<Record<keyof BookingFormData, string>>;

const PHONE_REGEX = /^\+7\d{10}$/;

export function validateBooking(data: BookingFormData): BookingErrors {
  const errors: BookingErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Имя должно быть не короче 2 символов';
  }

  if (!PHONE_REGEX.test(data.phone)) {
    errors.phone = 'Телефон в формате +7XXXXXXXXXX';
  }

  if (!data.service) {
    errors.service = 'Выберите услугу';
  }

  if (!data.date) {
    errors.date = 'Выберите дату';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(data.date) < today) {
      errors.date = 'Дата не может быть в прошлом';
    }
  }

  if (!data.time) {
    errors.time = 'Выберите время';
  } else {
    const [hours, minutes] = data.time.split(':').map(Number);
    const value = hours * 60 + minutes;
    if (value < 9 * 60 || value > 21 * 60) {
      errors.time = 'Время должно быть с 09:00 до 21:00';
    }
  }

  return errors;
}
