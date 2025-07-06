import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { id, newStage } = await req.json();

    const { data, error } = await supabase
      .from('leads')
      .update({ current_stage: newStage })
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, updated: data });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}