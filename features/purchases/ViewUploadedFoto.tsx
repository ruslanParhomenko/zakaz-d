import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function ViewUploadedFoto({
  data,
  setSelectedFiles,
}: {
  data: File[];
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
}) {
  if (!data || data.length === 0) return null;

  const removeFile = (index: number) => {
    setSelectedFiles((prev: File[]) => prev.filter((_, i) => i !== index));
  };
  return (
    <div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {data.map((file, index) => (
          <div
            key={index}
            className="relative border rounded-lg p-2 group overflow-visible"
          >
            <button type="button" onClick={() => removeFile(index)}>
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-square">
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="object-cover rounded"
                sizes="100px"
              />
            </div>

            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
