"use client";

import { useState } from "react";
import { getMonthDays, MONTHS_STRING } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import { UrlsTypeData } from "@/app/actions/url-photo/urlAction";

export default function PageFoto({
  dataUrls,
  month,
  year,
}: {
  dataUrls: UrlsTypeData;
  month: number;
  year: number;
}) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!dataUrls) return <div>данные не найдены</div>;

  const days = getMonthDays({ month, year });

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>день</TableHead>
            <TableHead>{MONTHS_STRING[month - 1]}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {days.map((day) => {
            const purchaseByDay = dataUrls?.days?.[day.day];
            const urlsFoto = purchaseByDay?.urls;
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

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-[900px] h-[80vh] bg-white p-4 rounded">
            <button
              className="absolute top-3 right-3 bg-black rounded p-1"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <img
              src={selectedPhoto}
              alt="Фото"
              className="max-w-full max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
