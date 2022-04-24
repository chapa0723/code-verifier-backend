import mongoose from 'mongoose';

export const pruebasEntity = () => {
  const userSchema = new mongoose.Schema(
    {
      gender: String,
      name: Object,
      location: Object,
      email: String,
      login: Object,
      dob: Object,
      registered: Object,
      phone: String,
      cell: String,
      id: Object,
      picture: Object,
      nat: String
    }
  )
  return mongoose.model('Pruebas', userSchema)
}
