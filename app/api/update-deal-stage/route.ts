import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

const USERNAME = 'Andrew Langmaid'; // Update this as needed for multi-user setups

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, newStage } = body;

    // 1. Fetch existing lead to get old stage
    const { data: existingLead, error: fetchError } = await supabase
      .from('leads')
      .select('current_stage')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching existing lead:', fetchError.message);
      return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 });
    }

    const oldStage = existingLead?.current_stage || null;

    // 2. Update lead with new stage
    const { data: updateData, error: updateError } = await supabase
      .from('leads')
      .update({ current_stage: newStage })
      .eq('id', id)
      .select();

    if (updateError) {
      console.error('Error updating lead:', updateError.message);
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
    }

    // 3. Insert audit log record
    const { error: logError } = await supabase.from('audit_log').insert({
      lead_id: id,
      old_stage: oldStage,
      new_stage: newStage,
      changed_by: USERNAME,
    });

    if (logError) {
      console.error('Error inserting audit log:', logError.message);
      // Do not fail update if logging fails, just warn
    }

    return NextResponse.json({ success: true, updated: updateData });
  } catch (err) {
    console.error('Handler error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}