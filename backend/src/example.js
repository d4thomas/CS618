import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

// Initialize database
await initDatabase()

// Create blog post
const post = new Post({
  title: 'Hello Mongoose!',
  author: 'Daniel Thomas',
  contents: 'This post is stored in a MongoDB database using Mongoose.',
  tags: ['mongoose', 'mongodb'],
})
const createdPost = await post.save()

// Update blog post
await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'Hello again, Mongoose!' },
})

// Print all blog posts to the console
const posts = await Post.find()
console.log(posts)
