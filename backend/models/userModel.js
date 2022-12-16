const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters'],
      // maxLength: [24, 'Password must be not more than 24 characters'],
    },
    photo: {
      type: String,
      required: [true, 'Image is required'],
      default: 'https://i.ibb.co/4pDNDk1/avatar.png',
    },
    phone: {
      type: String,
      default: '+998998678866',
    },
    bio: {
      type: String,
      maxLength: [250, 'Bio must not be more than 250 characters'],
      default: 'bio',
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving to database
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = model('User', UserSchema);

module.exports = User;
