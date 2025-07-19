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
    res.json(spots);
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
