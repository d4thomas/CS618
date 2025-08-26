// Import libraries
import express from 'express'

// Create Express app
const app = express()

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// Export Express app
export { app }
