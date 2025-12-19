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
import { UrlsTypeData } from "@/app/actions/url-photo/urlAction";
import { getMonthDays } from "@/lib/utils";

export default function TableFoto({
  days,
  dataUrls,
}: {
  days: ReturnType<typeof getMonthDays>;
  dataUrls: UrlsTypeData;
}) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>день</TableHead>
            <TableHead>Фото</TableHead>
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
                onClick={() => setSelectedPhoto(urlsFoto[0])}
              >
                <TableCell>
                  {day.day}- {day.weekday}
                </TableCell>
                <TableCell>открыть фото</TableCell>
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
