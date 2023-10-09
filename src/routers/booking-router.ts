import { createBooking, getBooking, putBooking } from '@/controllers';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { bookingBodySchema, bookingParamsSchema } from '@/schemas/booking-schemas';
import { Router } from 'express';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', validateBody(bookingBodySchema), createBooking)
  .put('/:bookingId', validateBody(bookingBodySchema), validateParams(bookingParamsSchema), putBooking);

export { bookingRouter };
