import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getAllHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const hotels = await hotelsService.findAllHotels(req.userId);
    return res.status(200).send(hotels);
  } catch (error) {
    next(error);
  }
}

export async function findHotelWithRooms(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const hotelId = req.params.hotelId as string;

  try {
    const hotelWithRooms = await hotelsService.findHotelWithRooms(req.userId, Number(hotelId));
    return res.status(200).send(hotelWithRooms);
  } catch (error) {
    next(error);
  }
}
