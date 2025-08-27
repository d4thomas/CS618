// Import components
import { PostList } from './components/PostList.jsx'

// Create post list
const posts = [
  {
    title: 'Full-Stack React Projects',
    contents: "Let's become full-stack developers!",
    author: 'Daniel Thomas',
  },
  {
    title: 'Hello React!',
  },
]

// App
export function App() {
  return <PostList posts={posts} />
}
