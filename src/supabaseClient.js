// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Access environment variables using Vite's import.meta.env syntax
const supabaseUrl ='https://lygwenlleqzyyalwbhkm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Z3dlbmxsZXF6eXlhbHdiaGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODc1NDgsImV4cCI6MjA3NTA2MzU0OH0.Wtsz1eJQ-rCPxiUcxKk3r-_33K6NJX5V0EDJf62KqRY';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);