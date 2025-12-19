import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function ViewSelectPhoto({
  selectedPhoto,
  setSelectedPhoto,
}: {
  selectedPhoto: string;
  setSelectedPhoto: Dispatch<SetStateAction<string | null>>;
}) {
  if (!selectedPhoto) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-[90%] max-w-[900px] h-[80vh] bg-white p-4 rounded">
        <button
          className="absolute top-3 right-3 bg-black rounded p-1"
          onClick={() => setSelectedPhoto(null)}
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <img
          src={selectedPhoto}
          alt="Фото"
          className="max-w-full max-h-[80vh]"
        />
      </div>
    </div>
  );
}
