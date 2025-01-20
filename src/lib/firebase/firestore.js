import { nanoid } from "nanoid"
import { fireStoreDB } from "./firebase-admin/adminAppConfig"

async function checkIfOrgExists(orgId) {
	const docSnap = await fireStoreDB.collection(orgId).limit(1).get()

	// console.log("doc snap", docSnap.empty)

	return !docSnap.empty
}

async function createOrg(orgId, sudoUser) {
	const docRef = fireStoreDB.collection(orgId).doc("users")

	const employeeId = nanoid()

	await docRef.set({
		[sudoUser.uid]: {
			email: sudoUser.email,
			role: "sudo",
			employeeId: employeeId,
			// createdAt
			// updatedAt
		},
	})

	return employeeId
}

async function addUserToOrg(orgId, user) {
	const docRef = fireStoreDB.collection(orgId).doc("users")

	const employeeId = nanoid()

	await docRef.set(
		{
			[user.uid]: {
				email: user.email,
				employeeId: employeeId,
				role: "user",
			},
		},
		{ merge: true }
	)

	return employeeId
}

async function getOrgUsers(orgId) {
	const docSnap = await fireStoreDB.collection(orgId).doc("users").get()

	// console.log("doc snap", docSnap.data())

	return docSnap.data()
}

// async function addUserToOrg(orgId, user) {
//   const org = await checkIfOrgExists(orgId)

//   if (org) {
//     await orgCollectionRef.doc(orgId).update({
//       'users':
//     })
//   }
// }

export { checkIfOrgExists, createOrg, addUserToOrg, getOrgUsers }
