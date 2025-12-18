"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function SubmitButton({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  const router = useRouter();
  return (
    <div className="mt-0 py-2 flex items-center justify-end gap-6">
      <Button variant="outline" type="button" onClick={() => router.back()}>
        Выйти
      </Button>

      <Button
        type="submit"
        disabled={isSubmitting}
        onClick={() => router.back()}
      >
        Сохранить
      </Button>
    </div>
  );
}
