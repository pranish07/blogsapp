import { DataTypes } from "sequelize";
import connection from "./index.js";

export default connection.define(
  "blogs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, }
);
