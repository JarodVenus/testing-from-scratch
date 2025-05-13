import request from "supertest"
import { app } from "../src/server"
import { resetStore } from "../src/usersStore"
import http from "http"
import { AddressInfo } from "net"

describe("API Users - TDD complet", () => {
	let server: http.Server

	beforeAll((done) => {
		server = app.listen(3001, done)
	})

	afterAll((done) => {
		server.close(done) // Ferme le serveur après les tests
	})
	// Avant chaque test, on remet le store à zéro
	beforeEach(() => {
		resetStore()
	})
	/**
	 * Scénario 0:Démarrage du serveur
	 *
	 * Vérifie que le serveur est bien démarré.
	 */
	it("Le serveur répond sur le port 3001", async () => {
		const res = await request(app).get("/users")
		const port = (server.address() as AddressInfo).port

		expect(port).toBe(3001) // Vérifie que le port est bien 3001
		expect(res.status).toBe(200) // Vérifie que le serveur répond correctement
	})
	/**
	 * Scénario 1: Liste vide au démarrage
	 *
	 *  Red: on écrit le test avant le code (il échoue).
	 *  Green: on a déjà implémenté GET /users pour qu'il passe.
	 */
	it("GET /users => 200 & []", async () => {
		const res = await request(app).get("/users")
		expect(res.status).toBe(200) // on vérifie le code HTTP
		expect(res.body).toEqual([]) // la liste doit être vide
	})
	/**
	 * Scénario 2 Erreur si name manquant
	 *
	 * Test dʼerreur pour valider la partie validation.
	 */
	it("POST /users sans name => 400 &  error }", async () => {
		const res = await request(app).post("/users").send({}) // body vide
		expect(res.status).toBe(400) // code Bad Request
		expect(res.body).toEqual({
			// message dʼerreur exact
			error: "name is required",
		})
	})
	/**
	 * Scénario 3 Création dʼun utilisateur
	 *
	 *  Green: implémentation minimale dans users.ts.
	 *  Vérifie que lʼID est 1 (resetStore) et que name est renvoyé.
	 */
	it("POST /users avec name => 201 & nouvel user", async () => {
		const res = await request(app).post("/users").send({ name: "Alice" })
		expect(res.status).toBe(201)
		expect(res.body as Object).toMatchObject({
			id: 1,
			name: "Alice",
		})
	})
	/**
	 * Scénario 4 GET après création
	 *
	 * On crée Alice, puis on rappelle GET /users pour vérifier quʼelle
	 * apparaît bien dans la liste.
	 */
	it("GET /users après création → liste avec Alice", async () => {
		await request(app).post("/users").send({ name: "Alice" })
		const res = await request(app).get("/users")
		expect(res.status).toBe(200)
		expect(res.body).toEqual([{ id: 1, name: "Alice" }])
	})
})
