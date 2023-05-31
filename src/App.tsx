import React from 'react'
import './App.css'
import { User } from './types'
import { UserList } from './components/UserList'

const URL = `https://randomuser.me/api/?results=100`

function App() {
	const [users, setUsers] = React.useState<User[]>([])
	const [showColors, setShowColors] = React.useState(false)
	const [sortByCountry, setSortByCountry] = React.useState(false)

	React.useEffect(() => {
		fetch(URL)
			.then(res => res.json())
			.then(data => {
				setUsers(data.results)
				setSortByCountry(data.results)
			})
			.catch(err => console.error(err))
	}, [])

	const toggleSortByCountry = () => {
		setSortByCountry(!sortByCountry)
	}

	const sortedUsers = sortByCountry
		? [...users].sort((a, b) =>
				a.location.country.localeCompare(b.location.country)
		  )
		: users

	const handleDelete = (email: string) => {
		const newUsers = users.filter(user => user.email !== email)
		setUsers(newUsers)
	}

	return (
		<>
			<h1>Frontend Challenge</h1>
			<header>
				<button onClick={() => setShowColors(!showColors)}>
					Cambiar color
				</button>
				<button onClick={toggleSortByCountry}>Ordenar por pais</button>
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
