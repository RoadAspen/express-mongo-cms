import mongoose from "./core";
/** 文章表 */
const ArticleSchema = new mongoose.Schema({
  cid: { type: String },
  title: { type: String },
  description: { type: String },
  keywords: { type: String },
  author: { type: String },
  content: { type: String },
  count: { type: Number },
  status: { type: Number, default: 1 },
  add_time: { type: Number },
});

export default mongoose.model("Article", ArticleSchema, "article");
