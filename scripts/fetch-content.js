// Pre-build script: Fetches latest content from Supabase and bakes it into content.json before Vite static build
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';

async function fetchLatestContent() {
  console.log('⚡ [Build Step] Checking Supabase for latest site content...');

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_URL.startsWith('http')) {
    console.log('ℹ️ [Build Step] Supabase env variables not detected. Using local content.json.');
    return;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content?id=eq.main_content&select=data`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0].data) {
        const contentFilePath = path.join(process.cwd(), 'content.json');
        fs.writeFileSync(contentFilePath, JSON.stringify(data[0].data, null, 2));
        console.log('🎉 [Build Step] Successfully fetched latest content from Supabase and baked into content.json!');
        return;
      }
    }
    console.warn('⚠️ [Build Step] Supabase returned empty data. Keeping existing content.json.');
  } catch (err) {
    console.error('❌ [Build Step] Failed to fetch content from Supabase during build:', err);
  }
}

fetchLatestContent();
