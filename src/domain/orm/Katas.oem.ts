import { katasEntity } from '../entities/Katas.entity';
import { LogSuccess, LogError } from '../../utils/logger';

// CRUD
/**
 * Method to optain all user from collection  "Users" in Mongo Server
 */
export const GetAllUsers = async () => {
  try {
    let katasModel = katasEntity();


    // Search All User
    return await katasModel.find({ isDelete: false });

  } catch (error) {
    LogError(`[ORM ERROR]: Getting ALl Users: ${error}`);
    
  }
}