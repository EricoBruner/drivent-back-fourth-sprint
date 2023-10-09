import { cannotBookingError, notFoundError, unauthorizedError } from '@/errors';
import { bookingRepository, enrollmentRepository, hotelRepository, ticketsRepository } from '@/repositories';
import { TicketStatus } from '@prisma/client';

async function validateUserBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  const room = await hotelRepository.findRoomWithBookingByRoomId(roomId);
  if (!room) throw notFoundError();

  const reserved = room.Booking.length + 1;

  if (room.capacity < reserved) {
    throw cannotBookingError();
  }

  const type = ticket.TicketType;

  if (ticket.status === TicketStatus.RESERVED || type.isRemote || !type.includesHotel) {
    throw cannotBookingError();
  }
}

async function createBooking(userId: number, roomId: number) {
  await validateUserBooking(userId, roomId);

  const { id } = await bookingRepository.createBooking(userId, roomId);

  return id;
}

async function findBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);

  return booking;
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  await validateUserBooking(userId, roomId);

  const booking = await bookingRepository.findBooking(userId);
  if (booking.id != bookingId) throw unauthorizedError();

  const { id } = await bookingRepository.updateBooking(roomId, bookingId);

  return id;
}

export const bookingService = {
  createBooking,
  findBooking,
  updateBooking,
};
