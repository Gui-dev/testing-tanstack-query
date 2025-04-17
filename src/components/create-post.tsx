import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type FormEvent, useState } from 'react'
import { createPost } from '../utils/create-post'

export const CreatePost = () => {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
  })

  const handleCreatePost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutate({
      title,
      body: 'New Post',
    })
  }

  return (
    <>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <br />
        <br />
        <button type="submit">{!isPending ? 'Create' : 'Wait...'}</button>
      </form>
    </>
  )
}
