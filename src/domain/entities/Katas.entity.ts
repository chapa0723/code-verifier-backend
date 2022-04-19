import mongoose from 'mongoose';

export const katasEntity = () => {
  let katasSchema = new mongoose.Schema(
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
  return mongoose.models.Katas || mongoose.model('Katas', katasSchema);
}
