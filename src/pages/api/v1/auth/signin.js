import { firebaseAdminAuth } from "@/lib/firebase/firebase-admin/adminAppConfig"
import { serialize } from "cookie"
// import { firebaseAdminAuth } from "@/lib/firebase/firebase-admin/adminAppConfig"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}
	try {
		const authHeader = req.headers["authorization"]

		// console.log(authHeader)

		if (authHeader?.startsWith("Bearer ")) {
			const idToken = authHeader.slice(7)
			const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken)

			if (decodedToken) {
				const expiry = 5 * 24 * 60 * 60 * 1000

				const sessionCookie = await firebaseAdminAuth.createSessionCookie(
					idToken,
					{ expiresIn: expiry }
				)

				const options = {
					maxAge: expiry,
					httpOnly: true,
					secure: true,
					path: "/",
				}

				res.setHeader(
					"Set-Cookie",
					serialize("session", sessionCookie, options)
				)

				return res.status(200).json({ user: decodedToken })
			}
		}
	} catch (error) {
		console.log(error)

		res.status(401).json({ error: error })
	}
}
