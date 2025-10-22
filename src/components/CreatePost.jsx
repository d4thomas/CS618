// import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import { Link } from 'react-router-dom'
import slug from 'slug'
import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_BY_AUTHOR,
} from '../api/graphql/posts.js'
// import { createPost } from '../api/posts.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function CreatePost() {
  // Define state hooks
  const [token] = useAuth()
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const [createPost, { loading, data }] = useGraphQLMutation(CREATE_POST, {
    variables: { title, contents },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_POSTS, GET_POSTS_BY_AUTHOR],
  })

  //   // Invalidate all queries starting with the 'posts' query key
  //   const queryClient = useQueryClient()

  //   // Define mutation hook
  //   const createPostMutation = useMutation({
  //     mutationFn: () => createPost(token, { title, contents }),
  //     onSuccess: () => queryClient.invalidateQueries(['posts']),
  //   })

  // Prevent refresh and mutate
  const handleSubmit = (e) => {
    e.preventDefault()
    createPost()
    // createPostMutation.mutate()
  }

  if (!token) return <div>Please log in to create new posts.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      <input
        type='submit'
        value={
          loading /* createPostMutation.isPending */ ? 'Creating...' : 'Create'
        }
        disabled={!title || loading /* createPostMutation.isPending */}
      />
      {data?.createPost /* createPostMutation.isSuccess */ ? (
        <>
          <br />
          Post{' '}
          <Link
            to={`/posts/${data.createPost.id}/${slug(data.createPost.title)}`}
          >
            {data.createPost.title}
          </Link>{' '}
          created successfully!
        </>
      ) : null}
    </form>
  )
}
