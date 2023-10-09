import { prisma } from '@/config';

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId,
    },
  });
}

async function findBooking(userId: number) {
  return prisma.booking.findUnique({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function updateBooking(roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId: roomId,
    },
  });
}

export const bookingRepository = {
  findBooking,
  createBooking,
  updateBooking,
};
