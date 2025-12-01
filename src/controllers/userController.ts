import { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase';
import { sendError } from '../utils';

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ message: 'User not found' });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendError(res, 400, 'User id is required');
    }

    const { error: favError } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', id);
    if (favError) {
      console.error('Error deleting favorites:', favError);
      return sendError(res, 500, 'Failed to delete user favorites');
    }

    const { error: reportsError } = await supabase
      .from('spot_reports')
      .delete()
      .eq('reporter_id', id);
    if (reportsError) {
      console.error('Error deleting spot reports:', reportsError);
      return sendError(res, 500, 'Failed to delete user reports');
    }

    const { error: spotsError } = await supabase
      .from('spots')
      .delete()
      .eq('author_id', id);
    if (spotsError) {
      console.error('Error deleting spots:', spotsError);
      return sendError(res, 500, 'Failed to delete user spots');
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    if (profileError) {
      console.error('Error deleting profile:', profileError);
      return sendError(res, 500, 'Failed to delete user profile');
    }

    const { error: authError } = await supabase.auth.admin.deleteUser(id);

    if (authError) {
      console.error('Error deleting user (auth):', authError);
      return sendError(res, 500, 'Failed to delete user');
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Unexpected deleteUser error:', err);
    next(err);
  }
};
