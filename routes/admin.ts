import express from "express";

const router = express.Router();
// 后台管理中心
router.get("/", (req, res) => {
  res.send("后台管理中心");
});

export default router;
