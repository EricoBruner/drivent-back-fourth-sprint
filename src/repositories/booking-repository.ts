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

export const bookingRepository = {
  findBooking,
  createBooking,
};
