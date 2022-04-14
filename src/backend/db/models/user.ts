import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const User = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

User.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

User.methods.toJSON = function () {
  const data = this.toObject();

  delete data.password;

  return data;
};

export default mongoose.models.User || mongoose.model('User', User);
