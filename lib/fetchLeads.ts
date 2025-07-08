import { createClient } from './supabaseClient';

export const fetchLeads = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error.message);
    return [];
  }

  return data || [];
};