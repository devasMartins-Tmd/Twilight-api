import mongoose from 'mongoose';

let STRING = mongoose.Schema.Types.String;
const post = new mongoose.Schema(
   {
      text: {
         type: STRING,
      },
      img: {
         type: STRING,
      },
      publicId: {
         type: STRING,
      },
      likes: {
         type: mongoose.Schema.Types.Number,
         required: ['post like required', true],
      },
      comment: {
         type: [{ text: STRING, name: STRING, profileImg: STRING, ID: STRING }],
         required: ['post comment required', true],
      },
      postId: {
         type: STRING,
         required: ['postId required', true],
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         required: ['userId required', true],
      },
      name: {
         type: STRING,
         required: ['name required', true],
      },
      tag: {
         type: STRING,
         required: ['tag required', true],
      },
      likeUserId: {
         type: [STRING],
      },
   },
   { timestamps: true }
);

export default mongoose.model('post', post);
