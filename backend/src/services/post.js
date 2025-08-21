// Import functions
import { Post } from '../db/models/post.js'

// Create and return a new post
export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })
  return await post.save()
}
