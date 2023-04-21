import { prisma } from '@/config';

async function findAllHotels() {
  return prisma.hotel.findMany();
}

async function findHotelWithRooms(hotelId: number) {
  return prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { Rooms: true },
  });
}

const hotelsRepository = {
  findAllHotels,
  findHotelWithRooms,
};

export default hotelsRepository;
