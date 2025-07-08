'use client';

import { createClient } from './supabaseClient';

export const fetchLeads = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('company', { ascending: true });

  if (error) {
    console.error('Error fetching leads:', error);
    return [];
  }

  return data;
};