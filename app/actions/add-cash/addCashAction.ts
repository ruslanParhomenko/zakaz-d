"use server";

import { AddCashType } from "@/features/add-cash/schema";
import { db } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";

export type AddCashTypeData = {
  id: string;
  year: number;
  month: number;
  days: {
    day: number;
    addCash: number;
  }[];
};

export async function createAddCashByDay(formData: AddCashType) {
  const day = formData.date.getDate();
  const month = formData.date.getMonth() + 1;
  const year = formData.date.getFullYear();

  const docId = `${year}-${month}`;
  const docRef = db.collection("addCash").doc(docId);

  const newDayData = {
    day,
    addCash: formData.addCash,
  };

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);

    if (!snap.exists) {
      tx.set(docRef, {
        year,
        month,
        days: [newDayData],
      });
      return;
    }

    const data = snap.data();
    const days = data?.days ?? [];

    const index = days.findIndex((d: any) => d.day === day);

    if (index === -1) {
      days.push(newDayData);
    } else {
      days[index] = newDayData;
    }

    tx.update(docRef, { days });
  });

  updateTag("addCash");

  return docId;
}

export const _getAddCashByMonthYear = async (docId: string) => {
  const snapshot = await db.collection("addCash").doc(docId).get();

  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const getAddCashByMonthYear = unstable_cache(
  _getAddCashByMonthYear,
  ["addCash"],
  {
    revalidate: false,
    tags: ["addCash"],
  }
);
