import mongoose from 'mongoose';
import { IUser } from '../../controller/interfaces/IUser.interface';

export const userEntity = () => {
  let UserSchema = new mongoose.Schema(
    {
      name: String,
      email: String,
      age: Number
    }
  )
  // let UserSchema2 = new mongoose.Schema<IUser>(
  //   {
  //     name: { type: String, required: true },
  //     email: { type: String, required: true },
  //     age: { type: Number, required: true }
  //   }
  // )
  return mongoose.models.Users || mongoose.model<IUser>('Users', UserSchema);
}
