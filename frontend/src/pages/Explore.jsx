import React from "react";
import { useLocation } from "react-router-dom";

function Explore() {
  const blog = useLocation().state.blog;
  console.log(blog);
  return (
    <>
      <button style={{padding:"0"}}>
        <a
          href="http://localhost:3000"
          style={{ textDecoration: "none",padding:"0 2rem" }}
        >
          Back
        </a>
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          boxShadow: "0 0 5px #ccc",
          marginLeft: "20px",
          cursor: "pointer",
          width: "80%",
          maxWidth: "300px",
          margin: "auto",
        }}
      >
        <img
          src={blog.image}
          alt={blog.title}
          width="200px"
          height="200px"
          style={{ objectFit: "contain" }}
        />
        <p style={{ margin: ".5rem" }}>
          <span style={{ color: "black" }}>Blog Name: </span>
          {blog.title}
        </p>

        <p style={{ margin: ".5rem" }}>
          <span style={{ color: "black" }}>Author Name: </span>
          {blog.author}
        </p>
       
        <p style={{ margin: ".5rem" }}>
          <span style={{ color: "black" }}> Content: </span>
          {blog.content}
        </p>
      </div>
    </>
  );
}

export default Explore;
