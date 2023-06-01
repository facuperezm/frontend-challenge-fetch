import { SortBy, User } from '../types.d'

interface Props {
	users: User[]
	showColors: boolean
	handleDelete: (email: string) => void
	changeSorting: (sortBy: SortBy) => void
}

export function UserList({
	changeSorting,
	users,
	showColors,
	handleDelete
}: Props) {
	return (
		<table width='100%'>
			<thead>
				<tr>
					<th>Picture</th>
					<th onClick={() => changeSorting(SortBy.FIRST)}>Name</th>
					<th onClick={() => changeSorting(SortBy.LAST)}>Last Name</th>
					<th onClick={() => changeSorting(SortBy.COUNTRY)}>Country</th>
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
								<button onClick={() => handleDelete(user.email)}>Delete</button>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
