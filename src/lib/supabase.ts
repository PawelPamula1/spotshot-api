import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // użyj klucza "service_role" z Supabase!
export const supabase = createClient(supabaseUrl!, supabaseKey!);
