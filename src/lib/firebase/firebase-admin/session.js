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
		throw new Error("Error verifying session")
	}
}

export { getSession }
