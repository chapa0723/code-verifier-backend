import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IAuthController } from './interfaces/index'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// Import ORM for Auth
import { registerUser, loginUser, logoutUser } from '../domain/orm/User.orm'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  @Post('/register')
  public async registerUser(user: IUser): Promise<any> {
    let response: any = '';
    if (user) {
      LogSuccess(`[/api/auth/register] Register User: ${user}`);
      await registerUser(user).then((r) => {
        LogSuccess(`[/api/auth/register] Register User: ${user}`);
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
    let response: any = '';
    if (auth) {
      await loginUser(auth).then((r) => {
        LogSuccess(`[/api/auth/login] Login User: ${auth.email}`);
        response = {
          status: 204, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
          message: `User Login successfully: ${auth.email}`,
          token: r.token // JWT genereated for logeed user
        }
      });
    } else {
      LogWarning('[/api/auth/login] Register needs a auth entity (email and password)');
      response = {
        status: 400, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
        message: 'Please, provide email and password to login'
      }
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