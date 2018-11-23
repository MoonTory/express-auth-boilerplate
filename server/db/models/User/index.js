import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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

UserSchema.pre('save', async function(next) {
  try {
    // Generate Salt
    const salt = await bcrypt.genSalt(10);

    // Generate a password hash (Salt + Hash)
    const passwordHash = await bcrypt.hash(this.password, salt);

    // Save hashed password to the model to be stored in DB 
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error); // Return error
  }
});

UserSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch(error) {
    throw new Error(error);
  }
};

export default mongoose.model('User', UserSchema);