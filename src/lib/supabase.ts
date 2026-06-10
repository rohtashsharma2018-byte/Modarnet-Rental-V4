import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isPlaceholder = !supabaseUrl || 
                     supabaseUrl.includes("your-project-id") || 
                     !supabaseAnonKey || 
                     supabaseAnonKey === "your-anon-key";

if (isPlaceholder) {
  console.error("Supabase credentials missing or invalid. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.");
}

// Ensure URL is valid or fallback to a placeholder that doesn't crash createClient
const validUrl = !isPlaceholder && supabaseUrl?.startsWith('http') ? supabaseUrl : 'https://placeholder.supabase.co';
const validKey = !isPlaceholder ? supabaseAnonKey : 'placeholder-key';

export const supabase = createClient(validUrl, validKey);
