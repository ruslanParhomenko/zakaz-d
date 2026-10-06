import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function ViewSelectPhoto({
  selectedPhoto,
  setSelectedPhoto,
}: {
  selectedPhoto: string | null;
  setSelectedPhoto: Dispatch<SetStateAction<string | null>>;
}) {
  if (!selectedPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90"
      onClick={() => setSelectedPhoto(null)}
    >
      <div className="relative w-full h-full">
        <button
          className="absolute top-4 right-4 z-10 bg-black/60 rounded p-1"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPhoto(null);
          }}
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <img
          src={selectedPhoto}
          alt="Фото"
          className="absolute inset-0 w-full h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
