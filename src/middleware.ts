import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const pathname = request.nextUrl.pathname;
  const guestOnlyRoutes = ["/" ,"/login", "/register"];
  const hybridRoutes = ["/pricing","/reset", "/auth/callback", "/api/checkout", "/api/webhook", "/api/cancel-subscription"]; 
  const isGuestOnly = guestOnlyRoutes.includes(pathname);
  const isHybrid = hybridRoutes.includes(pathname);
  
  // if (!session && request.cookies.has("sb:token")) {
  //   console.log("Clearing cookies...");
  //   const response = NextResponse.redirect(new URL("/login", request.url));

  //   response.cookies.set("sb:token", "", { expires: new Date(0) });
  //   response.cookies.set("sb:refresh_token", "", { expires: new Date(0) });

  //   return response;
  // }

  if (!session) {
    if (isGuestOnly || isHybrid) {
      return response;
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isGuestOnly) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.webp|.*\\.jpeg).*)",
  ],
}

