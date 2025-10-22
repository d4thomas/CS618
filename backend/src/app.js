// Import libraries
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs, resolvers } from './graphql/index.js'

import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import { eventRoutes } from './routes/events.js'
import { optionalAuth } from './middleware/jwt.js'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

// Create Express app
const app = express()
app.use(cors())
apolloServer.start().then(() =>
  app.use(
    '/graphql',
    optionalAuth,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { auth: req.auth }
      },
    }),
  ),
)
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
