import express from "express";
import connection from "./models/index.js"
import blogRoute from "./routes/blogRoute.js"
import "dotenv/config";
import cors from "cors";
    
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(cors()); 
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.send("Backend is working")
})
app.use("/blogs",blogRoute);

app.listen(process.env.PORT || 8000,async()=>{
    console.log("Server has started");
    try{
    await connection.authenticate();
    connection.sync();
    console.log("successfully connected to db");
    }
    catch(err){
        console.log("error during connecting to db",err);
    }
})