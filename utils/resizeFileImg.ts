// utils/fileUtils.ts
export const MAX_SIZE = 300_000; // 100 KB

/**
 * Проверяет файл и уменьшает его размер, если он больше MAX_SIZE.
 * Работает только с изображениями (JPEG/PNG/WEBP).
 */
export const resizeFileIfNeeded = async (file: File): Promise<File> => {
  if (file.size <= MAX_SIZE) return file;

  if (!file.type.startsWith("image/")) {
    // Для не-изображений просто возвращаем оригинал
    return file;
  }

  // Создаем изображение
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = () => resolve(image);
      image.onerror = reject;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  // canvas для уменьшения размера
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const scale = Math.sqrt(MAX_SIZE / file.size);

  canvas.width = img.width * scale;
  canvas.height = img.height * scale;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.8)
  );

  return new File([blob], file.name, { type: "image/jpeg" });
};
