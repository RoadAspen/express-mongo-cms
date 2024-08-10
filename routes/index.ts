import express from "express";

const router = express.Router();
// 首页
router.get("/", (req, res) => {
  res.send("首页");
});

export default router;
