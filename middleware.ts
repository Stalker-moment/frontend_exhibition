import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAuth = request.cookies.get("userAuth")?.value;

  console.log("User Auth Token:", userAuth); // Log token for debugging

  // Redirect jika sudah login dan mencoba mengakses /login atau /register
  if (
    (pathname === "/login" || pathname === "/register") &&
    userAuth &&
    userAuth !== "guest"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect jika belum login dan mencoba mengakses rute selain /login dan /register
  if (
    !userAuth &&
    (pathname !== "/login" && pathname !== "/register")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect jika guest mencoba mengakses rute yang membutuhkan otentikasi
  if (
    (pathname === "/accounts" ||
      pathname === "/control" ||
      pathname === "/configurations") &&
    userAuth === "guest"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Validasi token jika bukan guest dan mengakses rute yang memerlukan otentikasi
  if (
    userAuth !== "guest" &&
    (pathname === "/accounts" ||
      pathname === "/control" ||
      pathname === "/configurations")
  ) {
    try {
      const response = await fetch(
        "https://machapi.akti.cloud/api/users/token/validator",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userAuth}`, // Use Bearer token if required
          },
        }
      );

      console.log("API Response Status:", response.status); // Log API response status
      const data = await response.json();
      console.log("API Response Data:", data); // Log API response data

      if (!response.ok || data.error) {
        console.error("Invalid token or API response error:", data.error);
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Token valid, lanjutkan
      return NextResponse.next();
    } catch (error) {
      console.error("Error validating token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow access if all conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/accounts",
    "/login",
    "/register",
    "/downtime",
    "/control",
    "/sensor",
    "/configurations",
  ],
};