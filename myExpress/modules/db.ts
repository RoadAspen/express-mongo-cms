/** 引入mongodb */
import { MongoClient } from "mongodb";
/** 定义数据库连接的地址 */
const url = "mongodb://127.0.0.1:27017";

/** 定义要操作的数据库 */
export const dbName = "test";

/** 实例化数据库 */
export const client = new MongoClient(url);

// /** 链接数据库 */
// async function connect() {
//   await client.connect();
//   let db = client.db(dbName);
//   console.log("数据库连接成功");
//   /** 查找数据 */
//   const userFind = await db.collection("user").find({ age: 10 }).toArray();
//   console.log("userFind", userFind);

//   /** 增加数据 */
//   await db
//     .collection("user")
//     .insertOne({ username: "nodejs操作mongodb", age: 10 });
//   /** 更新数据 */
//   await db
//     .collection("user")
//     .updateMany(
//       { username: "nodejs操作mongodb" },
//       { $set: { username: "nodejs操作mongodb更新" } }
//     );

//   /** 删除数据 */
//   await db.collection("user").deleteMany({ username: "nodejs操作mongodb更新" });
//   /** 查找数据 */
//   const userFinds = await db.collection("user").find({ age: 10 }).toArray();
//   console.log("userFinds", userFinds);
//   client.close();
// }
// connect();

export default client;
