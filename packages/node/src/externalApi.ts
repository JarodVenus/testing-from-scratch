export interface ExternalData {
	extra: string
}
export async function fetchUserData(id: number): Promise<ExternalData> {
	// Imaginons un appel HTTP externe...
	// Dans la réalité, on ferait fetch axios.get(…)
	return { extra: `données pour user ${id}` }
}
