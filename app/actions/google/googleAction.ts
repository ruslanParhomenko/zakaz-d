"use server";

import { google } from "googleapis";

const TARGET_FOLDER_ID = "1_gAg45oPSXhdlID5irGHn_OYcJJg9ELj";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

// Получаем список файлов и папок в указанной папке
export async function listFolderContents(folderId: string) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: "files(id, name, mimeType, webViewLink, webContentLink)",
  });
  return res.data.files || [];
}

// Получаем содержимое всех подпапок с номерами от 1 до 12
export async function listFilesInSubfolders() {
  const folders = await listFolderContents(TARGET_FOLDER_ID);

  // Фильтруем только папки с цифрами 1-12
  const numberedFolders = folders.filter(
    (f) =>
      f.mimeType === "application/vnd.google-apps.folder" &&
      /^[1-9]$|^1[0-2]$/.test(f.name as string)
  );

  const allFiles: { folderName: string; files: any[] }[] = [];

  for (const folder of numberedFolders) {
    const files = await listFolderContents(folder.id as string);
    allFiles.push({ folderName: folder.name as string, files });
  }

  return allFiles;
}
