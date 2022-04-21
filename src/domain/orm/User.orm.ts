import { userEntity } from '../entities/User.entity';
import { LogSuccess, LogError } from '../../utils/logger';
import { IUser } from '../interfaces/IUser.interface';
import { IAuth } from '../interfaces/IAuth.interface';
// BCRYPT for password encryption
import bcrypt from 'bcrypt';

// JWT
import jwt from 'jsonwebtoken';

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
    let userModel = userEntity()
    // Create / Insert a new User
    return await userModel.create(user)
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

// Register user
export const registerUser = async (user: IUser) : Promise <any | undefined> => {
  // TODO: NOT functional yet
  try {
    let userModel = userEntity()
    // Create / Insert a new User
    return await userModel.create(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`);
  }
}

// Login user
export const loginUser = async (auth: IAuth) : Promise <any | undefined> => {
  // TODO: NOT IMPLEMENTED
  try {
    let userModel = userEntity()
    // Find User by email
    userModel.findOne({email: auth.email}, (err: any, user: IUser) => {
      if (err) {
        LogError(`[ORM ERROR]: (500) Login User: ${err}`);
      }
      if (!user) {
        LogError('[ORM ERROR]: Login User: User not found (404)');
      }
      // Use bcrypt to compare password
      let validPassword = bcrypt.compareSync(auth.password, user.password);
      if (!validPassword) {
        LogError('[ORM ERROR]: Login User: Invalid password (401)');
      }
      // Create JWT
      // TODO: SECRET must be in .env
      let token = jwt.sign({email: user.email}, 'MYSECRETWORD',{
        expiresIn: "2h"
      });

      return token;

    });


    // TODO: Create json web token

  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`);
  }
}

// Logout user
export const logoutUser = async () : Promise <any | undefined> => {
  // TODO: NOT IMPLEMENTED
}
