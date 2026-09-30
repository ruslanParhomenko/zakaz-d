import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = ["/", "/signin", "/403"];
const USER_SEGMENT = ["form", "add-cash", "purchases"];

function getCurrentMonthYear() {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Chisinau" }),
  );
  return { month: String(now.getMonth() + 1), year: String(now.getFullYear()) };
}

function withMonthYear(url: URL) {
  const { month, year } = getCurrentMonthYear();
  url.searchParams.set("month", month);
  url.searchParams.set("year", year);
  return url;
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const hasParams = searchParams.has("month") && searchParams.has("year");

  if (token.role === "ADMIN") {
    if (hasParams) return NextResponse.next();

    return NextResponse.redirect(withMonthYear(new URL(request.url)));
  }

  if (token.role === "USER") {
    const segment = pathname.split("/")[1];

    if (USER_SEGMENT.includes(segment) && hasParams) {
      return NextResponse.next();
    }

    return NextResponse.redirect(withMonthYear(new URL("/form", request.url)));
  }

  return NextResponse.redirect(new URL("/403", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.webp$|.*\\.ico$).*)",
  ],
};
