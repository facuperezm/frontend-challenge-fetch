import { User } from '../types'

export function UserList({ users }: { users: User[] }) {
  return (
    <table>
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
        {users.map(user => {
          return (
            <tr key={user.email}>
              <td>
                <img src={user.picture.thumbnail} alt='user' />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td><button>Delete</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}