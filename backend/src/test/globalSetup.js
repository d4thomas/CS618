import { MongoMemoryServer } from 'mongodb-memory-server'

// Create memory server
export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '6.0.4',
    },
  })

  // Store MongoDB instance/URL as global variables
  global.__MONGOINSTANCE = instance
  process.env.DATABASE_URL = instance.getUri()
}
