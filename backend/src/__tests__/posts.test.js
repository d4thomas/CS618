// Import libraries
import mongoose from 'mongoose'
import { describe, expect, test } from '@jest/globals'

// Import functions
import { createPost } from '../services/post.js'
import { Post } from '../db/models/post.js'

// Define test will all parameters
describe('creating posts', () => {
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

  // Define test without title
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

  // Define test with minimal parameters
  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})
