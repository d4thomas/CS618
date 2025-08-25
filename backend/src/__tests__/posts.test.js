// Import libraries
import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'

// Import functions
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from '../services/post.js'
import { Post } from '../db/models/post.js'

// Define tests for creating posts
describe('creating posts', () => {
  // Test with all parameters
  test('with all parameters should succeed', async () => {
    // Create a new post
    const post = {
      title: 'Hello Mongoose!',
      author: 'Daniel Thomas',
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }
    const createdPost = await createPost(post)

    // Verify return post ID
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    // Find post ID with Mongoose
    const foundPost = await Post.findById(createdPost._id)

    // Verify post ID
    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  // Test without title
  test('without title should fail', async () => {
    const post = {
      author: 'Daniel Thomas',
      contents: 'Post with no title',
      tags: ['empty'],
    }

    // Catch Mongoose validation error
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  // Test with minimal parameters
  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

// Define sample posts
const samplePosts = [
  { title: 'Learning Redux', author: 'Daniel Thomas', tags: ['redux'] },
  { title: 'Learn React Hooks', author: 'Daniel Thomas', tags: ['react'] },
  {
    title: 'Full-Stack React Projects',
    author: 'Daniel Thomas',
    tags: ['react', 'nodejs'],
  },
  { title: 'Guide to TypeScript' },
]

// Create sample posts in database
let createdSamplePosts = []
beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }
})

// Define tests for listing posts
describe('listing posts', () => {
  // Test listing all posts
  test('should return all posts', async () => {
    const posts = await listAllPosts()
    expect(posts.length).toEqual(createdSamplePosts.length)
  })

  // Test listing all posts in descending order (no sort argument)
  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts()
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })

  // Test listing all posts in ascending order (with sort argument)
  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    )
  })

  // Test listing all posts by author
  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor('Daniel Thomas')
    expect(posts.length).toBe(3)
  })

  // Test listing all posts by tag
  test('should be able to filter posts by tag', async () => {
    const posts = await listPostsByTag('nodejs')
    expect(posts.length).toBe(1)
  })
})

// Define test to get post by ID
describe('getting a post', () => {
  // Test with correct ID
  test('should return the full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })

  // Test with incorrect ID
  test('should fail if the id does not exist', async () => {
    const post = await getPostById('000000000000000000000000')
    expect(post).toEqual(null)
  })
})

// Define tests to update posts
describe('updating posts', () => {
  // Test updating author
  test('should update the specified property', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.author).toEqual('Test Author')
  })

  // Test data field integrity after update
  test('should not update other properties', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.title).toEqual('Learning Redux')
  })

  // Test update time
  test('should update the updatedAt timestamp', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    )
  })

  // Test updating invalid post ID
  test('should fail if the id does not exist', async () => {
    const post = await updatePost('000000000000000000000000', {
      author: 'Test Author',
    })
    expect(post).toEqual(null)
  })
})

// Define test to delete post
describe('deleting posts', () => {
  // Test deleting valid post
  test('should remove the post from the database', async () => {
    const result = await deletePost(createdSamplePosts[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(deletedPost).toEqual(null)
  })

  // Test deleting invalid post
  test('should fail if the id does not exist', async () => {
    const result = await deletePost('000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})
