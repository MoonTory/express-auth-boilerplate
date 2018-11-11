import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

UserSchema.plugin(timestamp);

export default mongoose.model('User', UserSchema);