import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
  console.log('🚀 LIVE Supabase fetch triggered...');  // ✅ This is the log line to add

  const { data, error } = await supabase.from('leads').select('*');

  if (error) {
    console.error('❌ Supabase fetch error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }

  console.log('🔎 Supabase leads:', data);  // ✅ Optional: shows what Supabase actually returns

  return NextResponse.json(data);
}