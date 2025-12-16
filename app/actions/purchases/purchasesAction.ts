"use server";

import { PurchaseType } from "@/features/purchases/schema";
import { db } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";

export type PurchasesTypeData = {
  id: string;
  year: number;
  month: number;
  days: {
    day: number;
    purchase: string;
    fuel: string;
    cleaning: string;
    payment: string;
  }[];
};

// create day purchase
export async function createPurchaseByDay(formData: PurchaseType) {
  const day = formData.date.getDate();
  const month = formData.date.getMonth() + 1;
  const year = formData.date.getFullYear();

  const docId = `${year}-${month}`;
  const docRef = db.collection("purchases").doc(docId);

  const newDayData = {
    day,
    purchase: formData.purchase,
    fuel: formData.fuel,
    cleaning: formData.cleaning,
    payment: formData.payment,
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

  updateTag("purchases");

  return docId;
}

// update day

// delete day

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

export const _getPurchasesByMonthYear = async (docId: string) => {
  const snapshot = await db.collection("purchases").doc(docId).get();
  console.log(snapshot);

  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const getPurchasesByMonthYear = unstable_cache(
  _getPurchasesByMonthYear,
  ["purchases"],
  {
    revalidate: false,
    tags: ["purchases"],
  }
);
