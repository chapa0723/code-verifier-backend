import mongoose from 'mongoose';

export const katasEntity = () => {
  const katasSchema = new mongoose.Schema(
    {
      name: String,
      desciption: String,
      level: Number,
      user: String,
      date: String,
      valoration: Number,
      chances: Number
    }
  )
  return mongoose.models.Katas || mongoose.model('Katas', katasSchema);
}
