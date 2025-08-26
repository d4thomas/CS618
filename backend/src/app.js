// Import libraries
import express from 'express'
import bodyParser from 'body-parser'

// Import functions
import { postsRoutes } from './routes/posts.js'

// Create Express app
const app = express()
app.use(bodyParser.json())

// Create routes
postsRoutes(app)

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// Export Express app
export { app }
