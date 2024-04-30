import { Router } from "express";
import multer from "multer";
import BlogController from "../controllers/blogController.js";

const router = Router();
let imageName;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      imageName = Date.now() + '-' + Math.round(Math.random() * 1E9)+"-"+file.originalname.trim();
      cb(null, imageName)
    }
  })
  
  const upload = multer({ storage})
const blogController = new BlogController();
//blog/add
router.post("/add",upload.single("image") ,(req,res)=>{
    blogController.addBlog(req,res,imageName);
}); 


router.get("/:id",blogController.getBlogByID)

// ?limit=20
router.get("/",blogController.getBlogs);

router.put("/update/:id", blogController.updateBlog);

router.delete("/delete/:id", blogController.deleteBlog);

//search/all?q=
router.get("/search/all",blogController.searchBlog); 

export default router;
