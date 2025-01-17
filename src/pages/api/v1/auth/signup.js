import { firebaseAdminAuth } from "@/lib/firebase/firebase-admin/adminAppConfig"

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { email, orgId, password } = req.body
		try {
			const userRecord = await firebaseAdminAuth.createUser({
				email: email,
				password: password,
			})

			await firebaseAdminAuth.setCustomUserClaims(userRecord.uid, {
				role: "admin",
				orgId: orgId,
			})

			return res
				.status(200)
				.json({ userRecord, customClaims: { role: "admin", orgId } })
		} catch (error) {
			return res.status(500).json({ error: error })
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}
