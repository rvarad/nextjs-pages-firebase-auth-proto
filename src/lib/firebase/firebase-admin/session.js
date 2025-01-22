const { firebaseAdminAuth } = require("./adminAppConfig")

async function getSession(sessionCookie) {
	try {
		const verifiedSession = await firebaseAdminAuth.verifySessionCookie(
			sessionCookie
		)

		// if (verifiedSession) {
		// console.log("Verified session", verifiedSession)
		return verifiedSession
		// }
	} catch (error) {
		// console.log("Error verifying session", error)
		// return error
		// if (error.code === "auth/session-cookie-expired")
		throw new Error(error.code)
	}
}

export { getSession }
