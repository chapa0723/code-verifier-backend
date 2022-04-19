import { userEntity } from '../entities/User.entity';
import { LogSuccess, LogError } from '../../utils/logger';

// CRUD
/**
 * Method to optain all user from collection  "Users" in Mongo Server
 */
export const getAllUsers = async () => {
  try {
    let userModel = userEntity();

    // Search All User
    return await userModel.find({ isDelete: false });

  } catch (error) {
    LogError(`[ORM ERROR]: Getting ALl Users: ${error}`);
  }
}


// Get User by ID
export const getUserById = async (id: string) : Promise <any | undefined> => {
  try {
    let userModel = userEntity();
    // Search User by ID
    return await userModel.findById(id);
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User by ID: ${error}`);
  }
}

// Delete User by ID
export const deleteUserById = async (id: string) : Promise <any | undefined> => {
  try {
    let userModel = userEntity();
    // Delete User by ID
    return await userModel.deleteOne({_id: id});
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting User by ID: ${error}`);
  }
}

// Create New User
export const createUser = async (user: any) : Promise <any | undefined> => {
  try {
    let userModel = userEntity();
    // Create / Insert a new User
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`);
  }
}
// Update User by ID
export const updateUserByID = async (id: string, user: any) : Promise <any | undefined> => {
  try {
    let userModel = userEntity();
    // Update User by ID
    return await userModel.findByIdAndUpdate(id, user);
  } catch (error) {
    LogError(`[ORM ERROR]: Updateing User ${id}: ${error}`);
  }
}

// TODO
// Get User by Email