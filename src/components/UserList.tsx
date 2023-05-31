import { User } from '../types'

interface Props {
	users: User[]
	showColors: boolean
	handleDelete: (email: string) => void
}

export function UserList({ users, showColors, handleDelete }: Props) {
	return (
		<table width='100%'>
			<thead>
				<tr>
					<th>Picture</th>
					<th>Name</th>
					<th>Last Name</th>
					<th>Country</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user, index) => {
					const color = index % 2 === 0 ? '#333' : '#555'
					const bgcolor = showColors ? color : 'transparent'
					return (
						<tr key={user.email} style={{ backgroundColor: `${bgcolor}` }}>
							<td>
								<img src={user.picture.thumbnail} alt='user' />
							</td>
							<td>{user.name.first}</td>
							<td>{user.name.last}</td>
							<td>{user.location.country}</td>
							<td>
								<button onClick={handleDelete}>Delete</button>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
