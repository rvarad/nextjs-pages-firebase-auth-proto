import { firebaseAdminAuth } from "@/lib/firebase/firebase-admin/adminAppConfig"
import { createOrg } from "@/lib/firebase/firestore"

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { email, orgId, password } = req.body
		try {
			const userRecord = await firebaseAdminAuth.createUser({
				email: email,
				password: password,
			})

			// create org/add user to org
			const employeeId = await createOrg(orgId, userRecord)

			await firebaseAdminAuth.setCustomUserClaims(userRecord.uid, {
				role: "sudo",
				orgId: orgId,
				employeeId: employeeId,
			})

			return res.status(200).json({ userRecord })

			// console.log(userRecord.customClaims)

			// return res.status(200).json({})
		} catch (error) {
			return res.status(500).json({ error: error })
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}
