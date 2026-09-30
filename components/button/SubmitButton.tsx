"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft, Save } from "lucide-react";

export default function SubmitButton({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  const router = useRouter();
  return (
    <div className="mt-0 py-2 flex items-center justify-end gap-10">
      <Button
        variant="ghost"
        className="h-8 w-18"
        type="button"
        aria-label="Назад"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-12 font-bold text-red-600" />
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
