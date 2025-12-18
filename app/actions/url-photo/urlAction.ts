"use server";

import { db } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";

export type UrlsTypeData = {
  id: string;
  year: number;
  month: number;
  days: Record<number, { urls: string[] }>;
};

// CREATE / UPDATE DAY
export async function createUrlPhotoByDay({
  day,
  month,
  year,
  urls,
}: {
  day: number;
  month: number;
  year: number;
  urls: string[];
}) {
  const docId = `${year}-${month}`;
  const docRef = db.collection("addUrls").doc(docId);

  await docRef.set(
    {
      year,
      month,
      days: {
        [day]: { urls },
      },
    },
    { merge: true }
  );

  updateTag("addUrls");

  return docId;
}

// DELETE DAY
export async function deleteUrlPhotoByDay({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}) {
  const docId = `${year}-${month}`;
  const docRef = db.collection("addUrls").doc(docId);

  await docRef.update({
    [`days.${day}`]: FieldValue.delete(),
  });

  updateTag("addUrls");

  return docId;
}

// GET
export const _getAddUrlsByMonthYear = async (docId: string) => {
  const snapshot = await db.collection("addUrls").doc(docId).get();

  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as AddCashTypeData;
};

export const getAddUrlsByMonthYear = unstable_cache(
  _getAddUrlsByMonthYear,
  ["addUrls-by-month"],
  {
    revalidate: false,
    tags: ["addUrls"],
  }
);
