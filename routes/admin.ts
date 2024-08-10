import express from "express";
import user from "./admin/user";
import nav from "./admin/nav";
import login from "./admin/login";
const router = express.Router();
// 后台管理中心
router.get("/", (req, res) => {
  res.send("后台管理中心");
});
// 挂在路由
router.use("/user", user);
router.use("/nav", nav);
router.use("/login", login);
export default router;
