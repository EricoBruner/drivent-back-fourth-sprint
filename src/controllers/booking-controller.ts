import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingService } from '@/services/booking-service';
import { notFoundError } from '@/errors';

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const roomId = req.body.roomId as number;

  if (!roomId) throw notFoundError();

  const bookingId = await bookingService.createBooking(userId, roomId);

  return res.status(httpStatus.OK).send({ bookingId: bookingId });
}

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const booking = await bookingService.findBooking(userId);

  if (!booking) throw notFoundError();

  return res.status(httpStatus.OK).send(booking);
}
