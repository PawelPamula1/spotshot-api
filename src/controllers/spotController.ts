import { Request, Response, NextFunction } from 'express';
import { spots, Spot } from '../models/spot';

// Create a new spot
export const createSpot = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      city,
      country,
      image,
      description,
      latitude,
      longitude,
      author,
    } = req.body;

    const newSpot: Spot = {
      id: Date.now().toString(), // ID jako string
      name,
      city,
      country,
      image,
      description,
      latitude,
      longitude,
      author,
    };

    spots.push(newSpot);
    res.status(201).json(newSpot);
  } catch (error) {
    next(error);
  }
};

// Get all spots
export const getSpots = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { country, city } = req.query;

    let filtered = spots;

    if (country && country !== 'All') {
      filtered = filtered.filter((spot) => spot.country === country);
    }

    if (city && city !== 'All') {
      filtered = filtered.filter((spot) => spot.city === city);
    }

    res.json(filtered);
  } catch (error) {
    next(error);
  }
};

// Get spot by ID
export const getSpotById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const spot = spots.find((s) => s.id === id);

    if (!spot) {
      res.status(404).json({ message: 'Spot not found' });
      return;
    }

    res.json(spot);
  } catch (error) {
    next(error);
  }
};

// Update spot
export const updateSpot = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const index = spots.findIndex((s) => s.id === id);

    if (index === -1) {
      res.status(404).json({ message: 'Spot not found' });
      return;
    }

    const updatedSpot: Spot = { ...spots[index], ...req.body };
    spots[index] = updatedSpot;

    res.json(updatedSpot);
  } catch (error) {
    next(error);
  }
};

// Delete spot
export const deleteSpot = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const index = spots.findIndex((s) => s.id === id);

    if (index === -1) {
      res.status(404).json({ message: 'Spot not found' });
      return;
    }

    const deleted = spots.splice(index, 1)[0];
    res.json(deleted);
  } catch (error) {
    next(error);
  }
};

export const getCountries = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const countries = Array.from(new Set(spots.map((s) => s.country)));
    res.json(countries);
  } catch (error) {
    next(error);
  }
};

export const getCities = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { country } = req.query;

    let filteredSpots = spots;

    if (country && country !== 'All') {
      filteredSpots = filteredSpots.filter((s) => s.country === country);
    }

    const cities = Array.from(new Set(filteredSpots.map((s) => s.city)));

    res.json(cities);
  } catch (error) {
    next(error);
  }
};
