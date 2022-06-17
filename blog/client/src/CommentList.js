import React, { useState, useEffect } from "react"
import axios from 'axios'

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([])
    
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)

        setComments(res.data)
    }

    useEffect(() => {
      fetchData();
    }, []);

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