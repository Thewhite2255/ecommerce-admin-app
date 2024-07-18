const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
