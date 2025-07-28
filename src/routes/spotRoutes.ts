import { Router } from 'express';
import {
  createSpot,
  getSpots,
  getSpotById,
  updateSpot,
  deleteSpot,
  getCountries,
  getCities,
  getUserSpotsCount,
} from '../controllers/spotController';

const router = Router();

router.get('/countries', getCountries);
router.get('/cities', getCities);
router.get('/count/:userId', getUserSpotsCount);

router.get('/', getSpots);
router.get('/spot/:id', getSpotById);
router.post('/', createSpot);
router.put('/spot/:id', updateSpot);
router.delete('/:id', deleteSpot);

export default router;
