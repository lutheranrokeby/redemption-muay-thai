// Supabase Client & Netlify Integration Helper
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const NETLIFY_BUILD_HOOK_URL = import.meta.env.VITE_NETLIFY_BUILD_HOOK_URL || '';

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

// Fetch site content (from Supabase if configured, or Express API fallback)
export const getSiteContent = async () => {
  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content?id=eq.main_content&select=data`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      const data = await res.json();
      if (data && data[0] && data[0].data) {
        return data[0].data;
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local API', err);
    }
  }

  // Fallback to Express server API / content.json
  const res = await fetch('/api/content');
  return await res.json();
};

// Save site content & trigger Netlify Build Hook (Option B)
export const saveSiteContent = async (contentData) => {
  let savedLocally = false;

  // 1. Save to Express local API / content.json
  try {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contentData)
    });
    const result = await res.json();
    if (result.success) savedLocally = true;
  } catch (err) {
    console.warn('Local API save fallback', err);
  }

  // 2. Save to Supabase Database if configured
  if (isSupabaseConfigured()) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/site_content?id=eq.main_content`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          id: 'main_content',
          data: contentData,
          updated_at: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Failed to save to Supabase', err);
    }
  }

  // 3. Option B: Trigger Netlify Build Webhook if configured
  if (NETLIFY_BUILD_HOOK_URL) {
    try {
      await fetch(NETLIFY_BUILD_HOOK_URL, { method: 'POST' });
      console.log('🎉 Netlify build webhook triggered successfully!');
    } catch (err) {
      console.warn('Failed to trigger Netlify build hook', err);
    }
  }

  return { success: true, savedLocally };
};

// Upload image (to Supabase Storage if configured, or local upload endpoint)
export const uploadImageFile = async (file) => {
  if (isSupabaseConfigured()) {
    try {
      const filename = `img_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/uploads/${filename}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': file.type
        },
        body: file
      });
      if (uploadRes.ok) {
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/uploads/${filename}`;
        return { success: true, url: publicUrl };
      }
    } catch (err) {
      console.warn('Supabase storage upload failed, falling back to local endpoint', err);
    }
  }

  // Fallback to Express multer local endpoint
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch('/api/upload', { method: 'POST', body: formData });
  return await res.json();
};
