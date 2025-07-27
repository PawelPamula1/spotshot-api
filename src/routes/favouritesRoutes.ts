import { Router } from 'express';
import {
  getFavoritesForUser,
  addFavorite,
  removeFavorite,
  getFavoriteCountForSpot,
  checkIfUserFavoritedSpot,
} from '../controllers/favoritesController';

const router = Router();

// POST /api/favourites
router.post('/', addFavorite); // body: { userId, spotId }

// DELETE /api/favourites
router.delete('/', removeFavorite); // body: { userId, spotId }

// GET /api/favourites/count/:spotId
router.get('/count/:spotId', getFavoriteCountForSpot);

// GET /api/favourites/check?userId=xxx&spotId=yyy
router.get('/check', checkIfUserFavoritedSpot);

// GET /api/favourites/:userId
router.get('/:userId', getFavoritesForUser);

export default router;
