// 引入http模块
import fs from "fs";

/** 判断文件还是文件夹 */
fs.stat("./src/test", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    let type = "";
    if (data.isFile()) {
      type = "单个文件";
    }
    if (data.isDirectory()) {
      type = "文件夹";
    }
    console.log("判断文件类型成功", type);
  }
});
/** 创建文件夹 */
fs.mkdir("./src/test", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("创建成功");
  }
});
/** 创建文件夹 */
fs.mkdir("./src/tests", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("创建成功");
  }
});

/** 创建文件 */
fs.writeFile("./src/test/write.txt", "你好\n", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("创建文件成功");
  }
});

/** 追加文件 */
fs.appendFile("./src/test/write.txt", "你好\n", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("追加文件成功");
  }
});

/** 读取文件*/
fs.readFile("./src/test/write.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

/** 读取文件夹*/
fs.readdir("./src/test", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("读区文件夹成功", data);
  }
});

/** 重命名、移动文件 */
fs.rename("./src/test/write.txt", "./src/test/writes.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("重命名文件成功", data);
  }
});
fs.rename("./src/test/writes.txt", "../tests/writes.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("移动文件成功", data);
  }
});

/** 删除 */
fs.unlink("./upload", (err) => {
  if (!err) {
    console.log("删除成功");
  }
});
