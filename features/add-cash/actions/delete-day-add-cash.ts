"use server";

import { ADD_CASH_TAG } from "@/constants/actions-tags";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";
import { updateTag } from "next/cache";

const actionTag = ADD_CASH_TAG;

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
  const docRef = db.collection(actionTag).doc(docId);

  await docRef.update({
    [`days.${day}`]: FieldValue.delete(),
  });

  updateTag(actionTag);

  return docId;
}
