import { bookingRepository } from '@/repositories';

async function findBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);

  return booking;
}

export const bookingService = {
  findBooking,
};
