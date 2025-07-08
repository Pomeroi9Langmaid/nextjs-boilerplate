'use client';

import { createClient } from './supabaseClient';

export const updateDealStage = async (leadId: string, newStage: string) => {
  const supabase = createClient();

  const { error } = await supabase
    .from('leads')
    .update({ current_stage: newStage })
    .eq('id', leadId);

  if (error) {
    console.error('Error updating deal stage:', error);
  }
};