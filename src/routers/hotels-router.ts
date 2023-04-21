import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { findHotelWithRooms, getAllHotels } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getAllHotels).get('/:hotelId', findHotelWithRooms);

export { hotelsRouter };
