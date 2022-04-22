import { BasicResponse, GoodbyeResponse } from '../types';
import { IUser } from '../../domain/interfaces/IUser.interface';
export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>;
}

export interface IGoodbyeController {
    getMessage(name?:string): Promise<GoodbyeResponse>;
}

export interface IUsersController {
  // Read all users from database || get User by iD
  getUsers(page: number, limit: number, id?: string): Promise<any>
  // Delete User by ID
  deleteUser(id?: string): Promise<any>
  // Update User by ID
  updateUser(user: any, id: string): Promise<any>
}

export interface IKatasController {
  // Read all katas from database || get User by iD
  getKatas(id?: string): Promise<any>
  // Delete User by ID
  deleteKata(id?: string): Promise<any>
  // Create New User
  createKata(kata: any): Promise<any>
  // Update User by ID
  updateKata(kata: any, id: string): Promise<any>
}

export interface IAuthController {
  // Register user
  registerUser(user: IUser): Promise<any>
  // Login user
  loginUser(auth: any): Promise<any>
}
