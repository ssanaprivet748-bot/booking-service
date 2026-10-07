export type BookingStatus = 'new' | 'confirmed' | 'done' | 'cancelled';

export type Booking = {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: BookingStatus;
  created_at: string;
};

export type NewBooking = Omit<Booking, 'id' | 'status' | 'created_at'>;
