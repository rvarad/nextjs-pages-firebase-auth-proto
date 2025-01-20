// import { handleSignUp } from "@/lib/firebase/auth"
import { useRouter } from "next/router"
import React from "react"
import { Controller, useForm } from "react-hook-form"

function Signup() {
	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: "",
			orgId: "",
			password: "",
			repeatPassword: "",
		},
	})

	const router = useRouter()

	async function submitValues(values) {
		// this will signup the user as admin of an org
		// return values
		// const userCredentials = await handleSignUp(
		// 	values.email,
		// 	values.orgId,
		// 	values.password
		// )

		const response = await fetch("/api/v1/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: values.email,
				orgId: values.orgId,
				password: values.password,
			}),
		})

		const userCredentials = await response.json()

		// console.log(userCredentials)

		if (response.status === 200) {
			console.log("signed up: ", userCredentials)

			router.push("/signin")
		} else {
			console.log("sign up unsuccessful")
		}
	}

	return (
		<div>
			<h1>Sign Up</h1>
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
					<label htmlFor="orgIdInput">Organisation ID: </label>
					<Controller
						control={control}
						name="orgId"
						render={({ field }) => (
							<input
								id="orgIdInput"
								type="text"
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
				<div>
					<label htmlFor="repeatPasswordInput">Repeat Password: </label>
					<Controller
						control={control}
						name="repeatPassword"
						render={({ field }) => (
							<input
								id="repeatPasswordInput"
								type="password"
								{...field}
							/>
						)}
					/>
				</div>
				<button>Sign Up</button>
			</form>
		</div>
	)
}

export default Signup
