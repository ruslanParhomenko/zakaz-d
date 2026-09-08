import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getHomeUrl } from "./lib/home-url";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/403") {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const role = token?.role;

  if (role !== "ADMIN") {
    if (pathname === "/") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/403", request.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(getHomeUrl(request));
  }
  if (pathname !== "/403") {
    const hasMonth = request.nextUrl.searchParams.has("month");
    const hasYear = request.nextUrl.searchParams.has("year");

    if (!hasMonth || !hasYear) {
      return NextResponse.redirect(getHomeUrl(request, "/archive"));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.webp$|.*\\.ico$).*)",
  ],
};
