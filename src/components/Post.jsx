import PropTypes from 'prop-types'

// Post
export function Post({ title, contents, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
    </article>
  )
}

// Post properties
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}
