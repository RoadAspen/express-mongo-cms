import express from "express";
/** 引入express */
const app = express();
/** 配置模版引擎,默认views文件夹就是模版文件夹 */
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  /** 使用模版引擎渲染 */
  res.render("index.ejs", { user: "roadaspen" });
});

app.get("/news", (req, res) => {
  const userInfo = {
    username: "张三",
    age: 20,
  };
  let article = "<h3>我是一个article</h3>";
  res.render("news.ejs", { userInfo: userInfo, article, flag: true });
});

app.listen(8081);
