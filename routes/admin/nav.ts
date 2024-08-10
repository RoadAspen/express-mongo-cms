import express from "express";
import tools from "../../model/tools";
/** 导航模块 */
const router = express.Router();

// 导航列表
router.get("/", (req, res) => {
  res.send("导航列表");
});
// 增加导航
router.get("/add", (req, res) => {
  res.render("admin/nav/add");
});
// 修改导航
router.get("/edit", (req, res) => {
  res.send("修改导航");
});
// 执行增加
router.post("/doAdd", tools.multer().single("avatar"), (req, res) => {
  const body = req.body;
  const file = req.file;
  res.send({ body: body, file });
});
// 执行修改
router.post("/doEdit", (req, res) => {
  res.send("执行修改");
});
// 执行删除
router.post("/doDel", (req, res) => {
  res.send("执行删除");
});

export default router;
