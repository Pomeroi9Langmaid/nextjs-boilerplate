import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('🔍 Supabase GET handler triggered');

  const { data, error } = await supabase.from('leads').select('*');

  if (error) {
    console.error('❌ Supabase fetch error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }

  return NextResponse.json(data);
}