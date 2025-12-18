// "use server";

// import { google } from "googleapis";

// const TARGET_FOLDER_ID = "1_gAg45oPSXhdlID5irGHn_OYcJJg9ELj";

// const auth = new google.auth.GoogleAuth({
//   credentials: {
//     client_email: process.env.GOOGLE_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     project_id: process.env.GOOGLE_PROJECT_ID,
//   },
//   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
// });

// const drive = google.drive({ version: "v3", auth });

// const folderCache: Record<number, { timestamp: number; data: any }> = {};

// const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 часа

// async function listFolderContents(folderId: string) {
//   const res = await drive.files.list({
//     q: `'${folderId}' in parents and trashed=false`,
//     fields: "files(id, name, mimeType, webViewLink, webContentLink)",
//   });
//   return res.data.files || [];
// }

// async function getFolderIdByNumber(folderNumber: number) {
//   const res = await drive.files.list({
//     q: `'${TARGET_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
//     fields: "files(id, name)",
//   });

//   const folder = res.data.files?.find(
//     (f) => f.name === folderNumber.toString()
//   );

//   return folder?.id || null;
// }

// export async function listFilesByFolderNumber(folderNumber: number) {
//   const now = Date.now();

//   if (
//     folderCache[folderNumber] &&
//     now - folderCache[folderNumber].timestamp < CACHE_TTL
//   ) {
//     return folderCache[folderNumber].data;
//   }

//   const folderId = await getFolderIdByNumber(folderNumber);
//   if (!folderId) return [];

//   const files = await listFolderContents(folderId);

//   folderCache[folderNumber] = { timestamp: now, data: files };

//   return files;
// }
