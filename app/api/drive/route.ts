import { listFilesInSubfolders } from "@/app/actions/google/googleAction";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const files = await listFilesInSubfolders();
    console.log(files);
    return NextResponse.json(files);
  } catch (err) {
    return NextResponse.json(
      { error: "Не удалось получить файлы", details: err },
      { status: 500 }
    );
  }
}
