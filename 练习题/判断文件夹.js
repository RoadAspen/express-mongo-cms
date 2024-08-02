// 判断服务器上的upload文件夹是否存在，如果不存在就创建这个目录，如果存在则不做操作

const fs = require("fs");

fs.stat("./upload", (err, data) => {
  if (err) {
    mkdir("./upload");
  } else {
    if (data.isDirectory()) {
      console.log("upload目录已存在");
    } else {
      fs.unlink("./upload", (err) => {
        if (!err) {
          mkdir("./upload");
        }
      });
    }
  }
});

// 创建文件夹
function mkdir(dir) {
  fs.mkdir(dir, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("创建成功");
    }
  });
}
