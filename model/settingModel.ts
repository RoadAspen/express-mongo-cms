import mongoose from "./core";
/** 文章表 */
const SettingSchema = new mongoose.Schema({
  site_name: { type: String },
  site_url: { type: String },
  site_logo: { type: String },
  keywords: { type: String },
  description: { type: String },
  icp: { type: String },
  about: { type: String },
  status: { type: Number, default: 1 },
  add_time: { type: Number },
});

export default mongoose.model("Setting", SettingSchema, "setting");
