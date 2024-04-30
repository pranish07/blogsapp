import React, { useEffect, useState } from "react";
import api from "../api/config";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function HomePage() {
  const navigate = useNavigate();
  const [blogList, setBlogList] = useState([]);
  const [tempBlogList, setTempBlogList] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    async function fetchBlogs() {
      const response = await api.get("/blogs");
      //  console.log(response.data);
      setBlogList(response.data);
      setTempBlogList(response.data);
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    async function searchBlogs() {
      const response = await api.get(`/blog/search/all?q=${searchText}`);
      if (response.data) {
        setBlogList(response.data);
        console.log(response.data);
      }
    }
    if (searchText) searchBlogs();
    else setBlogList(tempBlogList);
  }, [searchText, tempBlogList]);
  return (
    <>
    <Navbar/>
      <center>
        <input
          type="text"
          placeholder="Search Blogs..."
          style={{ width: "55%", margin: "20px", padding: "10px" }}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </center>{" "}
      <div
    
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {blogList.length > 0
          ? blogList.map((blog, index) => {
              return (
                <div
                onClick={()=>navigate("/explore",{
                  state:{
                    blog,
                  }
                })}
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign:"center",
                    padding: "1rem",
                    boxShadow: "0 0 5px #ccc",
                    marginLeft: "20px",
                    cursor:"pointer",
                  }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    width="200px"
                    height="200px"
                    style={{ objectFit: "contain" }}
                  />
                  <p>{blog.title}</p>
                </div>
              );
            })
          : "No Blogs Found"}
      </div>
    </>
  );
}

export default HomePage;
