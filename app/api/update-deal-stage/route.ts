import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, newStage } = body;

    console.log('🛠️ Update Requested:', { id, newStage });

    const { data, error } = await supabase
      .from('leads')
      .update({ current_stage: newStage })
      .eq('id', id)
      .select();

    if (error) {
      console.error('❌ Supabase update error:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log('✅ Updated row(s):', data);
    return NextResponse.json({ success: true, updated: data });
  } catch (err) {
    console.error('❌ Handler error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
```

If your project doesn’t resolve `@/lib/supabaseClient`, use:
```ts
import { supabase } from '../../../lib/supabaseClient';
```
Instead of:
```ts
import { supabase } from '@/lib/supabaseClient';
```
