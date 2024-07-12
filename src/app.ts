// 引入http模块
import ejs from "ejs";
import http from "http";
import url from "url";

import { staticPath } from "./modules/routes";
http
  .createServer(function (req, res) {
    staticPath(req, res, "static");
    const pathname = req.url ? url.parse(req.url).pathname : "/";
    if (pathname === "/news") {
      res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
      const query = req.url ? url.parse(req.url, true).query : {};
      console.log(query);
      let msg = "数据库里面获取的数据";
      const list = [
        {
          title: "新闻1",
        },
        {
          title: "新闻2",
        },
        {
          title: "新闻3",
        },
        {
          title: "新闻4",
        },
      ];
      ejs.renderFile(
        "./src/views/news.ejs",
        { user: { name: "嘿嘿" }, msg, newsList: list, page: query.page },
        (err, data) => {
          res.end(data);
        }
      );
    } else if (pathname === "/login") {
      ejs.renderFile("./src/views/login.ejs", {}, (err, data) => {
        res.end(data);
      });
    } else if (pathname === "/doLogin") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        console.log("data", data);
        res.end("post ok");
      });
    } else if (pathname === "/registry") {
      res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
      res.write("<head><meta charset='utf-8'></head>");
      res.end("注册");
    } else if (pathname === "/admin") {
      res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
      res.write("<head><meta charset='utf-8'></head>");
      res.end("处理后的业务逻辑");
    } else {
      res.writeHead(404, { "Content-Type": "text/html;" });
      res.write("<head><meta charset='utf-8'></head>");
      res.end("这个页面不存在");
    }
  })
  .listen(8081);
