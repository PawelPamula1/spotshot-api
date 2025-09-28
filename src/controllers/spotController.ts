import { Request, Response, NextFunction } from 'express';
import { spots, Spot } from '../models/spot';
import { supabase } from '../lib/supabase';
import { sendError } from '../utils';

// Create a new spot
export const createSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
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

    // Basic validation
    if (!name || !country || !image || !author_id) {
      return sendError(res, 400, 'Missing required fields.');
    }

    const { data, error } = await supabase
      .from('spots')
      .insert([
        {
          name,
          city,
          country,
          image,
          description,
          latitude,
          longitude,
          author_id,
          photo_tips,
          accepted: false,
        },
      ])
      .select();

    if (error) {
      console.error('Error creating spot:', error);
      return sendError(
        res,
        500,
        'Failed to create spot. Please try again later.',
      );
    }

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating spot:', error);
    sendError(res, 500, 'Unexpected error. Please try again later.');
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

    let query = supabase.from('spots').select('*').eq('accepted', true);

    if (country && country !== 'All') {
      query = query.eq('country', country as string);
    }

    if (city && city !== 'All') {
      query = query.eq('city', city as string);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching spots:', error);
      return sendError(res, 500, 'Failed to fetch spots.');
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching spots:', error);
    sendError(res, 500, 'Unexpected error. Please try again later.');
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
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return sendError(res, 404, 'Spot not found');
      }
      console.error('Error fetching spot by ID:', error);
      return sendError(res, 500, 'Failed to fetch spot.');
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching spot by ID:', error);
    sendError(res, 500, 'Unexpected error. Please try again later.');
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

    const { data: existingSpot, error: fetchError } = await supabase
      .from('spots')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return sendError(res, 404, 'Spot not found');
      }
      console.error('Error fetching spot for update:', fetchError);
      return sendError(res, 500, 'Failed to fetch spot for update.');
    }

    const { data: updatedSpot, error: updateError } = await supabase
      .from('spots')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating spot:', updateError);
      return sendError(res, 500, 'Failed to update spot.');
    }

    res.json(updatedSpot);
  } catch (error) {
    console.error('Error updating spot:', error);
    sendError(res, 500, 'Unexpected error. Please try again later.');
  }
};

export const deleteSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const { data: existingSpot, error: fetchError } = await supabase
      .from('spots')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return sendError(res, 404, 'Spot not found');
      }
      console.error('Error fetching spot for deletion:', fetchError);
      return sendError(res, 500, 'Failed to fetch spot for deletion.');
    }

    const { data: deletedSpot, error: deleteError } = await supabase
      .from('spots')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (deleteError) {
      console.error('Error deleting spot:', deleteError);
      return sendError(res, 500, 'Failed to delete spot.');
    }

    res.json({ message: 'Spot deleted successfully', spot: deletedSpot });
  } catch (error) {
    console.error('Error deleting spot:', error);
    sendError(res, 500, 'Unexpected error. Please try again later.');
  }
};

export const getCountries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data, error } = await supabase.from('spots').select('country');

    if (error) {
      console.error('Error fetching countries:', error);
      return sendError(res, 500, 'Failed to fetch countries.');
    }

    const countries = Array.from(new Set(data.map((s) => s.country))).sort();

    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    sendError(res, 500, 'Unexpected error. Please try again later.');
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

    if (error) {
      console.error('Error fetching cities:', error);
      return sendError(res, 500, 'Failed to fetch cities.');
    }

    const cities = Array.from(new Set(data.map((s) => s.city))).sort();

    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    sendError(res, 500, 'Unexpected error. Please try again later.');
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

    if (error) {
      console.error('Error counting user spots:', error);
      return sendError(res, 500, 'Failed to count user spots.');
    }

    res.json({ count });
  } catch (error) {
    console.error('Error counting user spots:', error);
    sendError(res, 500, 'Unexpected error. Please try again later.');
  }
};
