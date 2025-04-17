interface ICreatePost {
  title: string
  body: string
}

export const createPost = async ({ title, body }: ICreatePost) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  })

  return response.json()
}
