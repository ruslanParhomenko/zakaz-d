"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ViewSelectPhoto from "./ViewSelectPhoto";
import {
  deleteUrlPhotoByDay,
  UrlsTypeData,
} from "@/app/actions/url-photo/urlAction";
import { getMonthDays } from "@/lib/utils";
import { Trash } from "lucide-react";

export default function TableFoto({
  days,
  dataUrls,
  month,
  year,
}: {
  days: ReturnType<typeof getMonthDays>;
  dataUrls: UrlsTypeData;
  month: number;
  year: number;
}) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>день</TableHead>
            <TableHead>Фото</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {days.map((day) => {
            const urlsFoto = dataUrls?.days?.[day.day]?.urls;
            if (!urlsFoto || urlsFoto.length === 0) return null;

            return (
              <TableRow
                key={day.day}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell>
                  {day.day}- {day.weekday}
                </TableCell>
                <TableCell onClick={() => setSelectedPhoto(urlsFoto[0])}>
                  открыть фото
                </TableCell>
                <TableCell
                  onClick={() =>
                    deleteUrlPhotoByDay({ day: day.day, month, year })
                  }
                >
                  <Trash className="h-4 w-4 text-red-700" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <ViewSelectPhoto
        selectedPhoto={selectedPhoto || ""}
        setSelectedPhoto={setSelectedPhoto}
      />
    </>
  );
}
