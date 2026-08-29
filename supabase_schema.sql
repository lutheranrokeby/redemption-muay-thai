-- =========================================================================
-- REDEMPTION MUAY THAI - SUPABASE DATABASE & STORAGE SCHEMA
-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard)
-- =========================================================================

-- 1. Create site_content table for JSON key-value store (Hero, Welcome, Footer, Contact)
CREATE TABLE IF NOT EXISTS public.site_content (
    id TEXT PRIMARY KEY DEFAULT 'main_content',
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create coaches table
CREATE TABLE IF NOT EXISTS public.coaches (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    subtitle TEXT,
    badge TEXT DEFAULT 'COACH',
    bio TEXT,
    achievements TEXT[] DEFAULT '{}',
    image TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create classes table
CREATE TABLE IF NOT EXISTS public.classes (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    tag TEXT DEFAULT 'ALL LEVELS',
    title TEXT NOT NULL,
    description TEXT,
    image TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create timetable table
CREATE TABLE IF NOT EXISTS public.timetable (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    day TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    time_formatted TEXT NOT NULL,
    class_name TEXT NOT NULL,
    level TEXT DEFAULT 'All Levels',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;

-- Create Public Read Policies (Allow anyone to read site content)
CREATE POLICY "Public Read Content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Public Read Coaches" ON public.coaches FOR SELECT USING (true);
CREATE POLICY "Public Read Classes" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Public Read Timetable" ON public.timetable FOR SELECT USING (true);

-- Create Authenticated / Admin Write Policies (Allow write access with Anon/Service Key)
CREATE POLICY "Admin Write Content" ON public.site_content FOR ALL USING (true);
CREATE POLICY "Admin Write Coaches" ON public.coaches FOR ALL USING (true);
CREATE POLICY "Admin Write Classes" ON public.classes FOR ALL USING (true);
CREATE POLICY "Admin Write Timetable" ON public.timetable FOR ALL USING (true);

-- =========================================================================
-- SUPABASE STORAGE BUCKET SETUP FOR IMAGE UPLOADS
-- =========================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('uploads', 'uploads', true) 
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Uploads" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Public Upload Objects" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads');
