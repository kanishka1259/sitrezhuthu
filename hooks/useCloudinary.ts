'use client';

import { useState, useCallback } from 'react';

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: unknown, result: { event: string; info: { secure_url: string } }) => void
      ) => { open: () => void };
    };
  }
}

interface UseCloudinaryReturn {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  openWidget: () => void;
  clearImage: () => void;
}

export function useCloudinary(): UseCloudinaryReturn {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openWidget = useCallback(() => {
    const widget = window.cloudinary?.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
        uploadPreset: (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'portfolio_gen_preset') as string,
        folder: 'portfolio-gen',
        resourceType: 'auto',
        maxFileSize: 5000000,
      },
      (err, result) => {
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
