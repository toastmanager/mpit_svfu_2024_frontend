'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'; // <-- 1. Добавлен импорт Skeleton
import placesService from '@/services/places.service';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type ExistingImage = {
  url: string;
  key: string;
};

const UploadImagePage = () => {
  const { id } = useParams<{ id: string }>();
  const placeId = Number(id);
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!placeId) {
      setIsLoading(false);
      return;
    }

    const fetchPlaceImages = async () => {
      setIsLoading(true);
      try {
        const placeData = await placesService.getById(placeId);
        if (placeData.imageUrls && placeData.imageKeys) {
          const combinedImages = placeData.imageUrls.map((url, index) => ({
            url: url,
            key: placeData.imageKeys![index],
          }));
          setExistingImages(combinedImages);
        }
      } catch (error) {
        console.error('Failed to fetch place data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceImages();
  }, [placeId]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => {
      const newFiles = acceptedFiles.filter(
        (newFile) =>
          !prevFiles.some((prevFile) => prevFile.name === newFile.name),
      );
      return [...prevFiles, ...newFiles];
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
  });

  const removeNewFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const handleRemoveExistingImage = async (imageKey: string) => {
    const imageToRemove = existingImages.find((img) => img.key === imageKey);
    if (!imageToRemove) return;

    setExistingImages((current) =>
      current.filter((img) => img.key !== imageKey),
    );

    try {
      await placesService.deleteImage(placeId, imageKey);
    } catch (error) {
      console.error('Failed to delete image:', error);
      setExistingImages((current) =>
        [...current, imageToRemove].sort(/* optional sort */),
      );
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      router.push(`/places/${placeId}`);
      return;
    }

    setIsUploading(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        await placesService.uploadSingleImage(placeId, formData);
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
      }
    }
    setIsUploading(false);
    router.push(`/places/${placeId}`);
  };

  // --- 2. Добавлена реализация функции рендеринга скелетонов ---
  const renderSkeletons = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-32 rounded-md" />
      ))}
    </div>
  );

  return (
    <div className="min-h-full flex justify-center items-center">
      <Card className="max-w-[800px] w-full mt-5 mb-20">
        <CardHeader>
          <CardTitle>Управление изображениями</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-border'
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-12 h-12 text-muted-foreground" />
            <p className="mt-4 text-center text-muted-foreground">
              {isDragActive
                ? 'Отпустите файлы для добавления'
                : 'Перетащите изображения сюда или нажмите для выбора'}
            </p>
          </div>

          {isLoading
            ? renderSkeletons()
            : (existingImages.length > 0 || files.length > 0) && (
                <div className="space-y-4">
                  {existingImages.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Уже загруженные
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {existingImages.map((image) => (
                          <div key={image.key} className="relative group">
                            <Image
                              src={image.url}
                              alt="Загруженное изображение"
                              width={150}
                              height={150}
                              className="object-cover w-full h-32 rounded-md"
                            />
                            <button
                              onClick={() =>
                                handleRemoveExistingImage(image.key)
                              }
                              className="absolute top-1 right-1 bg-red-600/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {files.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Новые для загрузки
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {files.map((file) => (
                          <div key={file.name} className="relative group">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={`Превью ${file.name}`}
                              width={150}
                              height={150}
                              className="object-cover w-full h-32 rounded-md"
                              onLoad={(e) =>
                                URL.revokeObjectURL(e.currentTarget.src)
                              }
                            />
                            <button
                              onClick={() => removeNewFile(file.name)}
                              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

          <div className="flex justify-end gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push(`/places/${placeId}`)}
            >
              Готово
            </Button>
            <Button
              onClick={handleUpload}
              disabled={isUploading || files.length === 0}
            >
              {isUploading
                ? 'Загрузка...'
                : `Загрузить новые (${files.length})`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadImagePage;
