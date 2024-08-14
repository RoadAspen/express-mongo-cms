import mongoose from "./core";
/** 友情链接 */
const LinkSchema = new mongoose.Schema({
  title: { type: String },
  pic: { type: String },
  url: { type: String },
  status: { type: Number, default: 1 },
  add_time: { type: Number },
});

export default mongoose.model("Link", LinkSchema, "link");
