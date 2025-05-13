import { useUsers } from "../hooks/useUsers"

export function UserList() {
	const { users, loading, error } = useUsers()
	if (loading) return <div role="status">Chargement...</div>
	if (error) return <div role="alert">Erreur : {error}</div>
	return (
		<ul>
			{users.map((u) => (
				<li key={u.id}>{u.name}</li>
			))}
		</ul>
	)
}
