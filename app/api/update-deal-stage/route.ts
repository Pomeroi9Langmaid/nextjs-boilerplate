import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, newStage, changedBy } = body; // changedBy is optional

    // Fetch current lead to get old stage
    const { data: leadData, error: fetchError } = await supabase
      .from('leads')
      .select('current_stage')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Failed to fetch lead:', fetchError.message);
      return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 });
    }

    const oldStage = leadData.current_stage || '';

    // Update the lead's current_stage
    const { data: updateData, error: updateError } = await supabase
      .from('leads')
      .update({ current_stage: newStage })
      .eq('id', id)
      .select();

    if (updateError) {
      console.error('Failed to update lead stage:', updateError.message);
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
    }

    // Insert audit log record
    const { error: auditError } = await supabase
      .from('audit_logs')
      .insert({
        lead_id: id,
        old_stage: oldStage,
        new_stage: newStage,
        changed_by: changedBy || null,
      });

    if (auditError) {
      console.error('Failed to insert audit log:', auditError.message);
      // Audit failure does not block main update, so continue
    }

    return NextResponse.json({ success: true, updated: updateData });
  } catch (err) {
    console.error('Handler error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}