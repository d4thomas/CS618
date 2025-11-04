// Import libraries
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { handleSocket } from './socket.js'
import { userRoutes } from './routes/users.js'

// Create Express app
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Create routes
userRoutes(app)

// Create Socket.io
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
handleSocket(io)

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// Export Express app
export { server as app }
