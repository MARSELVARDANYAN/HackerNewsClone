import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [5, 'The title must be at least 5 characters long.']
  },
  content: {
    type: String,
    required: true,
    minlength: [10, 'Content must be at least 10 characters long.']
  },

  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
});


questionSchema.index({ createdAt: -1 });

export default mongoose.model("Question", questionSchema);