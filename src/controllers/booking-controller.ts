import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function findBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const booking = await bookingService.findBooking(req.userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const roomId: number = req.body.roomId;
  try {
    const booking = await bookingService.createBooking(req.userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
    if (error.name === 'ForbiddenError') return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const roomId = req.params.roomId;
  try {
    const updatedBooking = await bookingService.createBooking(req.userId, Number(roomId));
    return res.status(httpStatus.OK).send({ bookingId: updatedBooking.id });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
    if (error.name === 'ForbiddenError') return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}
