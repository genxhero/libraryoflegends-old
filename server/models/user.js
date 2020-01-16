const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema(
  {
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
    bio: {
      type: String,
      required: false
    },
    characters: [
      {
        type: Schema.Types.ObjectId,
        ref: "character"
      }
    ]
  },
  { usePushEach: true }
);


UserSchema.statics.addChar = function (id, args) {
    const Char = mongoose.model('character');

    return this.findById(id)
    .populate('character')
        .then(user => {
            //User is the resulting user, the res
            const char = new Char({ ...args, user })
            user.characters.push(char)
            return Promise.all([char.save(), user.save()])
                .then(([char, user]) => char);
        });
}

UserSchema.statics.findChars = function (id) {
    return this.findById(id)
        .populate('characters')
        .then(user => user.characters);
}

UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

//require('mongoose').model('User').schema.add({firstName: String, lastName: String, bio: String, avatarUrl: String});
module.exports = mongoose.model("user", UserSchema);