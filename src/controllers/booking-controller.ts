import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingService } from '@/services/booking-service';
import { notFoundError } from '@/errors';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const booking = await bookingService.findBooking(userId);

  if (!booking) throw notFoundError();

  res.status(httpStatus.OK).send(booking);
}
