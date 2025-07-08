import { createClient } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  const { leadId, newEngagement } = await request.json();

  const supabase = createClient();

  const { error } = await supabase
    .from('leads')
    .update({ engagement: newEngagement })
    .eq('id', leadId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: 'Engagement updated' }), {
    status: 200,
  });
}