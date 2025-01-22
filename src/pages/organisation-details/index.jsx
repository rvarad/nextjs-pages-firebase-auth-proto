import { getSession } from "@/lib/firebase/firebase-admin/session"
import { getOrgUsers } from "@/lib/firebase/firestore"
import { serialize } from "cookie"
import React from "react"

function OrganisationDetails({ users, role }) {
	return (
		<div>
			<h1>Organisation Details</h1>
			<div>
				<h3>Users</h3>
				{users &&
					Object.keys(users).map((key, index) => {
						return (
							<>
								<div key={key}>
									<span>
										{index + 1} : {key}
									</span>
									<p>Email : {users[key].email}</p>
									<p>Role : {users[key].role}</p>
									<p>Employee Id : {users[key].employeeId}</p>
									{/* {(role === "sudo" || role === "admin") &&
										users[key].role === "user" && <button>Remove</button>} */}
								</div>
								<hr />
							</>
						)
					})}
			</div>
		</div>
	)
}

export default OrganisationDetails

export async function getServerSideProps({ req, res }) {
	if (!req.cookies.session) {
		return {
			redirect: {
				destination: "/signin?error=session",
				permanent: false,
			},
		}
	}
	try {
		const session = await getSession(req.cookies.session)
		const users = await getOrgUsers(session.orgId)

		return {
			props: {
				users: users,
				role: session.role,
			},
		}
	} catch (error) {
		if (error.message === "auth/session-cookie-expired") {
			res.setHeader(
				"Set-Cookie",
				serialize("session", "", { maxAge: -1, path: "/" })
			)
		}
		return {
			redirect: {
				destination: "/signin?error=session",
				permanent: false,
			},
		}
	}
}
