"use server";

import { db } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";

export type PurchasesTypeData = {
  id: string;
  year: number;
  month: number;
  days: Record<
    number,
    {
      purchase: string;
      fuel: string;
      cleaning: string;
      payment: string;
    }
  >;
};

// CREATE / UPDATE DAY
export async function createPurchaseByDay({
  day,
  month,
  year,
  purchase,
  fuel,
  cleaning,
  payment,
}: {
  day: number;
  month: number;
  year: number;
  purchase: string;
  fuel: string;
  cleaning: string;
  payment: string;
}) {
  const docId = `${year}-${month}`;
  const docRef = db.collection("purchases").doc(docId);

  await docRef.set(
    {
      year,
      month,
      days: {
        [day]: { purchase, fuel, cleaning, payment },
      },
    },
    { merge: true }
  );

  updateTag("purchases");

  return docId;
}

// DELETE DAY
export async function deletePurchaseByDay({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}) {
  const docId = `${year}-${month}`;
  const docRef = db.collection("purchases").doc(docId);

  await docRef.update({
    [`days.${day}`]: FieldValue.delete(),
  });

  updateTag("purchases");

  return docId;
}

// GET
export const _getPurchasesByMonthYear = async (docId: string) => {
  const snapshot = await db.collection("purchases").doc(docId).get();

  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as PurchasesTypeData;
};

export const getPurchasesByMonthYear = unstable_cache(
  _getPurchasesByMonthYear,
  ["purchases-by-month"],
  {
    revalidate: false,
    tags: ["purchases"],
  }
);
