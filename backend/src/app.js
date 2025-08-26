// Import libraries
import express from 'express'

// Import routes
import { postsRoutes } from './routes/posts.js'

// Create Express app
const app = express()
postsRoutes(app)

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// Export Express app
export { app }
