import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

const validDealStages = [
  'Lead Only',
  'Meeting Only',
  'Demo Complete (10%)',
  'Proposal Sent (25%)',
  'Discussing Commercials (50%)',
  'Contract/Negotiation (90%)',
  'ON HOLD',
  'WON Deal',
  'Lost Deal',
  'CLOSED',
  'Hot Lead (50%)',
  'MEETING_SCHEDULED',
  'No-show to Meeting',
  'Termination Discussion',
  'Many Discussions',
  'New Demo (other departments)',
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, newStage } = body;

    if (!validDealStages.includes(newStage)) {
      return NextResponse.json(
        { success: false, error: 'Invalid deal stage value' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('leads')
      .update({ current_stage: newStage })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase update error:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, updated: data });
  } catch (err) {
    console.error('Handler error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}