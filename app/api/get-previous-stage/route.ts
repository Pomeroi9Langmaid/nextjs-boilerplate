import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { leadId, currentStage } = await req.json();

    // Get the previous stage before currentStage, ordered by change date descending
    // We want the most recent old_stage that is NOT equal to currentStage
    const { data, error } = await supabase
      .from('audit_log')
      .select('old_stage')
      .eq('lead_id', leadId)
      .neq('old_stage', currentStage)
      .order('changed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching previous stage:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!data || !data.old_stage) {
      return NextResponse.json({ success: false, error: 'No previous stage found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, previousStage: data.old_stage });
  } catch (err) {
    console.error('Handler error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}