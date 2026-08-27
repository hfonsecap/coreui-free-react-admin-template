import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ebqbsmweotlhuynflodz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVicWJzbXdlb3RsaHV5bmZsb2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNTUwMDksImV4cCI6MjA5NDkzMTAwOX0.G-MfA8L8x2yZDhETFTXNjaDXqVODEoxNElXUczTZPhQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)