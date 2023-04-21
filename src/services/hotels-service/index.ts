import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function verifyData(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status !== 'PAID') throw paymentRequiredError();
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw paymentRequiredError();
}

async function findAllHotels(userId: number) {
  await verifyData(userId);

  const hotels = await hotelsRepository.findAllHotels();
  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

async function findHotelWithRooms(userId: number, hotelId: number) {
  await verifyData(userId);

  const hotelWithRooms = await hotelsRepository.findHotelWithRooms(hotelId);
  if (!hotelWithRooms) throw notFoundError();

  return hotelWithRooms;
}

const hotelsService = {
  findAllHotels,
  findHotelWithRooms,
};

export default hotelsService;
