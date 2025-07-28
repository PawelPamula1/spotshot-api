import { Request, Response, NextFunction } from 'express';
import { spots, Spot } from '../models/spot';
import { supabase } from '../lib/supabase';

// Create a new spot
export const createSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      name,
      city,
      country,
      image,
      description,
      latitude,
      longitude,
      author_id,
      photo_tips,
    } = req.body;

    const { data, error } = await supabase
      .from('spots')
      .insert([
        {
          id,
          name,
          city,
          country,
          image,
          description,
          latitude,
          longitude,
          author_id,
          photo_tips,
        },
      ])
      .select(); // zwróci stworzony rekord

    if (error) throw error;

    res.status(201).json(data[0]); // zwracamy nowo dodany spot
  } catch (error) {
    console.error('Error creating spot:', error);
    next(error);
  }
};

// Get all spots
export const getSpots = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { country, city } = req.query;

    let query = supabase.from('spots').select('*');

    if (country && country !== 'All') {
      query = query.eq('country', country as string);
    }

    if (city && city !== 'All') {
      query = query.eq('city', city as string);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching spots:', error);
    next(error);
  }
};

// Get spot by ID

export const getSpotById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('spots')
      .select('*')
      .eq('id', id)
      .single(); // spodziewamy się jednego wyniku

    if (error) {
      if (error.code === 'PGRST116') {
        // PGRST116 = no rows found
        return res.status(404).json({ message: 'Spot not found' });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching spot by ID:', error);
    next(error);
  }
};

// Update spot
export const updateSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Upewnij się, że rekord o takim ID istnieje
    const { data: existingSpot, error: fetchError } = await supabase
      .from('spots')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return res.status(404).json({ message: 'Spot not found' });
      }
      throw fetchError;
    }

    // Zaktualizuj dane
    const { data: updatedSpot, error: updateError } = await supabase
      .from('spots')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    res.json(updatedSpot);
  } catch (error) {
    console.error('Error updating spot:', error);
    next(error);
  }
};

export const deleteSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Najpierw sprawdzamy, czy taki spot istnieje
    const { data: existingSpot, error: fetchError } = await supabase
      .from('spots')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return res.status(404).json({ message: 'Spot not found' });
      }
      throw fetchError;
    }

    // Usuwamy rekord
    const { data: deletedSpot, error: deleteError } = await supabase
      .from('spots')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (deleteError) {
      throw deleteError;
    }

    res.json(deletedSpot);
  } catch (error) {
    console.error('Error deleting spot:', error);
    next(error);
  }
};

export const getCountries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data, error } = await supabase.from('spots').select('country');

    if (error) throw error;

    const countries = Array.from(new Set(data.map((s) => s.country))).sort();

    res.json(countries);
  } catch (error) {
    next(error);
  }
};

export const getCities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { country } = req.query;

    let query = supabase.from('spots').select('city');

    if (country && country !== 'All') {
      query = query.eq('country', country as string);
    }

    const { data, error } = await query;

    if (error) throw error;

    const cities = Array.from(new Set(data.map((s) => s.city))).sort();

    res.json(cities);
  } catch (error) {
    next(error);
  }
};

export const getUserSpotsCount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;

  try {
    const { count, error } = await supabase
      .from('spots')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId);

    if (error) throw error;

    res.json({ count });
  } catch (error) {
    console.error('Error counting user spots:', error);
    next(error);
  }
};
