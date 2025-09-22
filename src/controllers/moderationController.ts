import { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase';

export const getPendingSpots = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      limit = '50',
      country,
      city,
    } = req.query as {
      limit?: string;
      country?: string;
      city?: string;
    };

    let q = supabase
      .from('spots')
      .select(
        `
      id,
      name,
      city,
      country,
      image,
      description,
      latitude,
      longitude,
      photo_tips,
      author_id,
      accepted,
      created_at,
      author:profiles (
        id,
        username,
        avatar_url
      )
    `,
      )
      .eq('accepted', false)
      .order('created_at', { ascending: true })
      .limit(Math.min(Number(limit || 50), 200)); // max 200

    if (country) q = q.eq('country', country);
    if (city) q = q.eq('city', city);

    const { data, error } = await q;
    if (error) throw error;

    res.json(data);
  } catch (e) {
    console.error('Error in getPendingSpots:', e);
    next(e);
  }
};

export const acceptSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('spots')
      .update({ accepted: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, spot: data });
  } catch (e) {
    console.error('Error in acceptSpot:', e);
    next(e);
  }
};

export const rejectSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('spots').delete().eq('id', id);

    if (error) throw error;

    res.json({ success: true, id });
  } catch (e) {
    console.error('Error in rejectSpot:', e);
    next(e);
  }
};
export const reportSpot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { spotId, reporterId, reason } = req.body ?? {};

    if (!spotId || !reporterId || !reason) {
      return res
        .status(400)
        .json({ message: 'spotId, reporterId i reason są wymagane' });
    }

    const { data: spot, error: spotErr } = await supabase
      .from('spots')
      .select('id')
      .eq('id', spotId)
      .single();

    if (spotErr || !spot) {
      return res.status(404).json({ message: 'Spot nie istnieje' });
    }

    const { data, error } = await supabase
      .from('spot_reports')
      .insert([
        {
          spot_id: spotId,
          reporter_id: reporterId,
          reason: String(reason).trim(), // dowolny tekst
        },
      ])
      .select('id')
      .single();

    if (error) throw error;

    return res.status(201).json({ id: data.id });
  } catch (err) {
    console.error('Error reportSpot:', err);
    next(err);
  }
};
