// app/api/get-leads/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase.from('leads').select('*');

  if (error) {
    console.error('Error fetching leads from Supabase:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  // Transform current_stage to deal_stage for frontend use
  const transformed = data.map((lead) => ({
    ...lead,
    deal_stage: lead.current_stage || 'Lead Only',
  }));

  return NextResponse.json(transformed);
}