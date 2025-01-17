import { firebaseAdminAuth } from "./adminAppConfig"
import { getSession } from "./session"

async function getCurrentUser(sessionCookie) {
	try {
		const verifiedSession = await getSession(sessionCookie)

		if (verifiedSession) {
			const user = await firebaseAdminAuth.getUser(verifiedSession.sub)

			return user
		}
	} catch (error) {
		console.log("error in getting current user", error)
	}
}

export { getCurrentUser }
