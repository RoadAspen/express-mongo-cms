import express from "express";
/** 登陆模块 */
const router = express.Router();
// 登陆页面
router.get("/", (req, res) => {
  res.send("登陆页面");
});
// 执行登陆
router.post("/doLogin", (req, res) => {
  res.send("执行登陆");
});

export default router;
