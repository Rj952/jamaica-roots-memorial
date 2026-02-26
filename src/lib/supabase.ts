import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseEnabled = !!(supabaseUrl && supabaseAnonKey);

let supabase: SupabaseClient | null = null;

if (supabaseEnabled) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
