import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post.jsx'

// Post list
export function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

// Post list properties
PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}
