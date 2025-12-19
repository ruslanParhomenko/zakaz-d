// "use server";

// import { bucket } from "@/lib/firebase";
// import { randomUUID } from "crypto";

// export async function uploadPhotos(
//   formData: FormData,
//   year: number,
//   month: number,
//   day: number
// ) {
//   try {
//     const files = formData.getAll("photos") as File[];

//     if (!files.length) {
//       return { success: false, urls: [], error: "Файлы не найдены" };
//     }

//     const folder = `purchases/${year}/${month}/${day}`;
//     const urls: string[] = [];

//     for (const file of files) {
//       if (!(file instanceof File)) continue;

//       const buffer = Buffer.from(await file.arrayBuffer());
//       const ext = file.name.split(".").pop();
//       const filename = `${folder}/${randomUUID()}.${ext}`;

//       const firebaseFile = bucket.file(filename);

//       await firebaseFile.save(buffer, {
//         metadata: {
//           contentType: file.type,
//         },
//       });

//       await firebaseFile.makePublic();

//       urls.push(`https://storage.googleapis.com/${bucket.name}/${filename}`);
//     }

//     return {
//       success: true,
//       urls,
//       message: `Загружено ${urls.length} файлов`,
//     };
//   } catch (error: any) {
//     console.error("uploadPhotos error:", error);

//     return {
//       success: false,
//       urls: [],
//       error: error.message || "Ошибка загрузки",
//     };
//   }
// }
