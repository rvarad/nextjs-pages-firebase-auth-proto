// import { handleSignIn } from "@/lib/firebase/auth"
import { firebaseClientAuth } from "@/lib/firebase/clientAppConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import React from "react"
import { Controller, useForm } from "react-hook-form"

function SignIn() {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	})
	const router = useRouter()

	async function submitValues(values) {
		try {
			const userCredentials = await signInWithEmailAndPassword(
				firebaseClientAuth,
				values.email,
				values.password
			)

			const idToken = await userCredentials.user.getIdToken()

			const response = await fetch("/api/v1/auth/signin", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			})

			const user = await response.json()

			if (response.status === 200) {
				console.log("signed in: ", user)
				router.push("/profile")
				// return true
			} else {
				console.log("sign in unsuccessful")
				// return false
			}
		} catch (error) {
			console.log("Error signing in: ", error)
		}
	}

	return (
		<div>
			<h1>Sign In</h1>
			<form action={handleSubmit(submitValues)}>
				<div>
					<label htmlFor="emailInput">Email: </label>
					<Controller
						control={control}
						name="email"
						render={({ field }) => (
							<input
								id="emailInput"
								type="email"
								{...field}
							/>
						)}
					/>
				</div>
				<div>
					<label htmlFor="passwordInput">Password: </label>
					<Controller
						control={control}
						name="password"
						render={({ field }) => (
							<input
								id="passwordInput"
								type="password"
								{...field}
							/>
						)}
					/>
				</div>
				<button>Sign In</button>
			</form>
		</div>
	)
}

export default SignIn
