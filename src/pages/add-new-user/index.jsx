// import { getSession } from "@/lib/firebase/firebase-admin/session"

import { getSession } from "@/lib/firebase/firebase-admin/session"

function AddNewUser({ session }) {
	if (!session) {
		return (
			<div>
				<h1>Unauthorized</h1>
				<p>Admin Access Needed</p>
			</div>
		)
	}

	return (
		<div>
			<h1>Add new User</h1>
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

			if (session.admin) {
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
