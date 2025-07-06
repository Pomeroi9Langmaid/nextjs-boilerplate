'use server'

import { supabase } from '@/lib/supabaseClient'

export async function updateDealStage(leadId: string, newStage: string) {
  const { error } = await supabase
    .from('leads')
    .update({ deal_stage: newStage })
    .eq('id', leadId)

  if (error) {
    console.error('Failed to update deal stage:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true }
}