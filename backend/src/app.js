// Import libraries
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import { eventRoutes } from './routes/events.js'

// Create Express app
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Create routes
postsRoutes(app)
userRoutes(app)
eventRoutes(app)

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// Export Express app
export { app }
