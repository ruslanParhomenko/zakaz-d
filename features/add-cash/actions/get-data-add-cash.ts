"use server";

import { db } from "@/lib/firebase";
import { unstable_cache } from "next/cache";
import { GetAddCashByMonthYearType } from "../model/type";
import { ADD_CASH_TAG } from "@/constants/actions-tags";

const actionTag = ADD_CASH_TAG;

export const _getAddCashByMonthYear = async (docId: string) => {
  const snapshot = await db.collection(actionTag).doc(docId).get();

  if (!snapshot.exists) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as GetAddCashByMonthYearType;
};

export const getAddCashByMonthYear = unstable_cache(
  _getAddCashByMonthYear,
  ["addCash-by-month"],
  {
    revalidate: false,
    tags: [actionTag],
  },
);
