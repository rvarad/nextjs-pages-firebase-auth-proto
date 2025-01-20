import { firebaseAdminAuth } from "@/lib/firebase/firebase-admin/adminAppConfig"
import { addUserToOrg } from "@/lib/firebase/firestore"

async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}
	try {
		const { email, password, role } = req.body
		// const { orgId } = req.headers
		const cookieStore = req.cookies
		const session = cookieStore.session

		if (!session) {
			return res.status(401).json({ message: "No session" })
		}

		const verifiedSession = await firebaseAdminAuth.verifySessionCookie(session)

		if (!verifiedSession) {
			return res.status(401).json({ message: "Invalid session" })
		}

		// create a user
		const userRecord = await firebaseAdminAuth.createUser({
			email: email,
			password: password,
		})

		// add user to org
		const employeeId = await addUserToOrg(
			verifiedSession.orgId,
			userRecord,
			role
		)

		await firebaseAdminAuth.setCustomUserClaims(userRecord.uid, {
			role: role,
			orgId: verifiedSession.orgId,
			employeeId: employeeId,
		})

		// console.log(session)

		// return res.status(200).json({})
		return res.status(200).json({ userRecord })
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
