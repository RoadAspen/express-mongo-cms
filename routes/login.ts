import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  /** 使用模版引擎渲染 */
  if (req.session.username) {
    res.render("index", { user: req.session.username });
  } else {
    res.send("没有登陆");
  }
});

router.get("/login", (req, res) => {
  /** 使用模版引擎渲染 */
  res.render("login");
});
// 登陆
router.post("/doLogin", (req, res) => {
  req.session.username = req.body.username;
  res.send(req.body);
});

// 退出登陆，销毁session
router.get("/loginOut", (req, res) => {
  // 1. 将过期时间设为0
  // req.session.cookie.maxAge = 0;
  // 2. 将对应的cookie设为空
  // req.session.username = "";
  // 3. 销毁session
  req.session.destroy((err) => {
    console.log(err);
  });

  res.send("退出登陆");
});

export default router;
