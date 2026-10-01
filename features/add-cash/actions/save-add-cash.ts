"use server";
import { ADD_CASH_TAG } from "@/constants/actions-tags";
import { db } from "@/lib/firebase";
import { updateTag } from "next/cache";

const actionTag = ADD_CASH_TAG;

export async function saveAddCashByDay({
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
  const docRef = db.collection(actionTag).doc(docId);

  await docRef.set(
    {
      year,
      month,
      days: {
        [day]: { addCash },
      },
    },
    { merge: true },
  );

  updateTag(actionTag);

  return docId;
}
