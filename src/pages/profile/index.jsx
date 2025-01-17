// import { handleSignOut } from "@/lib/firebase/auth"
import { firebaseClientAuth } from "@/lib/firebase/clientAppConfig"
import { getSession } from "@/lib/firebase/firebase-admin/session"
import { getCurrentUser } from "@/lib/firebase/firebase-admin/user"
import { signOut } from "firebase/auth"
import { useRouter } from "next/router"
import React from "react"

function Profile({ user, session }) {
	const router = useRouter()
	async function handleSignOut() {
		try {
			await signOut(firebaseClientAuth)

			const response = await fetch("/api/v1/auth/signout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})

			const data = await response.json()

			if (response.status === 200) {
				// return true
				console.log("signed out", data)
				router.push("/")
			} else {
				console.error("sign out unsuccessful", data)
				// return false
			}
		} catch (error) {
			console.log("Error signing out: ", error)
			return false
		}
	}

	if (user) {
		console.log("user in component", user)
	}

	if (session) {
		console.log("session in component", session)
	}

	return (
		<div>
			<h1>Profile</h1>
			<button onClick={handleSignOut}>Sign Out</button>
		</div>
	)
}

export default Profile

export async function getServerSideProps({ req }) {
	let user
	let session
	if (req.cookies.session) {
		try {
			session = await getSession(req.cookies.session)
			user = await getCurrentUser(req.cookies.session)
		} catch (error) {
			console.error("error in getting session", error)

			return {
				redirect: {
					destination: "/signin?error=session",
					permanent: false,
				},
			}
		}
	}

	// console.log("user", user)
	// console.log("session", session)
	// console.log("req.cookies.session", req.cookies.session)

	return {
		props: {
			user: user
				? {
						admin: user?.customClaims?.admin,
						email: user?.email,
				  }
				: null,
			session: session ? session : null,
		},
	}
}
