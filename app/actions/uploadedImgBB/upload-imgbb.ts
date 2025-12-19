"use server";

export async function uploadToImgBB(files: File[]) {
  try {
    const urls: string[] = [];

    for (const file of files) {
      const buffer = await file.arrayBuffer();

      const formData = new FormData();
      formData.append(
        "image",
        new Blob([buffer], { type: "image/png" }),
        file.name
      );
      formData.append("key", process.env.IMGBB_API_KEY!);

      const res = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        return {
          success: false,
          error: `ImgBB error: ${text}`,
        };
      }

      const json = await res.json();
      urls.push(json.data.url);
    }

    return {
      success: true,
      urls,
    };
  } catch (err) {
    console.error("uploadToImgBB failed:", err);

    return {
      success: false,
      error: "Server upload failed",
    };
  }
}
