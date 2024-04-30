import { Op } from "sequelize";
import blogModel from "../models/blogModel.js";
import textConstants from "../constants/textConstants.js";
import urlConstants from "../constants/urlConstants.js";

export default class BlogController {
  async addBlog(req, res, imageName) {
    try{
    const data = await blogModel.create({ ...req.body, image: imageName });
    console.log(data);
    if (data) {
      res.json(data);
    } else {
      res.json({ success: false, message: "Error during adding the blog" });
    }}
    catch(err){
     return res.json({success:false,message:"Error while querying in DB"})
    }
  }

  //get blog by their id
  async getBlogByID(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await blogModel.findByPk(id);

      if (data) {
        res.json(data);
      } else {
        res.json([]);
      }
    } else {
      res.json({ success: false, message: textConstants.BLOG_ID_NOT_PROVIDED });
    }
  }

  //update blog

  async updateBlog(req, res) {
    const { id } = req.params;
    if (id) {
      req.body;
      const data = await blogModel.update(req.body, {
        where: {
          id,
        },
      });
      if (data[0]) {
        res.json({ success: true, message: "updated blog" });
      } else {
        res.json({ success: false, message: "Couldn't update blog" });
      }
    } else {
      res.join({ success: false, message: textConstants.BLOG_ID_NOT_PROVIDED });
    }
  }

  //delete blog

  async deleteBlog(req, res) {
    const { id } = req.params;
    if (id) {
      req.body;
      const data = await blogModel.destroy({
        where: {
          id,
        },
      });
      if (data) {
        res.json({ success: true, message: "blog deleted" });
      } else {
        res.json({ success: false, message: "Couldn't delete blog" });
      }
    } else {
      res.join({ success: false, message: textConstants.BLOG_ID_NOT_PROVIDED });
    }
  }

  async searchBlog(req, res) {
    const { q } = req.query;
    if (q) {
      const data = await blogModel.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${q}%`,
            },
            author: {
              [Op.like]: `%${q}%`,
            },
          },
        },
      // if raw = true; d.dataValues.image = d.image
      });

      console.log(data);
      for (let d of data) {
        d.dataValues.image = urlConstants.IMG_PATH_URL + d.dataValues.image;
        console.log(d.dataValues.image);
      }
      res.json(data);
    } else {
      res.json({ success: false, Message: "Empty Query search query" });
    }
  }

  // get all blogs

  async getBlogs(req, res) {
    let { limit } = req.query;
    if (!limit) limit = 20;
    try {
      const data = await blogModel.findAll({
        limit: parseInt(limit),
      });
      // console.log(data);
      for (let d of data) {
        d.dataValues.image = urlConstants.IMG_PATH_URL + d.dataValues.image;
        // console.log(d.dataValues.image);
      }

      res.json(data);
    } catch (err) {
      console.log({ success: false, message: err });
    }
  }
}
