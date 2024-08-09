import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import login from "./routes/login";
/** 引入express */
const app = express();
/** 配置模版引擎,默认views文件夹就是模版文件夹 */
app.set("view engine", "ejs");
/** 4. 内置中间件 */
app.use(express.static("static"));
/** 1. 应用级中间件，用于权限判断 */
app.use((req, res, next) => {
  console.log("应用级中间件");
  next();
});
/** 配置第三方中间件 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
/** 配置cookie parser,cookie加密 */
app.use(cookieParser("secret"));
/** session */
app.use(
  session({
    /** 服务器生成session签名 */
    secret: "keyboard cat",
    // session 保存在数据库中，实行分布式架构
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/test",
      // 不管发出了多少次请求，在24小时内只更新一次session，除非你修改了session
      touchAfter: 24 * 3600,
    }),
    // 强制保存 session
    resave: false,
    name: "username",
    // 强制将未初始化的session存储
    saveUninitialized: true,
    //
    cookie: {
      maxAge: 1000 * 60,
      secure: false, // 是否支持https才能访问
    },
    // 每次都强制设置 cookie
    rolling: true,
  })
);
declare module "express-session" {
  export interface SessionData {
    username: string;
  }
}
app.use("/login", login);

app.get("/", (req, res) => {
  res.render("index.ejs", { user: req.session.username });
});

/** 2. 路由级中间件 */
app.get("/order", (req, res, next) => {
  console.log("路由级中间件");
  next();
});

app.get("/article", (req, res) => {
  // 获取cookie
  const username = req.cookies.username;
  /** 使用模版引擎渲染 */
  res.send("新闻页面" + username);
});
/** 订单列表 */
app.get("/news", (req, res) => {
  const userInfo = {
    username: "张三",
    age: 20,
  };
  let article = "<h3>我是一个article</h3>";
  res.render("news.ejs", { userInfo: userInfo, article, flag: true });
});
/** 3. 错误处理中间件 */
app.use((req, res, next) => {
  res.status(404).send("404");
});
app.listen(8081);
