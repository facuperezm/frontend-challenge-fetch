import React from 'react'
import './App.css'
import { SortBy } from './types.d'
import { UserList } from './components/UserList'
import { useUsers } from './hooks/useUsers'

function App() {
	const { isLoading, isError, users, refetch, fetchNextPage } = useUsers()

	const [showColors, setShowColors] = React.useState(false)
	const [filter, setFilter] = React.useState<string | null>(null)
	const [sorting, setSorting] = React.useState<SortBy>(SortBy.NONE)

	const filteredCountry = React.useMemo(() => {
		return filter !== null && filter.length > 0
			? users.filter(user =>
					user.location.country.toLowerCase().includes(filter.toLowerCase())
			  )
			: users
	}, [filter, users])

	const sortedUsers = React.useMemo(() => {
		if (sorting === SortBy.NONE) return filteredCountry
		if (sorting === SortBy.COUNTRY)
			return [...filteredCountry].sort((a, b) =>
				a.location.country.localeCompare(b.location.country)
			)
		if (sorting === SortBy.FIRST)
			return [...filteredCountry].sort((a, b) =>
				a.name.first.localeCompare(b.name.first)
			)
		if (sorting === SortBy.LAST)
			return [...filteredCountry].sort((a, b) =>
				a.name.last.localeCompare(b.name.last)
			)
		return filteredCountry
	}, [sorting, filteredCountry])

	const handleDelete = (email: string) => {
		// const newUsers = users.filter(user => user.email !== email)
		// setUsers(newUsers)
	}

	const handleRestore = () => {
		refetch()
	}

	return (
		<>
			<h1>Frontend Challenge</h1>
			<header>
				<button onClick={() => setShowColors(!showColors)}>
					Cambiar color
				</button>
				<button onClick={handleRestore}>Restaurar estado original</button>
				<input type='text' onChange={e => setFilter(e.target.value)} />
			</header>
			<main>
				{users.length > 0 && (
					<UserList
						changeSorting={setSorting}
						users={sortedUsers}
						showColors={showColors}
						handleDelete={handleDelete}
					/>
				)}

				{isLoading && <strong>Loading...</strong>}

				{isError && <strong>Error!</strong>}

				{!isLoading && !isError && users.length === 0 && (
					<strong>No users found</strong>
				)}

				{/* {!isLoading && !isError && users.length > 0 && (
					<strong>Showing {users.length} users</strong>
				)} */}

				{!isLoading && !isError && users.length > 0 && (
					<button onClick={() => void fetchNextPage()}>
						Cargar más resultados
					</button>
				)}
			</main>
		</>
	)
}

export default App
