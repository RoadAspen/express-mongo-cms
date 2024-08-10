import mongoose from "mongoose";

//1. 建立连接
mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
  console.log("Connected");
});

// 2. 定义一个Schema, Schema 里边的对象和数据库表里的字段一一对应。
// Schema 只是表的定义，并不会实际操作数据库
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  age: Number,
  password: String,
  role: String,
  phone: Number,
  email: String,
});

// 3. 定义数据库模型，操作数据库
// modal 里边的第一个参数要注意：1. 首字母大写 2. 要和数据库表名称对应 这个模型会和模型名称相同的复数的数据库表建立连接，这个模型默认会和users这个表连接
// 第三个参数可以指定操作的表
const User = mongoose.model("User", UserSchema, "user");

// 4. 查询表
User.find({})
  .limit(10)
  .then((res) => {
    console.log(res);
  });

// 5. 增加数据
// 5.1 先实例化Modal，通过实例化 User Modal来创建增加的数据
// 5.2 实例化数据

// const user1 = new User({
//   username: "章三",
//   password: "1234534",
//   email: "admin@admin.com",
//   phone: "12345678901",
//   age: 32,
//   role: "admin",
// });
// user1.save().then(() => {
//   console.log("创建成功");
// });

// 6. 更新数据
// User.updateOne(
//   { _id: "66aba27582054ee9fa4a277e" },
//   { username: "江澄和" }
// ).then((res) => {
//   console.log("更新成功");
// });

// 7. 删除数据
// User.deleteOne({ _id: "66aba27582054ee9fa4a277e" }).then(() => {
//   console.log("删除成功");
// });
