import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  const { leadId, newEngagement } = await req.json();
  const supabase = createClient();

  const { error } = await supabase
    .from('leads')
    .update({ engagement: newEngagement })
    .eq('id', leadId);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}