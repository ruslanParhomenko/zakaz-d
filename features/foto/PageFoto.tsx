"use client";

import { MONTHS_STRING } from "@/lib/utils";
import Image from "next/image";

interface FileItem {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
}

interface FolderFiles {
  folderName: string;
  files: FileItem[];
}

export default function PageFoto({ files }: { files: FolderFiles[] }) {
  console.log(files);

  if (!files) return <div>Загрузка...</div>;

  return (
    <div className="p-4">
      {files.map((folder) => (
        <div key={folder.folderName} className="mb-8">
          <h2 className="text-xl font-bold mb-2">
            {MONTHS_STRING[Number(folder.folderName!) - 1]}
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {folder.files.map((file) => (
              <a
                key={file.id}
                href={file.webViewLink || file.webContentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border p-2 rounded hover:shadow"
              >
                {file.mimeType.startsWith("image/") ? (
                  <Image
                    src={file.webContentLink as string}
                    width={200}
                    height={200}
                    alt={file.name}
                    className="w-full h-30 object-cover"
                  />
                ) : (
                  <div className="text-center">{file.name}</div>
                )}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
