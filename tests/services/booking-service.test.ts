import { init } from '@/app';
import { cleanDb } from '../helpers';
import { bookingService } from '@/services/booking-service';
import { enrollmentRepository, hotelRepository, ticketsRepository } from '@/repositories';

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe('createBooking', () => {
  it('Should throw notFoundError when not exist enrolment', () => {
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockImplementationOnce(() => {
      return undefined;
    });

    const promise = bookingService.createBooking(1, 1);
    expect(promise).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });

  it('Should throw notFoundError when not exist ticket', () => {
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockImplementationOnce((): any => {
      return {
        id: 1,
      };
    });

    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockImplementationOnce(() => {
      return undefined;
    });

    const promise = bookingService.createBooking(1, 1);
    expect(promise).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });

  it('Should throw notFoundError when not exist room', () => {
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockImplementationOnce((): any => {
      return {
        id: 1,
      };
    });

    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockImplementationOnce((): any => {
      return {
        id: 1,
      };
    });

    jest.spyOn(hotelRepository, 'findRoomWithBookingByRoomId').mockImplementationOnce(() => {
      return undefined;
    });

    const promise = bookingService.createBooking(1, 1);
    expect(promise).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });
});

describe('updateBooking', () => {
  it('Should throw notFoundError when not exist enrolment', () => {
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockImplementationOnce(() => {
      return undefined;
    });

    const promise = bookingService.updateBooking(1, 1, 1);
    expect(promise).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });

  it('Should throw notFoundError when not exist ticket', () => {
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockImplementationOnce((): any => {
      return {
        id: 1,
      };
    });

    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockImplementationOnce(() => {
      return undefined;
    });

    const promise = bookingService.updateBooking(1, 1, 1);
    expect(promise).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });

  it('Should throw notFoundError when not exist room', () => {
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockImplementationOnce((): any => {
      return {
        id: 1,
      };
    });

    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockImplementationOnce((): any => {
      return {
        id: 1,
      };
    });

    jest.spyOn(hotelRepository, 'findRoomWithBookingByRoomId').mockImplementationOnce(() => {
      return undefined;
    });

    const promise = bookingService.createBooking(1, 1);
    expect(promise).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });
});
