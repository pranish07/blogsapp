import React, { useState } from "react";
import "../assets/sass/form.scss";
import api from "../api/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

function AddBlog() {
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState();

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/blogs/add",
        {
          ...formData,
          image: imageData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },  
        }
      );
      if (response.data.id) {
        console.log(response);
        console.log("success");
        toast.success("Added new blog");

        e.target.reset(); //resetting the values of a target
        setFormData({}); //clearing state of a form
        setImageData(); //clearing image data of a form
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      // console.log(response.data.message);
      toast.message(err.message);
    }
    // console.log(response);
  };
  return (
    <>
      {" "}
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ToastContainer />
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={addBlog}
        >
          title
          <input type="text" name="title" onChange={handleChange} />
          Author
          <input type="text" name="author" onChange={handleChange} />
        
          Content
          <textarea
            name="content"
            rows="10"
            onChange={handleChange}
          ></textarea>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              setImageData(e.target.files[0]);
            }}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default AddBlog;
