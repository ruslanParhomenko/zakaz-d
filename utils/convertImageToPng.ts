import heic2any from "heic2any";

export const convertImageToPng = async (file: File): Promise<File> => {
  // Уже PNG — ничего не делаем
  if (file.type === "image/png") {
    return file;
  }

  // HEIC / HEIF
  if (file.type === "image/heic" || file.type === "image/heif") {
    const blob = (await heic2any({
      blob: file,
      toType: "image/png",
      quality: 1,
    })) as Blob;

    return new File([blob], file.name.replace(/\.(heic|heif)$/i, ".png"), {
      type: "image/png",
    });
  }

  // JPG / WEBP → PNG через canvas
  return convertRasterToPng(file);
};

const convertRasterToPng = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context error"));
          return;
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("PNG conversion failed"));
            return;
          }

          resolve(
            new File([blob], file.name.replace(/\.[^/.]+$/, ".png"), {
              type: "image/png",
            })
          );
        }, "image/png");
      };

      img.onerror = () => reject(new Error("Image decode error"));

      img.src = reader.result as string;
    };

    reader.onerror = () => reject(new Error("FileReader error"));

    reader.readAsDataURL(file);
  });
};
