import { prisma } from '@/config';

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
};
