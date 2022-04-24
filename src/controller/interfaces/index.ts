import { BasicResponse, GoodbyeResponse } from '../types';
import { IUser } from '../../domain/interfaces/IUser.interface';
import { IKata } from '../../domain/interfaces/IKata.interface';
export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>;
}

export interface IGoodbyeController {
    getMessage(name?:string): Promise<GoodbyeResponse>;
}

export interface IUsersController {
  // Read all users from database || get User by iD
  getUsers(page: number, limit: number, id?: string): Promise<any>
  // Get All Katas by User
  getKatas(page: number, limit: number, id?: string): Promise<any>
  // Delete User by ID
  deleteUser(id?: string): Promise<any>
  // Update User by ID
  updateUser(user: any, id: string): Promise<any>
}
export interface IAuthController {
  // Register user
  registerUser(user: IUser): Promise<any>
  // Login user
  loginUser(auth: any): Promise<any>
}

export interface IKataController {
  // Read all Katas from database || get Kata by iD
  getKatas(page: number, limit: number, id?: string): Promise<any>
  // Create KATA
  createKata(kata: IKata): Promise<any>
  // Delete Kata by ID
  deleteKata(id?: string): Promise<any>
  // Update Kata by ID
  updateKata(kata: IKata, id: string): Promise<any>
}