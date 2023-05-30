import React from 'react'
import './App.css'
import { User } from './types'
import { UserList } from './components/UserList'

const URL = `https://randomuser.me/api/?results=100`

function App() {
	const [users, setUsers] = React.useState<User[]>([])

	React.useEffect(() => {
		fetch(URL)
			.then(res => res.json())
			.then(data => setUsers(data.results))
			.catch(err => console.error(err))
	}, [])

	return (
		<>
			<h1>Frontend Challenge</h1>
			<UserList users={users} />
		</>
	)
}

export default App
