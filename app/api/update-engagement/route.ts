import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const { id, newEngagement } = await request.json();

    if (!id || !newEngagement) {
      return NextResponse.json({ error: 'Missing id or newEngagement' }, { status: 400 });
    }

    const { error } = await supabase
      .from('leads')
      .update({ engagement: newEngagement })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Engagement updated successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update engagement' }, { status: 500 });
  }
}