import mongoose from "mongoose";

//1. 建立连接
mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
  console.log("Connected");
});

export default mongoose;
