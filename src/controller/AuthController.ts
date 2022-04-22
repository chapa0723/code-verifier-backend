/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IAuthController } from './interfaces/index'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// Import ORM for Auth
import { registerUser, loginUser, logoutUser, getUserById } from '../domain/orm/User.orm'
import { AuthResponse, ErrorResponse } from './types'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  @Post('/register')
  public async registerUser(user: IUser): Promise<any> {
    
    let response: any = '';
    
    if (user) {
      LogSuccess(`[/api/auth/register] Register User: ${user.email}`);
      await registerUser(user).then((r) => {
        LogSuccess(`[/api/auth/register] Register User: ${user.email}`);
        response = {
          status: 204, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
          message: `User created successfully: ${user.name}`
        }
      });
    } else {
      LogWarning('[/api/auth/register] Register needs a user entity');
      response = {
        status: 400, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
        message: 'Please, provide an User Entity to create one'
      }
    }
    
    return response;
  }

  @Post('/login')
  public async loginUser(auth: IAuth): Promise<any> {

    let response: AuthResponse | ErrorResponse | undefined

    if (auth) {
      // await loginUser(auth).then((r) => {
      LogSuccess(`[/api/auth/login] Login User: ${auth.email} `);
      let data = await loginUser(auth)
      response = {
        token: data.token,
        message: `Welcome ${data.user.name}` 
      }
    } else {
      LogWarning('[/api/auth/login] Register needs a auth entity (email and password)');
      response = {
        error: '[AUTH ERROR]: Email and Password are required',
        message: 'Please, provide email and password to login'
      }
    }

    return response;
  }

  /**
   * Endpoint to retreive the user in the collection "Users" of DB
   * Middleware: Validate JWT
   * In the header you must add the x-access-token with a valid JWT
   * @param {String} id  ID of user to retreive (optional)
   * @returns All users o user found by ID
   */
  @Get('/me')
  public async userData(@Query()id: string): Promise<any> {
    let response: any = '';
    if (id) {
      LogSuccess(`[/api/users] Get User Data by ID: ${id}`);
      response = await getUserById(id);
      // Remove the password from the response
      // response.password = ''
    } 
    return response;
  }

  @Post('/logout')
  public async logoutUser(): Promise<any> {

    let response: any = '';

    // TODO: Close Session of user
    throw new Error('Method not implemented.')
  }
}
