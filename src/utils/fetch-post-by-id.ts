interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

export const fetchPostById = async (id: number): Promise<IPost> => {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/posts/${id}`
  )

  if (!response.ok) {
    throw new Error('Error fetching data')
  }

  return response.json()
}
