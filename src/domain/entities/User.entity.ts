import mongoose from 'mongoose';

export const userEntity = () => {
  let UserSchema = new mongoose.Schema(
    {
      name: String,
      email: String,
      age: Number
    }
  )
  return mongoose.models.Users || mongoose.model('Users', UserSchema);
}
