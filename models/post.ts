import mongoose from 'mongoose';

const post = new mongoose.Schema(
  {
    text: {
      type: mongoose.Schema.Types.String,
    },
    img: {
      type: mongoose.Schema.Types.String,
    },
    publicId: {
      type: mongoose.Schema.Types.String,
    },
    likes: {
      type: mongoose.Schema.Types.Number,
      required: ['post like required', true],
    },
    comment: {
      type: [{ text: mongoose.Schema.Types.String, name: mongoose.Schema.Types.String }],
      required: ['post comment required', true],
    },
    postId: {
      type: mongoose.Schema.Types.String,
      required: ['postId required', true],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: ['userId required', true],
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: ['name required', true],
    },
    tag: {
      type: mongoose.Schema.Types.String,
      required: ['tag required', true],
    },
    likeUserId: {
      type: [mongoose.Schema.Types.String],
    },
  },
  { timestamps: true }
);

export default mongoose.model('post', post);
