import { userEntity } from '../entities/User.entity';
import { LogSuccess, LogError } from '../../utils/logger';
import { IUser } from '../interfaces/IUser.interface';
import { IAuth } from '../interfaces/IAuth.interface';
// BCRYPT for password encryption
import bcrypt from 'bcrypt';

// Enviroment variables
import dotenv from 'dotenv';

// JWT
import jwt from 'jsonwebtoken';

// Configuration of enviroment vatiables
dotenv.config();

// Obtain the secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY';

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
  try {
    let userModel = userEntity()

    let userFound: IUser | undefined = undefined;
    let token = undefined

    // Check if user exists by email
    await userModel.findOne({ email: auth.email }).then((user: IUser) => {
      userFound = user;
    }).catch((error) => {
      console.error('[ERROR Authentication in ORM]: User not found');
      throw new Error(`[ERROR Authentication in ORM]: User not found: ${error}`);
    })

    // Check if password valida (compare with bcrypt)
    let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

    if (!validPassword) {
      console.error('[ERROR Authentication in ORM]: Password not valid');
      throw new Error('[ERROR Authentication in ORM]: Password not valid');
    }

    // Create our JWT
    token = jwt.sign({ email: userFound!.email }, secret, {
      expiresIn: '2h'
    });
    
    return {
      user: userFound,
      token: token
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`);
  }
}

// Logout user
export const logoutUser = async () : Promise <any | undefined> => {
  // TODO: NOT IMPLEMENTED
}
