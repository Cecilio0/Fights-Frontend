import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  console.log("MIDDLEWARE INTERVENTION: AUTHORIZED");
  if (!req.auth) {
    console.log("MIDDLEWARE INTERVENTION: UNAUTHORIZED");
    const url = req.url.replace(req.nextUrl.pathname, "/login");

    return NextResponse.redirect(url);
  }

  if (req.auth.isExpired) {
    console.log("MIDDLEWARE INTERVENTION: TOKEN EXPIRED");
    const url = req.url.replace(req.nextUrl.pathname, "/logout");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/fighters/:path*",
    "/fights/:path*",
  ],
};
