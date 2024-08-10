import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import admin from "./routes/admin";
import index from "./routes/index";
import api from "./routes/api";
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
app.use("/admin", admin);
app.use("/api", api);
app.use("/", index);

/** 3. 错误处理中间件 */
app.use((req, res, next) => {
  res.status(404).send("404");
});
app.listen(8081);
