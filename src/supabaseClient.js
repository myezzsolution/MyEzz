// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Access environment variables using Vite's import.meta.env syntax
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);