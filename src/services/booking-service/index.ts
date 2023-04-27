import { forbiddenError, notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function findBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function createBooking(userId: number, roomId: number) {
  const data = await enrollmentRepository.findWithTicketByUserId(userId);
  if (!data || !data.Ticket[0]) throw forbiddenError('User cannot book a room without enrollment and ticket');

  const ticket = data.Ticket[0];
  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw forbiddenError('Cannot book hotel for this ticket');

  const room = await bookingRepository.findRoomById(roomId);
  if (!room) throw notFoundError();
  if (room.Booking.length >= room.capacity) throw forbiddenError('No vacancies!');

  const booking = await bookingRepository.createBooking(userId, roomId);
  return booking;
}

async function updateBooking(userId: number, roomId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if (!booking) throw forbiddenError('User has no booking available!');

  const room = await bookingRepository.findRoomById(roomId);
  if (!room) throw notFoundError();
  if (room.Booking.length >= room.capacity) throw forbiddenError('No vacancies!');

  const updatedBooking = await bookingRepository.updateBooking(booking.id, roomId);
  return updatedBooking;
}

const bookingService = {
  findBooking,
  createBooking,
  updateBooking,
};

export default bookingService;
