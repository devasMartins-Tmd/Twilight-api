import mongoose from "mongoose";
import color from "colors";
const { uri } = require("./uri");

const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGOURI || uri);
    console.log(color.cyan(`Connected to mongoDB: ${conn.connection.host}`));
  } catch (e) {
    console.log(color.cyan(`Error connecting to mongoDB`));
    process.exit(1);
  }
};

module.exports = connectToDB;
