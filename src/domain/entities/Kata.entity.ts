import mongoose from 'mongoose';

export const userEntity = () => {
  let userSchema = new mongoose.Schema(
    {
      name: String,
      desciption: String,
      level: Number,
      user: String,
      date: Date,
      valoration: Number,
      chances: Number
    }
  )
  return mongoose.model('Katas', userSchema);
}
