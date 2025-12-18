"use server";
import { db } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";

export type BalanceTypeData = {
  initialBalance: string;
  id: string;
  year: number;
  month: number;
};

export async function createBalanceByMonth({
  month,
  year,
  initialBalance,
}: {
  month: number;
  year: number;
  initialBalance: string;
}) {
  const docId = `${year}-${month}`;
  const docRef = db.collection("balance").doc(docId);

  await docRef.set(
    {
      year,
      month,
      initialBalance: initialBalance,
    },
    { merge: true }
  );
  updateTag("balance");

  return docId;
}

export const _getAddBalanceByMonthYear = async (docId: string) => {
  const snapshot = await db.collection("balance").doc(docId).get();

  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const getAddBalanceByMonthYear = unstable_cache(
  _getAddBalanceByMonthYear,
  ["balance"],
  {
    revalidate: false,
    tags: ["balance"],
  }
);
