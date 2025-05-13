import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserForm } from "../src/components/UserForm"

describe("UserForm Component", () => {
	it("appel onCreated avec le bon nom au submit", async () => {
		const onCreated = jest.fn()
		render(<UserForm onCreated={onCreated} />)
		// 1. Saisir un nom
		const input = screen.getByLabelText("Nom :")
		await userEvent.type(input, "Charlie")
		// 2. Soumettre le formulaire
		const button = screen.getByRole("button", { name: "Créer" })
		await userEvent.click(button)
		// 3. Vérifier appel de callback
		expect(onCreated).toHaveBeenCalledTimes(1)
		expect(onCreated).toHaveBeenCalledWith("Charlie")
	})
	it("ne doit pas appeler onCreated si input vide", async () => {
		const onCreated = jest.fn()
		render(<UserForm onCreated={onCreated} />)
		// Soumettre sans rien saisir
		const button = screen.getByRole("button", { name: "Créer" })
		await userEvent.click(button)
		expect(onCreated).not.toHaveBeenCalled()
	})
})
