import { Post } from '../db/models/post.js'

// Create and return a new post
export async function createPost(userId, { title, contents, tags }) {
  const post = new Post({ title, author: userId, contents, tags })
  return await post.save()
}

// List posts
async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

// List all posts
export async function listAllPosts(options) {
  return await listPosts({}, options)
}

// List all posts by author
export async function listPostsByAuthor(author, options) {
  return await listPosts({ author }, options)
}

// List all posts by tag
export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

// Get post by ID
export async function getPostById(postId) {
  return await Post.findById(postId)
}

// Update post
export async function updatePost(userId, postId, { title, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, contents, tags } },
    { new: true },
  )
}

// Delete post
export async function deletePost(userId, postId) {
  return await Post.deleteOne({ _id: postId, author: userId })
}
