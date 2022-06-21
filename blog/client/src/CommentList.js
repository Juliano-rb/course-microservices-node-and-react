import React from "react"

const CommentList = ({ comments }) => {
    const renderedComments = comments.map(comment => {
        const contentByStatus = {
          approved: comment.content,
          pending: "Comment waiting moderation",
          rejected: "This comment has been rejected",
        }
        
        let content = contentByStatus[comment.status]
        
        return <li key={comment.id}>{content}</li>;
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