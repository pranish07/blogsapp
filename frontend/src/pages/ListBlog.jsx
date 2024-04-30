import React, { useEffect, useState } from "react";
import api from "../api/config";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";

function ListBlog() {
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    async function getBlogs() {
      const response = await api.get("/blogs");
      //   console.log(response.data);
      if (response.data) {
        setBlogList(response.data);
      }
    }
    getBlogs();
  },[]);

  const deleteBlog = async (id, idx) => {
    const data = window.confirm("Do you want to delete?");
    try{
    if (data) {
      const response = await api.delete(`/blog/delete/${id}`);
      console.log(response);

      if(response.data.success){
       const newBlogList = blogList.filter((blog,index)=>index!==idx);
       setBlogList(newBlogList);
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    }}
    catch(err){
        console.log(err.message)
        toast.error(err.data.message);
    }
  };
  return (
    <center>
        <Navbar />
      <div>
        <ToastContainer />
        {blogList.length > 0
          ? blogList.map((blog, index) => (
              <div
                key={index}
                style={{
                  boxShadow: "0 0 5px #ccc",
                  padding: "1rem",
                  margin: "1rem",
                  width: "40%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {blog.title}
                <FaTrashAlt
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => deleteBlog(blog.id, index)}
                />
              </div>
            ))
          : "No Blogs"}
      </div>
    </center>
  );
}

export default ListBlog;
