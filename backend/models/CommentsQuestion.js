import mongoose from "mongoose";

const commentsQuestionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CommentsQuestion",
    default: null,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    minlength: 1,
  },
  content: {
    type: String,
    required: true,
    minlength: [0, "The answer must contain at least 5 characters."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentsQuestionSchema.index({ authorId: 1 });


export default mongoose.model("CommentsQuestion", commentsQuestionSchema);
