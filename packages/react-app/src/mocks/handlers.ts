import { http, HttpResponse } from "msw"
import { User } from "../hooks/useUsers"
let users: User[] = [
	{ id: 1, name: "Alice" },
	{ id: 2, name: "Bob" },
]
export const handlers = [
	// GET /users
	http.get("/users", () => {
		return HttpResponse.json(users, { status: 200 })
	}),
	// POST /users
	http.post("/users", async ({ request }) => {
		const { name } = (await request.json()) as { name: string }

		if (!name)
			return HttpResponse.json({ message: "Name is required" }, { status: 400 })

		const newUser = { id: users.length + 1, name }
		users.push(newUser)

		return HttpResponse.json(newUser, { status: 201 })
	}),
]
