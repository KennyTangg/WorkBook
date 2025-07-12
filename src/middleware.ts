import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            response.cookies.set(name, value)
          );
        },
      },
    }
  );
  
  const { data: { session } } = await supabase.auth.getSession();
  const pathname = request.nextUrl.pathname;
  const publicRoutes = ["/", "/login", "/register", "/auth/callback"];
  const isPublic = publicRoutes.includes(pathname);

  if (!session && request.cookies.has("sb:token")) {
    console.log("Clearing cookies...");
    const response = NextResponse.redirect(new URL("/login", request.url));

    response.cookies.set("sb:token", "", { expires: new Date(0) });
    response.cookies.set("sb:refresh_token", "", { expires: new Date(0) });

    return response;
  }

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isPublic && pathname !== "/auth/callback") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.webp|.*\\.jpeg).*)",
  ],
}

