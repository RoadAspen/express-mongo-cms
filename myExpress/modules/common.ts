import fs from "fs";
export function getMime(extname: string) {
  switch (extname) {
    case ".js":
      return "text/javascript";
    case ".css":
      return "text/css";
    case ".html":
      return "text/html";
    default:
      return "text/plain";
  }
}
/** 获取文件 */
export function getFileMime(extName: string) {
  const data = fs.readFileSync("./static/json/mime.json");
  const mimeTypeObj = JSON.parse(data.toString());
  return mimeTypeObj[extName] || "text/plain";
}
