import { supabase } from './supabaseClient'

export async function fetchLeads() {
  const { data, error } = await supabase.from('leads').select('*')
  if (error) {
    console.error('Error fetching leads:', error)
    return []
  }
  return data
}
