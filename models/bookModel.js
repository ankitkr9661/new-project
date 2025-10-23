// models/bookModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Book = sequelize.define("Book", {
  bookId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  publishedYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  availableQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // by default 0
    },
},
{
  timestamps: false
});

export default Book;
