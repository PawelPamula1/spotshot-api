import { Router } from 'express';
import {
  createSpot,
  getSpots,
  getSpotById,
  updateSpot,
  deleteSpot,
  getCountries,
  getCities,
} from '../controllers/spotController';

const router = Router();

router.get('/countries', getCountries);
router.get('/cities', getCities);

router.get('/', getSpots);
router.get('/:id', getSpotById);
router.post('/', createSpot);
router.put('/:id', updateSpot);
router.delete('/:id', deleteSpot);

export default router;
