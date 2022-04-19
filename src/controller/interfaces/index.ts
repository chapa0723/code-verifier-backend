import { BasicResponse, GoodbyeResponse } from '../types';

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>;
}

export interface IGoodbyeController {
    getMessage(name?:string): Promise<GoodbyeResponse>;
}

export interface IUsersController {
  // Read all users from database || get User by iD
  getUsers(id?: string): Promise<any>
  // Delete User by ID
  deleteUser(id?: string): Promise<any>
  // Create New User
  createUser(user: any): Promise<any>
  // Update User by ID
  updateUser(user: any, id: string): Promise<any>
}
