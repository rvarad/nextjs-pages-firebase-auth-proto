import { firebaseAdminAuth } from "@/lib/firebase/firebase-admin/adminAppConfig"
import { checkIfOrgExists } from "@/lib/firebase/firestore"

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { email, orgId, password } = req.body
		try {
			const userRecord = await firebaseAdminAuth.createUser({
				email: email,
				password: password,
			})

			const orgExists = await checkIfOrgExists(orgId)

			await firebaseAdminAuth.setCustomUserClaims(userRecord.uid, {
				role: "admin",
				orgId: orgId,
			})

			if (orgExists) {
				// add user to org
			} else {
				// create org
				// add user to org
			}

			return res
				.status(200)
				.json({ userRecord, customClaims: { role: "admin", orgId } })

			// console.log(org)

			// return res.status(200).json({})
		} catch (error) {
			return res.status(500).json({ error: error })
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}
