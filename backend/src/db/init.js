// Import libraries
import mongoose from 'mongoose'

export function initDatabase() {
  // Define database URL
  //const DATABASE_URL = 'mongodb://localhost:27017/blog' // For example.js
  const DATABASE_URL = process.env.DATABASE_URL

  // Create listener
  mongoose.connection.on('open', () => {
    console.info('successfully connected to database:', DATABASE_URL)
  })

  // Connect to database
  const connection = mongoose.connect(DATABASE_URL)

  return connection
}
