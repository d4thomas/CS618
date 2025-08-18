// Import required libraries
import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

// Create MongoDB client
const url = 'mongodb://localhost:27017/'
const dbName = 'cs618'
const client = new MongoClient(url)

// Connect to MongoDB
try {
  await client.connect()
  console.log('Successfully connected to database!')
} catch (err) {
  console.error('Error connecting to database:', err)
}

// Create HTTP server
const server = createServer(async (req, res) => {
  // Select database from client
  const db = client.db(dbName)
  const users = db.collection('users')

  // Save collection to array
  const usersList = await users.find().toArray()

  // Set status code/header and return collection array
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(usersList))
})

// Start HTTP server
const host = 'localhost'
const port = 3000
server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})
