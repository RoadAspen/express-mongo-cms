import { mkdirp } from "mkdirp";
import multer from "multer";
import path from "path";
import dayjs from "dayjs";

// 工具函数
const tools = {
  // 上传文件解析
  multer() {
    // 上传文件配置
    const storage = multer.diskStorage({
      // 配置上传的目录名
      destination: async function (req, file, cb) {
        // 获取当前日期
        const day = dayjs(new Date()).format("YYYYMMDD");
        const dirPath = path.join("static/upload", day);
        await mkdirp(dirPath);
        // 上传之前目录必须存在,根据当前日期创建文件目录
        cb(null, dirPath);
      },
      // 修改上传后的文件名
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        console.log(file);
        cb(
          null,
          file.fieldname +
            "-" +
            uniqueSuffix +
            "." +
            path.extname(file.originalname)
        );
      },
    });
    const upload = multer({ storage: storage });
    return upload;
  },
};

export default tools;
