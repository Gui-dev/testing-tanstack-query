import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type FormEvent, useState } from 'react'
import { createPost, type ICreatePost } from '../utils/create-post'
import type { IPosts } from '../utils/fetch-posts'

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
    onMutate: async (newPost: ICreatePost) => {
      await queryClient.cancelQueries({
        queryKey: ['posts'],
      })
      const previousPosts = queryClient.getQueryData(['posts'])
      queryClient.setQueryData(['posts'], (old: IPosts[]) => [
        ...old,
        { id: Date.now(), ...newPost },
      ])

      return { previousPosts }
    },
    onError: (err, newPost: ICreatePost, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts)
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
