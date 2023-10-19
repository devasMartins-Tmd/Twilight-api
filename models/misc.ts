import mongoose from 'mongoose';
const model = mongoose.model;

const notifications = new mongoose.Schema(
  {
    text: mongoose.Schema.Types.String,
    type: mongoose.Schema.Types.String,
    userId: mongoose.Schema.Types.String,
  },
  { timestamps: true }
);

//friends
const friends = new mongoose.Schema(
  {
    frndId: mongoose.Schema.Types.String,
    frndName: mongoose.Schema.Types.String,
    userId: mongoose.Schema.Types.String,
  },
  { timestamps: true }
);
//

const feed = new mongoose.Schema(
  {
    all: {
      type: [{ type: mongoose.Schema.Types.String }],
    },
  },
  { timestamps: true }
);

const all = {
  notifications: model('notifications', notifications),
  friends: model('friends', friends),
  feed: model('feed', feed),
};

export default all;
