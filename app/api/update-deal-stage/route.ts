import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { id, newStage } = await req.json();

    console.log('🛠️ Updating lead:', { id, newStage });

    const { data, error } = await supabase
      .from('leads')
      .update({ current_stage: newStage })
      .eq('id', id)
      .select();

    if (error) {
      console.error('❌ Supabase update error:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log('✅ Successfully updated:', data);
    return NextResponse.json({ success: true, updated: data });
  } catch (err) {
    console.error('❌ Handler error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}