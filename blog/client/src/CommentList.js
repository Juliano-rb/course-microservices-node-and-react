import React from "react"

const CommentList = ({ comments }) => {
    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>;
    })

    return (
      <div>
        <div>
          <span className="badge bg-primary">{comments.length}</span> comments
          on this post:
        </div>
        <ul>{renderedComments}</ul>
      </div>
    );
}

export default CommentList