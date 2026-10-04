import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;

  // 1. Guard API routes: direct browser navigation (GET) is strictly forbidden
  if (pathname.startsWith("/api/")) {
    if (request.method === "GET") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. Block unauthenticated access to /api/upload
  if (pathname.startsWith("/api/upload") && !user) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3. Guard admin pages
  const isAccessingAdmin = pathname.startsWith("/admindeptrai");
  const isAccessingLogin = pathname === "/login";

  if (isAccessingAdmin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (isAccessingLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admindeptrai";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admindeptrai/:path*", "/login", "/api/:path*"],
};
