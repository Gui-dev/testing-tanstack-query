import { useQuery } from '@tanstack/react-query'

import { fetchPosts } from './../utils/fetch-posts'

export const Posts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 10000,
  })

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (error) {
    return <p>Error occured: {error.message}</p>
  }

  if (!data) {
    return
  }

  return (
    <>
      <h1>POSTS</h1>
      {data.map(post => {
        return <p key={post.id}>{post.title}</p>
      })}
    </>
  )
}
