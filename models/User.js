const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema
  .virtual('password')
  .set(function (password) {
    this.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  })
  .get();
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

module.exports = mongoose.model('User', userSchema);
