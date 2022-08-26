import React from "react";
import { useState } from "react";
import axios from "axios"
const App = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault()

    await axios.post('http://posts.com/posts/create', {
        title
    })

    setTitle('')
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default App;
