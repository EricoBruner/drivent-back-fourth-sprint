import { createBooking, getBooking } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', getBooking).post('/', createBooking);

export { bookingRouter };
