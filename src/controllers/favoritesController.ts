import { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// GET /api/favourites/:userId
export const getFavoritesForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('favorites')
    .select('spots(*)') // pobierz pełne dane z relacji
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching favourites:', error.message);
    return res.status(500).json({ error: error.message });
  }

  const spots = data.map((entry) => entry.spots); // wyciągamy same spoty
  res.json(spots);
};

// POST /api/favourites
// body: { userId, spotId }
export const addFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId, spotId } = req.body;

  try {
    const { error } = await supabase.from('favorites').insert({
      id: uuidv4(),
      user_id: userId,
      spot_id: spotId,
    });

    if (error) throw error;

    res.status(201).json({ message: 'Spot added to favorites' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    next(error);
  }
};

// DELETE /api/favourites
// body: { userId, spotId }
export const removeFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId, spotId } = req.body;

  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('spot_id', spotId);

    if (error) throw error;

    res.status(200).json({ message: 'Spot removed from favorites' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    next(error);
  }
};

// GET /api/favourites/count/:spotId
export const getFavoriteCountForSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { spotId } = req.params;

  try {
    const { count, error } = await supabase
      .from('favorites')
      .select('*', { count: 'exact', head: true })
      .eq('spot_id', spotId);

    if (error) throw error;

    res.json({ count });
  } catch (error) {
    console.error('Error counting favorites for spot:', error);
    next(error);
  }
};

// GET /api/favourites/check?userId=...&spotId=...
export const checkIfUserFavoritedSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId, spotId } = req.query;

  if (!userId || !spotId) {
    return res.status(400).json({ message: 'Missing userId or spotId' });
  }

  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId.toString())
      .eq('spot_id', spotId.toString())
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json({ favorited: !!data });
  } catch (error) {
    console.error('Error checking if spot is favorited:', error);
    next(error);
  }
};
