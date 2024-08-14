import mongoose from "mongoose";
import config from "../config/config";

//1. 建立连接
mongoose.connect(config.mongodbUrl).then(() => {
  console.log("Connected");
});

export default mongoose;
