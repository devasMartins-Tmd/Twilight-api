import mongoose from 'mongoose';
const String = mongoose.Schema.Types.String;

const user = new mongoose.Schema({
  name: {
    type: String,
    required: ['name field required', true],
  },
  email: {
    type: String,
    required: ['email field required', true],
  },
  password: {
    type: String,
    required: ['password field required', true],
  },
  uniqueId: {
    type: String,
    required: ['uniqueId field required', true],
  },
  publicId: {
    type: String,
  },
  tag: {
    type: String,
    required: ['tag field required', true],
  },
  profileImg: {
    type: String,
  },
});

export default mongoose.model('user', user);
