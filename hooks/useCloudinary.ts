'use client';

import { useState, useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

interface UseCloudinaryReturn {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  openWidget: () => void;
  clearImage: () => void;
}

export function useCloudinary(): UseCloudinaryReturn {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openWidget = useCallback(() => {
    const widget = (window as any).cloudinary?.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'portfolio_gen_preset',
        folder: 'portfolio-gen',
        resourceType: 'auto',
        maxFileSize: 5000000,
      },
      (err: any, result: any) => {
        if (err) {
          setError('Upload failed');
          console.error(err);
        } else if (result?.event === 'success') {
          setImageUrl(result.info.secure_url);
          setError(null);
        }
      }
    );
    widget?.open();
  }, []);

  const clearImage = useCallback(() => {
    setImageUrl(null);
    setError(null);
  }, []);

  return {
    imageUrl,
    isLoading,
    error,
    openWidget,
    clearImage,
  };
}
