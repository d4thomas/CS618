// Import functions
import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/posts.js'

// Get posts by author or tag
export function postsRoutes(app) {
  app.get('/api/v1/posts', async (req, res) => {
    // Assign variables from HTTP request
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }
    try {
      // Check if author and tag are provided
      if (author && tag) {
        return res
          .status(400)
          .json({ error: 'query by either author or tag, not both' })
      } else if (author) {
        // Send by author
        return res.json(await listPostsByAuthor(author, options))
      } else if (tag) {
        // Send by tag
        return res.json(await listPostsByTag(tag, options))
      } else {
        // Send all
        return res.json(await listAllPosts(options))
      }
    } catch (err) {
      console.error('Error listing posts', err)
      return res.status(500).end()
    }
  })

  // Get post by ID
  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
      const post = await getPostById(id)
      if (post === null) return res.status(404).end()
      return res.json(post)
    } catch (err) {
      console.error('error getting post', err)
      return res.status(500).end()
    }
  })

  // Create post
  app.post('/api/v1/posts', async (req, res) => {
    try {
      const post = await createPost(req.body)
      return res.json(post)
    } catch (err) {
      console.error('error creating post', err)
      return res.status(500).end()
    }
  })

  // Update post by ID
  app.patch('/api/v1/posts/:id', async (req, res) => {
    try {
      const post = await updatePost(req.params.id, req.body)
      return res.json(post)
    } catch (err) {
      console.error('error updating post', err)
      return res.status(500).end()
    }
  })

  // Delete post by ID
  app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
      const { deletedCount } = await deletePost(req.params.id)
      if (deletedCount === 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting post', err)
      return res.status(500).end()
    }
  })
}
