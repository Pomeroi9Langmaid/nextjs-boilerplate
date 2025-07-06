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

  return NextResponse.json(data); // ✅ No renaming
}