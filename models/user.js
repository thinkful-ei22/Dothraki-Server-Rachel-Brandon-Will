'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  password: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  questions: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      question: String,
      answer: String,
      memoryStrength: Number,
      _next: Number
    }
  ],
  head: {
    type: Number,
    default: 0
  }
});

//return the username and the score
// userSchema.methods.apiRepr = function() {
//   return {
//     username: this.username,
//     score: this.score
//   };
// };

userSchema.methods.serialize = function () {
  return {
    id: this._id,
    username: this.username,
    fullName: this.firstName + this.lastName
   
  };
};

//password validation function
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', userSchema);

module.exports = {User};
// const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// ===== Define UserSchema & UserModel =====
// const userSchema = new mongoose.Schema({
//   firstname: { type: String},
//   lastName: { type: String},
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },

//   questions: [
//     {
//       //_id: mongoose.Schema.Types.ObjectId,
//       question: String,
//       answer: String,
//       hint: String,
//       memoryStrength:{ type: Number, default: 0 }, 
//       _next: Number,
//       _index: Number

//     }
//   ],
//   head: {
//     type: Number,
//     default: 0
//   }
// });

// // Customize output for `res.json(data)`, `console.log(data)` etc.
// userSchema.set('toObject', {
//   virtuals: true,     // include built-in virtual `id`
//   versionKey: false,  // remove `__v` version key
//   transform: (doc, ret) => {
//     delete ret._id; // delete `_id`
//     delete ret.password;
//   }
// });

// userSchema.methods.serialize = function () {
//   return {
//     id: this._id,
//     username: this.username,
//     lastName: this.lastName,
//     firstName: this.firstname
//   };
// };

// // Note: Use `function` (not an `arrow function`) to allow setting `this`
// userSchema.methods.validatePassword = function (pwd) {
//   const currentUser = this;
//   return bcrypt.compare(pwd, currentUser.password);
// };

// userSchema.statics.hashPassword = function (pwd) {
//   return bcrypt.hash(pwd, 10);
// };

// module.exports = mongoose.model('User', userSchema);


// // .then(digest => 
// //   encryptedPassword = digest
  
// //   {
// //   const newUser = {
// //     username,
// //     password: digest,
// //     firstname: firstName,
// //     lastName
// //   };
// //   return User.create(newUser);
// // })
// // .then(user => {



//   // .then(questions => {
//   //   questions.map(_question => {
//   //     _question.memoryStrength = 2, 
//   //     _question._next = 0;
//   //   });
   