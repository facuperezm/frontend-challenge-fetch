export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
	return await fetch(
		`https://randomuser.me/api?results=10&seed=abc&page=${pageParam}`
	)
		.then(async res => {
			if (!res.ok)
				throw new Error(`Error fetching users: ${res.status} ${res.statusText}`)
			return await res.json()
		})
		.then(res => {
			const nextCursor = Number(res.info.page + 1)

			return {
				users: res.results,
				nextCursor
			}
		})
}
