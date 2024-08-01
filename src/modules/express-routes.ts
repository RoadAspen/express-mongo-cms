/** 实现一个类似于express的路由,封装一个路由注册器 */
import fs from "fs";
import http from "http";
import path from "path";
import url from "url";
import { getFileMime } from "./common";
import { MongoClient } from "mongodb";
import mongoClient from "./db";

export default class expressApp {
  private routes: {
    [key: string]: (
      req: http.IncomingMessage,
      res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
      }
    ) => void;
  };
  private staticPath: string;
  constructor() {
    this.routes = {};
    this.staticPath = "static";
  }
  private init = (port: number) => {
    const that = this;
    http
      .createServer(function (req, res) {
        let pathname = url.parse(req.url || "").pathname || "/";
        that.initStatic(req, res, pathname);
        pathname = `${req.method} ${pathname}`;
        const route = that.routes[pathname];
        try {
          console.log("pathname", pathname);
          route(req, res);
        } catch (error) {
          res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
          res.end("not found");
        }
      })
      .listen(port);
  };
  private initStatic = (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    },
    pathname: string
  ) => {
    const urls = `../${this.staticPath || ""}` + pathname;
    console.log("urls", urls);
    if (pathname !== "/favicon.ico") {
      try {
        const isFile = fs.statSync(urls);
        console.log("isFile", isFile);
        if (isFile.isFile()) {
          const data = fs.readFileSync(urls);
          if (data) {
            const extName = path.extname(urls);
            const mime = getFileMime(extName.slice(1));
            res.writeHead(200, {
              "Content-Type": `${mime};charset=utf-8`,
            });
            /** 结束相应 */
            res.end(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  public static = (path: string) => {
    this.staticPath = path;
  };
  public get = (
    path: string,
    callback: (
      req: http.IncomingMessage,
      res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
      }
    ) => void
  ) => {
    this.routes[`GET ${path}`] = callback;
  };
  public post = (
    path: string,
    callback: (
      req: http.IncomingMessage,
      res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
      }
    ) => void
  ) => {
    this.routes[`POST ${path}`] = callback;
  };
  public listen(port: number) {
    this.init(port);
  }
}
