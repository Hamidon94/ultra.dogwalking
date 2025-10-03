import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface FileUploadProps {
  label: string;
  description?: string;
  accept?: string;
  maxSize?: number; // en MB
  required?: boolean;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  description,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 5,
  required = false,
  value,
  onChange,
  error
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    // Vérifier la taille du fichier
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: `Le fichier ne doit pas dépasser ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }

    // Vérifier le type de fichier
    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type;
    
    const isValidType = allowedTypes.some(type => 
      type === fileExtension || 
      (type.startsWith('.') && fileExtension === type) ||
      (type.includes('/') && mimeType === type)
    );

    if (!isValidType) {
      toast({
        title: "Type de fichier non autorisé",
        description: `Types autorisés: ${accept}`,
        variant: "destructive",
      });
      return;
    }

    onChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {!value ? (
        <Card 
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            dragOver 
              ? 'border-primary bg-primary/5' 
              : error 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-8 px-4">
            <Upload className={`h-8 w-8 mb-2 ${error ? 'text-red-400' : 'text-gray-400'}`} />
            <p className="text-sm text-center mb-2">
              <span className="font-medium">Cliquez pour télécharger</span> ou glissez-déposez
            </p>
            <p className="text-xs text-muted-foreground text-center">
              {accept} (max {maxSize}MB)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-green-200 bg-green-50">
          <CardContent className="flex items-center justify-between py-3 px-4">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">{value.name}</p>
                <p className="text-xs text-green-600">{formatFileSize(value.size)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="flex items-center space-x-1 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};

