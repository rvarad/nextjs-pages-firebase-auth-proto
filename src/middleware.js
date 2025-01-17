import { NextResponse } from "next/server"

export async function middleware(request) {
	const pathname = request.nextUrl.pathname

	const session = request.cookies.get("session")

	if (pathname.startsWith("/api/v1/auth")) return NextResponse.next()
	if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
		if (session && !request.nextUrl.searchParams.get("error"))
			return NextResponse.redirect(new URL("/profile", request.url))
		return NextResponse.next()
	}

	if (
		!session &&
		(pathname.startsWith("/profile") ||
			pathname.startsWith("/organisation-details") ||
			pathname.startsWith("/add-new-user"))
	) {
		return NextResponse.redirect(new URL("/signin", request.url))
	}

	// console.log("req", request.nextUrl.searchParams.get("error"))

	console.log("pathname", pathname)
	// console.log("session", session)

	return NextResponse.next()
}

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
}
