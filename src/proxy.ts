import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "./lib/auth";


const publicRoutes = ["/"]
const protectedRoutes = ["/account", "/notes/create", "/notes/edit/*"];
const authRoutes = ["/signin"];
const adminRoutes = ["/admin", "/admin/*"];

export async function proxy(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });
    const refer = req.nextUrl.searchParams.get("refer");
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isAuthRoute = authRoutes.includes(path);
    const isAdminRoute = adminRoutes.includes(path);

    console.log("Session:", session?.user.role)

    if (!publicRoutes.includes(path)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const response = NextResponse.next();

    if (path.startsWith("/signin") && refer) {
        response.cookies.set("refer", refer, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: "/",
        });
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (isAuthRoute && session?.user?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    if ((isProtectedRoute || isAdminRoute) && !session?.user) {
        const loginUrl = new URL("/signin", req.url);
        loginUrl.searchParams.set("callbackUrl", path);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthRoute && session?.user) {
        return NextResponse.redirect(new URL("/notes", req.url));
    }

    return response;
}


export const config = {
    matcher: ['/', "/admin", "/signin"],
}