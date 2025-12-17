import Image from "next/image";

export default function PageFoto({ files }: { files: any[] }) {
  if (!files) return <div>Загрузка...</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-2">
        {files.map((file) => (
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
  );
}
