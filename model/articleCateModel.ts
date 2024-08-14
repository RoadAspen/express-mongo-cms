import mongoose from "./core";
/** 管理员表 */
const ArticleCateSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  keywords: { type: String },
  add_time: { type: Number },
  pid: { type: Number },
  status: { type: Number, default: 1 },
});

export default mongoose.model("ArticleCate", ArticleCateSchema, "manager");
