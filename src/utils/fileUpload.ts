import { supabase } from "@/integrations/supabase/client";

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

export const uploadFile = async (
  file: File,
  bucket: string,
  folder: string,
  fileName?: string
): Promise<UploadResult> => {
  try {
    // Générer un nom de fichier unique si non fourni
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const finalFileName = fileName || `${timestamp}.${fileExtension}`;
    const filePath = `${folder}/${finalFileName}`;

    // Télécharger le fichier vers Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    // Obtenir l'URL publique du fichier
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      url: urlData.publicUrl,
      path: filePath
    };
  } catch (error: any) {
    return {
      url: '',
      path: '',
      error: error.message || 'Erreur lors du téléchargement'
    };
  }
};

export const deleteFile = async (
  bucket: string,
  filePath: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Erreur lors de la suppression'
    };
  }
};

export const getFileUrl = (bucket: string, filePath: string): string => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
};

export const validateFile = (
  file: File,
  allowedTypes: string[],
  maxSizeMB: number
): { valid: boolean; error?: string } => {
  // Vérifier la taille
  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      valid: false,
      error: `Le fichier ne doit pas dépasser ${maxSizeMB}MB`
    };
  }

  // Vérifier le type
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  const mimeType = file.type;
  
  const isValidType = allowedTypes.some(type => 
    type === fileExtension || 
    (type.startsWith('.') && fileExtension === type) ||
    (type.includes('/') && mimeType === type)
  );

  if (!isValidType) {
    return {
      valid: false,
      error: `Types autorisés: ${allowedTypes.join(', ')}`
    };
  }

  return { valid: true };
};

export const generateFileName = (originalName: string, prefix?: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  const baseName = originalName.split('.').slice(0, -1).join('.');
  
  const cleanBaseName = baseName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .substring(0, 20);
  
  const finalPrefix = prefix ? `${prefix}_` : '';
  
  return `${finalPrefix}${cleanBaseName}_${timestamp}_${randomString}.${extension}`;
};

