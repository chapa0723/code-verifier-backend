import { pruebasEntity } from '../entities/Pruebas.entity';
import { LogSuccess, LogError } from '../../utils/logger'

// CRUD
/**
 * Method to optain all user from collection  "Users" in Mongo Server
 */
export const GetAllUsers = async () => {
  try {
    const userModel = pruebasEntity()
    // Search All User
    return await userModel.find({ isDelete: false })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting ALl Users: ${error}`)
  }
}

// TODO
// Get User by ID
// Ger User by Email
// Delete User by ID
// Create New User
// Update User by ID
