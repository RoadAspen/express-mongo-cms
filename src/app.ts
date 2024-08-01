// 引入http模块
import ejs from "ejs";
import expressApp from "./modules/express-routes";
import { client, dbName } from "./modules/db";

const app = new expressApp();
app.static("static");
app.get("/login", (req, res) => {
  ejs.renderFile("./src/views/login.ejs", {}, (err, data) => {
    res.end(data);
  });
});

app.listen(8081);

app.post("/doLogin", (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    console.log("data", data);
    res.end("post ok");
  });
});

app.get("/", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  /** 查找数据 */
  const userFind = await db.collection("order").find().toArray();
  console.log("userFind", userFind);
  await client.close();
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end("首页");
});
