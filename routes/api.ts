import express from "express";

const router = express.Router();
// 暴露给第三方的接口，小程序、App、微信公众号等
router.get("/", (req, res) => {
  res.send("api接口");
});

export default router;
