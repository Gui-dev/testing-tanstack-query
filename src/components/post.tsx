import { useQuery } from '@tanstack/react-query'
import { fetchPostById } from '../utils/fetch-post-by-id'

interface IPostProps {
  id: number
}

export const Post = ({ id }: IPostProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['post_id', id],
    queryFn: () => fetchPostById(id),
  })

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (error) {
    return <p>Error ocurred: {error.message}</p>
  }

  if (!data) {
    return
  }

  return (
    <>
      <h1>{data.title}</h1>
    </>
  )
}
