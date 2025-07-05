'use server'

import { supabase } from '@/lib/supabaseClient'

export const fetchLeads = async () => {
  const { data, error } = await supabase.from('leads').select('*')

  if (error) {
    console.error('Error fetching leads:', error.message)
    return []
  }

  return data
}
