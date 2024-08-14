import express from "express";
/** 管理员模块 */
const router = express.Router();
// 管理员列表
router.get("/", (req, res) => {
  res.send("管理员管理");
});
// 增加管理员
router.get("/add", (req, res) => {
  res.send("增加管理员");
});
// 修改管理员
router.get("/edit", (req, res) => {
  res.send("修改管理员");
});
// 执行增加
router.post("/doAdd", (req, res) => {
  res.send("执行增加");
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
