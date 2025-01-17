import { getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
}

const firebaseClientApp =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

const firebaseClientAuth = getAuth(firebaseClientApp)

export { firebaseConfig, firebaseClientApp, firebaseClientAuth }
