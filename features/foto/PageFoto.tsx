export default function PageFoto({ files }: { files: any[] }) {
  if (!files) return <div>Загрузка...</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-2">
        {files.map((file) => (
          <a
            key={file.id}
            href={file.webViewLink || file.webContentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border p-2 rounded hover:shadow"
          >
            {file.mimeType.startsWith("image/") ? (
              <button type="button" className="w-20 h-10">
                {file.name}
              </button>
            ) : (
              <div className="text-center">{file.name}</div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
