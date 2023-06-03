import React from 'react'
import './App.css'
import { type User } from './types.d'
import { SortBy } from './types.d'
import { UserList } from './components/UserList'
import { useQuery } from 'react-query'

const fetchUsers = async (page: number) => {
	return await fetch(
		`https://randomuser.me/api?results=10&seed=abc&page=${page}`
	)
		.then(async res => {
			if (!res.ok)
				throw new Error(`Error fetching users: ${res.status} ${res.statusText}`)
			return await res.json()
		})
		.then(data => data.results)
		.catch(err => console.error(err))
}

function App() {
	// const [users, setUsers] = React.useState<User[]>([])
	const [showColors, setShowColors] = React.useState(false)
	const [sortByCountry, setSortByCountry] = React.useState(false)
	const [filter, setFilter] = React.useState<string | null>(null)
	const [sorting, setSorting] = React.useState<SortBy>(SortBy.NONE)
	const [currentPage, setCurrentPage] = React.useState(1)
	const originalUser = React.useRef<User[]>([])

	const {
		isLoading,
		isError,
		data: users = []
	} = useQuery<User[]>('users', async () => fetchUsers(currentPage))

	const toggleSortByCountry = () => {
		setSortByCountry(!sortByCountry)
	}

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
		const newUsers = users.filter(user => user.email !== email)
		setUsers(newUsers)
	}

	const handleRestore = () => {
		setUsers(originalUser.current)
	}

	return (
		<>
			<h1>Frontend Challenge</h1>
			<header>
				<button onClick={() => setShowColors(!showColors)}>
					Cambiar color
				</button>
				<button onClick={toggleSortByCountry}>Ordenar por pais</button>
				<button onClick={handleRestore}>Restaurar estado original</button>
				<input
					type='text'
					// value={filter}
					onChange={e => setFilter(e.target.value)}
				/>
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
					<button onClick={() => setCurrentPage(currentPage + 1)}>
						Cargar más resultados
					</button>
				)}
			</main>
		</>
	)
}

export default App
