import mongoose from "./core";
/** 导航路由表 */
const NavSchema = new mongoose.Schema({
  title: { type: String },
  url: { type: String },
  status: { type: Number, default: 1 },
  add_time: { type: Number },
});

export default mongoose.model("Nav", NavSchema, "nav");
