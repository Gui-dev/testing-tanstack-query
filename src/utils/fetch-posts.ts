interface IPosts {
  userId: number
  id: number
  title: string
  body: string
}

export const fetchPosts = async (): Promise<IPosts[]> => {
  const response = await fetch('http://jsonplaceholder.typicode.com/posts')

  if (!response.ok) {
    throw new Error('Error fetching data')
  }

  return response.json()
}
