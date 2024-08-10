import express from "express";
/** 用户模块 */
const router = express.Router();
// 用户列表
router.get("/", (req, res) => {
  res.send("用户列表");
});
// 增加用户
router.get("/add", (req, res) => {
  res.send("增加用户");
});
// 修改用户
router.get("/edit", (req, res) => {
  res.send("修改用户");
});
// 执行增加
router.post("/doAdd", (req, res) => {
  res.send("执行增加");
});
// 执行修改
router.post("/doEdit", (req, res) => {
  res.send("执行修改");
});

export default router;
