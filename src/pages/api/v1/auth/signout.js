import { firebaseAdminAuth } from "@/lib/firebase/firebase-admin/adminAppConfig"
import { serialize } from "cookie"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}
	try {
		const cookieStore = req.cookies
		// console.log(cookieStore)

		const sessionCookie = cookieStore.session

		// console.log(sessionCookie)

		if (sessionCookie) {
			const verifiedSession = await firebaseAdminAuth.verifySessionCookie(
				sessionCookie
			)

			// console.log(verifiedSession)

			if (verifiedSession) {
				await firebaseAdminAuth.revokeRefreshTokens(verifiedSession.sub)

				// cookieStore.delete("session")
				res.setHeader(
					"Set-Cookie",
					serialize("session", "", { maxAge: -1, path: "/" })
				)

				// console.log(sessionCookie)

				return res.status(200).json({ message: "Signed out successfully" })
			} else {
				return res.status(401).json({ message: "Unauthorized" })
			}
		}
	} catch (error) {
		res.status(500).json({ error: error })
	}
}
