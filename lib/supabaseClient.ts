import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Get client ID from environment variable
export const getClientId = (): string => {
  return process.env.NEXT_PUBLIC_CLIENT_ID || '780e00e7-2a32-4056-8fa3-eccfd702cd2c'; // Fallback to demo ID
} 