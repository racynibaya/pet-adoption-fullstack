import express from 'express';

import { protect } from '../controllers/auth.controller';

import {
  createBooking,
  getAllBookings,
} from '../controllers/booking.controller';

export const router = express.Router();

router.route('/').get(protect, getAllBookings);

router.route('/:petId').post(protect, createBooking);

export default router;
