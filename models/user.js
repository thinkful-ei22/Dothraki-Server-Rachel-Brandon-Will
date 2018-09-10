'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// ===== Define UserSchema & UserModel =====
const userSchema = new mongoose.Schema({
  firstname: { type: String},
  lastName: { type: String},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Customize output for `res.json(data)`, `console.log(data)` etc.
userSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
    delete ret.password;
  }
});

userSchema.methods.serialize = function () {
  return {
    id: this._id,
    username: this.username,
    lastName: this.lastName,
    firstName: this.firstname
  };
};

// Note: Use `function` (not an `arrow function`) to allow setting `this`
userSchema.methods.validatePassword = function (pwd) {
  const currentUser = this;
  return bcrypt.compare(pwd, currentUser.password);
};

userSchema.statics.hashPassword = function (pwd) {
  return bcrypt.hash(pwd, 10);
};

module.exports = mongoose.model('User', userSchema);