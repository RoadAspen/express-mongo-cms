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

export function staticPath(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
  staticPath: string
) {
  const pathname = req.url ? url.parse(req.url).pathname : "/";
  const urls = `./${staticPath}` + pathname;
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
}
