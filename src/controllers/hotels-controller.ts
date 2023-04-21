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
