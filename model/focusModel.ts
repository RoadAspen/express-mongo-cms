import mongoose from "./core";
/** 管理员表 */
const FocusSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  mobile: { type: String },
  status: { type: Number, default: 1 },
  login_time: { type: Number },
  add_time: { type: Number },
});

export default mongoose.model("Focus", FocusSchema, "focus");
