import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter username']
    },

    email: {
      type: String,
      required: [true, 'Please enter email']
    },

    authentication: {
      password: {
        type: String,
        required: true,
        select: false
      },

      salt: {
        type: String,
        select: false
      },

      sessionToken: {
        type: String,
        select: false
      }
    }
  },
  {
    timestamps: true
  }
);

export const Users = mongoose.model('Users', UserSchema);
