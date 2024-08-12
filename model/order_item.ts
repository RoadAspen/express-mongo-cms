// 2. 定义一个Schema, Schema 里边的对象和数据库表里的字段一一对应。

import mongoose from "./db";
import { OrderModal as Order } from "./order";

const Schema = mongoose.Schema;

interface IOrderItem {
  order_id: number;
  title: string;
  price: number;
  num: number;
}

// Schema 只是表的定义，并不会实际操作数据库
export const OrderItemSchema = new Schema<IOrderItem>({
  order_id: {
    type: Number,
  },
  title: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
  },
  num: {
    type: Number,
  },
});

// 3. 定义数据库模型，操作数据库
// modal 里边的第一个参数要注意：1. 首字母大写 2. 要和数据库表名称对应 这个模型会和模型名称相同的复数的数据库表建立连接，这个模型默认会和users这个表连接
// 第三个参数可以指定操作的表
export const OrderItemModal = mongoose.model(
  "OrderItem",
  OrderItemSchema,
  "order_item"
);

// 4.  联表查询, 查出订单对应的所有订单商品
// OrderItemModal.aggregate([
//   {
//     $lookup: {
//       from: "order",
//       localField: "order_id",
//       foreignField: "order_id",
//       as: "order",
//     },
//   },
// ])
//   .limit(10)
//   .then((res) => {
//     console.log(JSON.stringify(res));
//   });

// 5. 联表查询
OrderItemModal.find()
  .populate("order_id")
  .then((res) => {
    console.log(JSON.stringify(res));
  });
