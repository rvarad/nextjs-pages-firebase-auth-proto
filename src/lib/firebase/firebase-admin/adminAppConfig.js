// import "server-only"
// import { cert, getApps, initializeApp } from "firebase-admin/app"
// import { getAuth } from "firebase/auth"
import admin from "firebase-admin"

// export const firebaseAdminApp =
// 	getApps().length === 0
// 		? initializeApp(
// 				{
// 					credential: cert(
// 						JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT)
// 					),
// 				}
// 				// "firebase-admin-trial"
// 		  )
// 		: getApps()[0]

// console.log(firebaseAdminApp.name)

// export const firebaseAdminAuth = admin.auth(firebaseAdminApp)

if (!admin.apps.length) {
	const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT)

	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	})

	// console.log(firebaseAdminApp.name)
}

// console.log(admin.apps)

export const firebaseAdminAuth = admin.auth()
export const fireStoreDB = admin.firestore()
