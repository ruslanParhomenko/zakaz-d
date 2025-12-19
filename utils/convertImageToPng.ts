// import heic2any from "heic2any";

// const MAX_SIZE = 5_000_000;
// const MAX_DIMENSION = 1920;

// export const convertImageToPng = async (file: File): Promise<File> => {
//   let pngFile: File;

//   if (file.type === "image/png") {
//     pngFile = file;
//   } else if (file.type === "image/heic" || file.type === "image/heif") {
//     const blob = (await heic2any({
//       blob: file,
//       toType: "image/png",
//       quality: 1,
//     })) as Blob;

//     pngFile = new File([blob], file.name.replace(/\.(heic|heif)$/i, ".png"), {
//       type: "image/png",
//     });
//   } else {
//     pngFile = await convertRasterToPng(file);
//   }

//   if (pngFile.size > MAX_SIZE) {
//     pngFile = await resizePngFile(pngFile, MAX_DIMENSION);
//   }

//   return pngFile;
// };

// const resizePngFile = (file: File, maxDim: number): Promise<File> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       const img = new Image();

//       img.onload = () => {
//         let { width, height } = img;

//         if (width > height && width > maxDim) {
//           height = Math.round((height * maxDim) / width);
//           width = maxDim;
//         } else if (height > width && height > maxDim) {
//           width = Math.round((width * maxDim) / height);
//           height = maxDim;
//         } else if (width === height && width > maxDim) {
//           width = maxDim;
//           height = maxDim;
//         }

//         const canvas = document.createElement("canvas");
//         canvas.width = width;
//         canvas.height = height;

//         const ctx = canvas.getContext("2d");
//         if (!ctx) {
//           reject(new Error("Canvas context error"));
//           return;
//         }

//         ctx.drawImage(img, 0, 0, width, height);

//         canvas.toBlob(
//           (blob) => {
//             if (!blob) {
//               reject(new Error("PNG conversion failed"));
//               return;
//             }

//             resolve(
//               new File([blob], file.name.replace(/\.[^/.]+$/, ".png"), {
//                 type: "image/png",
//               })
//             );
//           },
//           "image/png",
//           0.9 // Качество 90%
//         );
//       };

//       img.onerror = () => reject(new Error("Image decode error"));

//       img.src = reader.result as string;
//     };

//     reader.onerror = () => reject(new Error("FileReader error"));

//     reader.readAsDataURL(file);
//   });
// };

// const convertRasterToPng = (file: File) => {
//   return resizePngFile(file, MAX_DIMENSION);
// };
