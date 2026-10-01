"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowBigLeft, ArrowLeft, Save } from "lucide-react";

export default function SubmitButton({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  const router = useRouter();
  return (
    <div className="py-1 flex items-center justify-end gap-8">
      <Button
        variant="ghost"
        className="h-8 w-18"
        type="button"
        aria-label="Назад"
        onClick={() => router.back()}
      >
        <ArrowBigLeft className="font-bold text-red-600 size-6 fill-red-600" />
      </Button>

      <Button
        variant="default"
        type="submit"
        disabled={isSubmitting}
        aria-label="Сохранить"
        className="h-8 w-18  border-blue-600 text-white font-bold"
      >
        save
      </Button>
    </div>
  );
}
