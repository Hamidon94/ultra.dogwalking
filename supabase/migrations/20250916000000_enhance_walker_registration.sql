-- Migration pour améliorer le processus d'inscription des promeneurs
-- Ajout des champs pour informations personnelles et documents

-- Ajouter les nouveaux champs à la table walkers
ALTER TABLE public.walkers 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT,
ADD COLUMN IF NOT EXISTS identity_document_url TEXT,
ADD COLUMN IF NOT EXISTS criminal_record_url TEXT,
ADD COLUMN IF NOT EXISTS insurance_document_url TEXT,
ADD COLUMN IF NOT EXISTS additional_documents TEXT[],
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'in_review', 'approved', 'rejected')),
ADD COLUMN IF NOT EXISTS verification_notes TEXT,
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS verified_by UUID;

-- Créer la table pour les documents des promeneurs
CREATE TABLE IF NOT EXISTS public.walker_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  walker_id UUID NOT NULL REFERENCES public.walkers(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('identity', 'criminal_record', 'insurance', 'certificate', 'other')),
  document_name TEXT NOT NULL,
  document_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified BOOLEAN NOT NULL DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS pour la nouvelle table
ALTER TABLE public.walker_documents ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour walker_documents
CREATE POLICY "Walker owners can view their documents" ON public.walker_documents 
FOR SELECT USING (
  walker_id IN (
    SELECT walkers.id FROM walkers 
    WHERE walkers.user_id IN (
      SELECT users.id FROM users 
      WHERE users.auth_user_id = auth.uid()
    )
  )
);

CREATE POLICY "Walker owners can insert their documents" ON public.walker_documents 
FOR INSERT WITH CHECK (
  walker_id IN (
    SELECT walkers.id FROM walkers 
    WHERE walkers.user_id IN (
      SELECT users.id FROM users 
      WHERE users.auth_user_id = auth.uid()
    )
  )
);

CREATE POLICY "Walker owners can update their documents" ON public.walker_documents 
FOR UPDATE USING (
  walker_id IN (
    SELECT walkers.id FROM walkers 
    WHERE walkers.user_id IN (
      SELECT users.id FROM users 
      WHERE users.auth_user_id = auth.uid()
    )
  )
);

CREATE POLICY "Walker owners can delete their documents" ON public.walker_documents 
FOR DELETE USING (
  walker_id IN (
    SELECT walkers.id FROM walkers 
    WHERE walkers.user_id IN (
      SELECT users.id FROM users 
      WHERE users.auth_user_id = auth.uid()
    )
  )
);

-- Fonction pour mettre à jour le timestamp updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement updated_at
DROP TRIGGER IF EXISTS update_walker_documents_updated_at ON public.walker_documents;
CREATE TRIGGER update_walker_documents_updated_at
  BEFORE UPDATE ON public.walker_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Créer un bucket pour les documents des promeneurs dans Supabase Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('walker-documents', 'walker-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Politiques pour le bucket walker-documents
CREATE POLICY "Walker owners can upload documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'walker-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Walker owners can view their documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'walker-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Walker owners can update their documents" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'walker-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Walker owners can delete their documents" ON storage.objects
FOR DELETE USING (
  bucket_id = 'walker-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Fonction pour générer un récapitulatif PDF des informations du promeneur
CREATE OR REPLACE FUNCTION public.generate_walker_summary(walker_uuid UUID)
RETURNS JSON AS $$
DECLARE
  walker_data JSON;
  documents_data JSON;
BEGIN
  -- Récupérer les informations du promeneur
  SELECT json_build_object(
    'id', w.id,
    'first_name', w.first_name,
    'last_name', w.last_name,
    'date_of_birth', w.date_of_birth,
    'phone_number', w.phone_number,
    'email', u.email,
    'address', w.address,
    'city', w.city,
    'bio', w.bio,
    'experience_years', w.experience_years,
    'hourly_rate', w.hourly_rate,
    'service_radius', w.service_radius,
    'certifications', w.certifications,
    'languages', w.languages,
    'verification_status', w.verification_status,
    'emergency_contact_name', w.emergency_contact_name,
    'emergency_contact_phone', w.emergency_contact_phone,
    'created_at', w.created_at,
    'verified_at', w.verified_at
  ) INTO walker_data
  FROM walkers w
  JOIN users u ON w.user_id = u.id
  WHERE w.id = walker_uuid;

  -- Récupérer les documents
  SELECT json_agg(
    json_build_object(
      'document_type', document_type,
      'document_name', document_name,
      'upload_date', upload_date,
      'verified', verified,
      'verified_at', verified_at
    )
  ) INTO documents_data
  FROM walker_documents
  WHERE walker_id = walker_uuid;

  -- Retourner le JSON complet
  RETURN json_build_object(
    'walker', walker_data,
    'documents', COALESCE(documents_data, '[]'::json),
    'generated_at', now()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Accorder les permissions nécessaires
GRANT EXECUTE ON FUNCTION public.generate_walker_summary(UUID) TO authenticated;

