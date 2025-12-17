import { listFilesByFolderNumber } from "@/app/actions/google/googleAction";
import PageFoto from "@/features/foto/PageFoto";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { month, year } = await searchParams;
  if (!month || !year) return null;
  const files = await listFilesByFolderNumber(+month);
  return <PageFoto files={files} />;
}
