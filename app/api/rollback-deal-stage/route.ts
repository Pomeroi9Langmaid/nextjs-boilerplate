import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST() {
  try {
    // Fetch last audit log entry for deal stage changes, ordered by newest
    const { data: auditData, error: auditError } = await supabase
      .from('deal_stage_audit')
      .select('*')
      .order('changed_at', { ascending: false })
      .limit(1);

    if (auditError || !auditData || auditData.length === 0) {
      return NextResponse.json({ success: false, error: 'No audit records found' }, { status: 404 });
    }

    const lastChange = auditData[0];

    // Rollback leads.current_stage to previous_stage
    const { error: updateError } = await supabase
      .from('leads')
      .update({ current_stage: lastChange.previous_stage })
      .eq('id', lastChange.lead_id);

    if (updateError) {
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
    }

    // Optionally, delete the rollback entry or mark it as rolled back to avoid repeated rollbacks

    return NextResponse.json({ success: true, rolledBackTo: lastChange.previous_stage });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}