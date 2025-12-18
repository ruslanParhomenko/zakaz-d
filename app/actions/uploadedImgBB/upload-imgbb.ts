"use server";

export async function uploadToImgBB(files: File[]) {
  const urls: string[] = [];

  for (const file of files) {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const formData = new FormData();
    formData.append("image", base64);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Ошибка загрузки в ImgBB");
    }

    const json = await res.json();
    urls.push(json.data.url);
  }

  return urls;
}
