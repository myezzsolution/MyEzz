// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
// Create and export the Supabase client
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);