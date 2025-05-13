import express from "express"
import userRouter from "./users"

export const app = express()

app.use(express.json()) // pour parser le JSON dans req.body
app.use("/users", userRouter) // branche le router users

// Démarrage en dev
if (require.main === module) {
	const PORT = 3001
	app.listen(PORT, () => {
		console.log(`🚀Server listening on http://localhost:${PORT}`)
	})
}
