// 2. 定义一个Schema, Schema 里边的对象和数据库表里的字段一一对应。

import mongoose from "./db";

const Schema = mongoose.Schema;

interface IUser {
  username: string;
  age: number;
  password: string;
  role: string;
  phone: number;
  email: string;
}

// Schema 只是表的定义，并不会实际操作数据库
export const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    // mongoose模式修饰符，可以对传入的值左右去空格
    trim: true,
    // 唯一索引
    unique: true,
    // 普通索引
    index: 1,
  },
  age: {
    type: Number,
    // 数据校验
    validate: {
      validator: (value: number) => value >= 18,
      message: "年龄必须大于等于 18 岁",
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
    set(parma?: string) {
      console.log("parma", parma);
    },
  },
  phone: {
    type: Number,
    // 自定义修饰符： set方法是在增加数据的时候对phone字段进行处理
    set(parma: number) {
      //parma参数可以获取phone的值 、   返回的数据就是phone在数据库实际保存的值
      //   if (!parma) return parma;
      if (!parma) {
        return 0;
      } else {
        return parma;
      }
    },
  },
  email: String,
});
/** 静态方法,这里使用了this，所以不能使用箭头函数 */
UserSchema.statics.findByName = function (username, cb) {
  this.find({ username });
};

// 3. 定义数据库模型，操作数据库
// modal 里边的第一个参数要注意：1. 首字母大写 2. 要和数据库表名称对应 这个模型会和模型名称相同的复数的数据库表建立连接，这个模型默认会和users这个表连接
// 第三个参数可以指定操作的表
export const UserModal = mongoose.model("User", UserSchema, "user");

// 4. 查询表
UserModal.find({})
  .limit(10)
  .then((res) => {
    console.log(res);
  });

// 5. 增加数据
// 5.1 先实例化Modal，通过实例化 User Modal来创建增加的数据
// 5.2 实例化数据

// const user1 = new UserModal({
//   username: "   密码不去空格",
//   //   password: "    1234534",
//   email: "admin@admin.com",
//   phone: "12345678901",
//   age: 17,
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
