import { fireStoreDB } from "./firebase-admin/adminAppConfig"

const orgCollectionRef = fireStoreDB.collection("Organisations")

async function checkIfOrgExists(orgId) {
	const docSnap = (await orgCollectionRef.doc(orgId).get()).data()

	return !!docSnap
}

// async function addUserToOrg(orgId, user) {
//   const org = await checkIfOrgExists(orgId)

//   if (org) {

//   }
// }

export { checkIfOrgExists }
