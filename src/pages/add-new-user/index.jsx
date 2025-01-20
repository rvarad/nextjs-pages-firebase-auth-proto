// import { getSession } from "@/lib/firebase/firebase-admin/session"

import { getSession } from "@/lib/firebase/firebase-admin/session"
import { Controller, useForm } from "react-hook-form"

function AddNewUser({ session }) {
	if (!session) {
		return (
			<div>
				<h1>Unauthorized</h1>
				<p>Admin Access Needed</p>
			</div>
		)
	}

	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			email: "",
			password: "",
			role: "",
		},
	})

	async function submitValues(values) {
		// console.log(values)
		const response = await fetch("/api/v1/add-new-user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: values.email,
				password: values.password,
				role: values.role,
			}),
		})

		const userCredentials = await response.json()

		if (response.status === 200) {
			console.log("New user created: ", userCredentials)
			reset()
		} else {
			console.log("Error creating new user: ", userCredentials)
		}
	}

	return (
		<div>
			<h1>Add new User</h1>

			<form action={handleSubmit(submitValues)}>
				<div>
					<label htmlFor="emailInput">Email</label>
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
					<label htmlFor="passwordInput">Password</label>
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
					<label htmlFor="roleInput">Role</label>
					<Controller
						control={control}
						name="role"
						render={({ field }) => (
							<select
								{...field}
								id="roleInput"
								// rules={{ required: "Please assign a role to the account user" }}
							>
								<option value="">Assign a role</option>
								<option value="admin">Admin</option>
								<option value="employee">Employee</option>
							</select>
						)}
					/>
				</div>
				<button>Submit</button>
			</form>
		</div>
	)
}

export default AddNewUser

async function getServerSideProps({ req }) {
	let session
	// console.log(req.cookies.session)

	if (req.cookies.session) {
		try {
			session = await getSession(req.cookies.session)

			if (session.role === "admin" || session.role === "sudo") {
				return {
					props: {
						session,
					},
				}
			} else {
				return {
					props: {},
				}
			}
		} catch (error) {
			return {
				redirect: {
					destination: "/signin?error=session",
					permanent: false,
				},
			}
		}
	}
	// return {
	// 	props: {},
	// }
}

export { getServerSideProps }
