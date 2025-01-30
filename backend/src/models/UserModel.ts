import mongoose, { Schema } from 'mongoose';

export default mongoose.model(
  'User',
  new Schema(
    {
      name: String,
      lastName: String,
      email: String,
    },
    { timestamps: true },
  ),
);
