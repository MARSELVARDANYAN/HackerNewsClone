import mongoose from "mongoose";

const showPageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  url: String,
  type: {
    type: String,
    enum: ["ask", "show", "job", "link"],
    required: true,
    default: "link",
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ShowPost", showPageSchema);
