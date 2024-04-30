import React from 'react'
function Navbar() {
  return (
    <div >
    
        <ul style={{display:"flex",justifyContent:"center", gap:"1rem",textAlign:"center"}}>
            <li style={{listStyleType:"none"}}>
                <a href="http://localhost:3000/" style={{textDecoration:"none"}}>Home</a>
            </li>
            <li style={{listStyleType:"none"}}>
                <a href="http://localhost:3000/dashboard/addBlog" style={{textDecoration:"none"}}>Add Blog</a>
            </li>
            <li style={{listStyleType:"none"}}>
                <a href="http://localhost:3000/dashboard/listBlog" style={{textDecoration:"none"}}>Blog List</a>
            </li>
        </ul>

    </div>
  )
}

export default Navbar