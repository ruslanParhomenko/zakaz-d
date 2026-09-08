import { NextRequest } from "next/server";

export function getHomeUrl(request: NextRequest, pathname?: string) {
  const url = new URL(pathname || "/archive", request.url);

  const now = new Date();

  url.searchParams.set(
    "month",
    request.nextUrl.searchParams.get("month") ?? String(now.getMonth() + 1),
  );

  url.searchParams.set(
    "year",
    request.nextUrl.searchParams.get("year") ?? String(now.getFullYear()),
  );

  return url;
}
