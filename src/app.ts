// 引入http模块
import ejs from "ejs";
import expressApp from "./modules/express-routes";

const app = new expressApp();
app.static("static");
app.get("/login", (req, res) => {
  ejs.renderFile("./src/views/login.ejs", {}, (err, data) => {
    res.end(data);
  });
});

app.listen(8081);

app.post("/doLogin", (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    console.log("data", data);
    res.end("post ok");
  });
});
