import { Router } from 'express';
import {
  acceptSpot,
  getPendingSpots,
  rejectSpot,
} from '../controllers/moderationController';

const router = Router();

router.get('/pending', getPendingSpots);
router.put('/accept/:id', acceptSpot);
router.delete('/reject/:id', rejectSpot);

export default router;
