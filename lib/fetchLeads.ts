'use server'

import { supabase } from '@/lib/supabaseClient'

export const fetchLeads = async () => {
  const { data, error } = await supabase.from('leads').select('*')

  console.log('Fetched data:', data) // 👈 Add this
  if (error) {
    console.error('Error fetching leads:', error.message)
    return []
  }

  return data
}