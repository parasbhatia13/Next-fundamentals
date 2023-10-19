import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// export { default } from "next-auth/middleware"
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublic = path === "/login" || path === "/signup" || path === "/"  || path === "/example"
    const token = request.cookies.get("next-auth.session-token")?.value || ""

    if (isPublic && token) {
        return NextResponse.redirect(new URL("/profile", request.nextUrl))
    }
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))

    }


}

// See "Matching Paths" 
//matcher allows you to filter Middleware to run on specific paths.
export const config = {
    matcher: [
        "/",
        "/profile/:path*",
        "/login",
        "/signup",
        "/example"
    ],
}

// export const config = { matcher: ["/profile"] }