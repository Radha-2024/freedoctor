-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table to extend user information
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT,
    organization TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id)
);

-- Create medical_camps table
CREATE TABLE IF NOT EXISTS public.medical_camps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    camp_name TEXT NOT NULL,
    description TEXT NOT NULL,
    camp_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    specialties TEXT NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    contact_info TEXT NOT NULL,
    additional_notes TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, organization, role)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'organization',
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at_medical_camps BEFORE UPDATE ON public.medical_camps FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_camps ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create policies for medical_camps table
CREATE POLICY "Users can view own camps" ON public.medical_camps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own camps" ON public.medical_camps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own camps" ON public.medical_camps FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for admin access
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND (role = 'admin' OR auth.email() = 'admin@freedoctor.com')
    )
);

CREATE POLICY "Admins can view all camps" ON public.medical_camps FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND (role = 'admin' OR auth.email() = 'admin@freedoctor.com')
    )
);

CREATE POLICY "Admins can update all camps" ON public.medical_camps FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND (role = 'admin' OR auth.email() = 'admin@freedoctor.com')
    )
);

-- Insert test admin user (you should change this email and create the user manually)
-- This is just for reference
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
VALUES (
    uuid_generate_v4(),
    'admin@freedoctor.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"full_name": "Admin User", "organization": "FreeDoctorMed", "role": "admin"}'::jsonb
) ON CONFLICT (email) DO NOTHING;