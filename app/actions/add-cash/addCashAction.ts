"use server";

import { db } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";

export type AddCashTypeData = {
  initialBalance: string;
  id: string;
  year: number;
  month: number;
  days: Record<number, { addCash: string }>;
};

// CREATE / UPDATE DAY
export async function createAddCashByDay({
  day,
  month,
  year,
  addCash,
}: {
  day: number;
  month: number;
  year: number;
  addCash: string;
}) {
  const docId = `${year}-${month}`;
  const docRef = db.collection("addCash").doc(docId);

  await docRef.set(
    {
      year,
      month,
      days: {
        [day]: { addCash },
      },
    },
    { merge: true }
  );

  updateTag("addCash");

  return docId;
}

// DELETE DAY
export async function deleteAddCashByDay({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}) {
  const docId = `${year}-${month}`;
  const docRef = db.collection("addCash").doc(docId);

  await docRef.update({
    [`days.${day}`]: FieldValue.delete(),
  });

  updateTag("addCash");

  return docId;
}

// GET
export const _getAddCashByMonthYear = async (docId: string) => {
  const snapshot = await db.collection("addCash").doc(docId).get();

  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as AddCashTypeData;
};

export const getAddCashByMonthYear = unstable_cache(
  _getAddCashByMonthYear,
  ["addCash-by-month"],
  {
    revalidate: false,
    tags: ["addCash"],
  }
);
