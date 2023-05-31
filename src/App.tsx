import React from 'react'
import './App.css'
import { User } from './types'
import { UserList } from './components/UserList'

const URL = `https://randomuser.me/api/?results=100`

function App() {
	const [users, setUsers] = React.useState<User[]>([])
	const [showColors, setShowColors] = React.useState(false)
	const [sortByCountry, setSortByCountry] = React.useState(false)
	const [filter, setFilter] = React.useState<string | null>(null)
	const originalUser = React.useRef<User[]>([])

	React.useEffect(() => {
		fetch(URL)
			.then(res => res.json())
			.then(data => {
				setUsers(data.results)
				setSortByCountry(data.results)
				originalUser.current = data.results
			})
			.catch(err => console.error(err))
	}, [])

	const toggleSortByCountry = () => {
		setSortByCountry(!sortByCountry)
	}

	const filteredCountry = React.useMemo(() => {
		console.log('filtering')
		return filter !== null && filter.length > 0
			? users.filter(user =>
					user.location.country.toLowerCase().includes(filter.toLowerCase())
			  )
			: users
	}, [filter, users])

	const sortedUsers = React.useMemo(() => {
		console.log('sorting')
		return sortByCountry
			? [...filteredCountry].sort((a, b) =>
					a.location.country.localeCompare(b.location.country)
			  )
			: filteredCountry
	}, [sortByCountry, filteredCountry])

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
				<UserList
					users={sortedUsers}
					showColors={showColors}
					handleDelete={handleDelete}
				/>
			</main>
		</>
	)
}

export default App
