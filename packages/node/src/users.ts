import { Router, Request, Response } from "express"
import { getUsers, createUser, getUserById, updateUserName } from "./usersStore"
const router = Router()
/**
 * GET /users
 * → renvoie la liste JSON des utilisateurs.
 */
router.get("/", (_req, res) => {
	res.status(200).json(getUsers())
})
/**
 * POST /users
 * Body attendu: { name: string }
 * → crée un utilisateur ou renvoie 400 si name manquant.
 */
router.post("/", (req: Request, res: Response) => {
	const { name } = req.body
	if (!name) {
		res.status(400).json({ error: "name is required" })
        return
	}
	const user = createUser(name)
	res.status(201).json(user)
})

// GET /users/:id
router.get("/:id", (req, res) => {
	const id = Number(req.params.id)
	const user = getUserById(id)
	if (!user) {
        res.status(404).json({ error: "User not found" })
        return
    }
	res.json(user)
})
// PUT /users/:id
router.put("/:id", (req, res) => {
	const id = Number(req.params.id)
	const { name } = req.body
	if (!name) {
		res.status(400).json({ error: "name is required" })
		return
	}
	const updated = updateUserName(id, name)
	if (!updated) {
        res.status(404).json({ error: "User not found" })
        return
    }
    res.json(updated)
})

export default router
