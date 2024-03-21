import express, { Request, Response } from 'express';
import Pet from '../models/pet';

const router = express.Router();

router.route('/').post(async (req: Request, res: Response) => {
  const pet = await Pet.create({
    name: req.body.name,
  });

  res.status(200).json({
    message: 'created',
    pet,
  });
});

export default router;
