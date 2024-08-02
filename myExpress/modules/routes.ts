import ejs from "ejs";
import fs from "fs";
import http from "http";
import path from "path";
import url from "url";
/** 获取文件 */
function getFileMime(extName: string) {
  const data = fs.readFileSync("./static/json/mime.json");
  const mimeTypeObj = JSON.parse(data.toString());
  return mimeTypeObj[extName];
}

export const app: {
  [key: string]: (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    },
    staticPath?: string
  ) => void;
} = {
  static: (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    },
    staticPath?: string
  ) => {
    const pathname = req.url ? url.parse(req.url).pathname : "/";
    const urls = `./${staticPath || ""}` + pathname;
    if (pathname !== "/favicon.ico") {
      try {
        const isFile = fs.statSync(urls);
        if (isFile.isFile()) {
          const data = fs.readFileSync(urls);
          if (data) {
            const extName = path.extname(urls);
            const mime = getFileMime(extName.slice(1));
            res.writeHead(200, {
              "Content-Type": `${mime};charset='utf-8'`,
            });
            /** 结束相应 */
            res.end(data);
          }
        }
      } catch (error) {}
    }
  },
  login: (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ) => {
    ejs.renderFile("./views/login.ejs", {}, (err, data) => {
      res.end(data);
    });
  },
  doLogin: (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      console.log("data", data);
      res.end("post ok");
    });
  },
  news: (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ) => {
    res.end("news");
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
      "./views/news.ejs",
      { user: { name: "嘿嘿" }, msg, newsList: list, page: query.page },
      (err, data) => {
        res.end(data);
      }
    );
  },
  error: (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ) => {
    res.end("error");
  },
};
