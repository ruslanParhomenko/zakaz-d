"use server";

import { AddCashType } from "@/features/add-cash/schema";
import { db } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";

export type AddCashTypeData = {
  initialBalance: string;
  id: string;
  year: number;
  month: number;
  days: {
    day: number;
    addCash: string;
  }[];
};

// create day
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
// delete day
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

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);

    if (!snap.exists) {
      throw new Error("Документ за месяц не найден");
    }

    const docData = snap.data();
    const days = docData?.days ?? [];

    const filteredDays = days.filter((d: any) => d.day !== day);

    if (filteredDays.length === days.length) {
      throw new Error(`Запись за ${day} число не найдена`);
    }

    tx.update(docRef, { days: filteredDays });
  });

  updateTag("purchases");

  return docId;
}

// get day
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
