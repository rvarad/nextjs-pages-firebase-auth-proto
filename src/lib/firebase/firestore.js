import { fireStoreDB } from "./firebase-admin/adminAppConfig"

async function checkIfOrgExists(orgId) {
	const orgCollectionRef = fireStoreDB.collection("Organisations")

	console.log(orgCollectionRef)
}

export { checkIfOrgExists }
