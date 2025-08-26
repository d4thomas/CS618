// Import Express app/functions
import { app } from './app.js'
import { initDatabase } from './db/init.js'

// Import libraries
import dotenv from 'dotenv'

// Load dotenv configuration
dotenv.config()

// Start Express app
try {
  await initDatabase()
  const PORT = process.env.PORT
  app.listen(PORT)
  console.info(`Express server running on http://localhost:${PORT}`)
} catch (err) {
  console.error('Error connecting to database:', err)
}
