import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IUsersController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'

// ORM - Users Collectrion
import { deleteUserById, getAllUsers, getUserById, createUser, updateUserByID } from '../domain/orm/User.orm'
import { userEntity } from '../domain/entities/User.entity';

@Route('/api/users')
@Tags('UsersController')
export class UsersController implements IUsersController {
  /**
   * Endpoint to retreive the user in the collection "Users" of DB
   * @param {String} id  ID of user to retreive (optional)
   * @returns All users o user found by ID
   */
  @Get('/')
  public async getUsers(@Query()id?: string): Promise<any> {
    let response: any = '';
    if (id) {
      LogSuccess(`[/api/users] Get User by ID: ${id}`);
      response = await getUserById(id);
    } else {
      LogSuccess('[/api/users] Get All Users Request');
      response = await getAllUsers();
    }
    return response;
  }

  /**
   * Endpoint to delete a user from the collection "Users" of DB
   * @param {String} id  ID of user to delete (optional)
   * @returns message informing if deleteion was successful
   */
  @Delete('/')
  public async deleteUser(@Query()id?: string): Promise<any> {
    let response: any = '';
    if (id) {
      await deleteUserById(id).then((r) => {
        response = {
          status: 204, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
          message: `User with id ${id} Delete Successfully`
        }
      })
    } else {
      LogWarning('[/api/users] Delete User Request without ID');
      response = {
        status: 400, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
        message: 'Please, provide an ID to delete from DB'
      }
    }
    return response
  }
  
  @Post('/')
  public async createUser(user: any): Promise<any> {
    let response: any = '';
    await createUser(user).then((r) => {
      LogSuccess(`[/api/users] Created User: ${user}`);
      response = {
        status: 204, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
        message: `User created successfully: ${user.name}`
      }
    })
    return response;
  }

  @Put('/')
  public async updateUser (@Query()id: string, user: any): Promise<any> {
    let response: any = '';
    if (id) {
      await updateUserByID(id, user).then((r) => {
        response = {
          status: 204, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
          message: `User with id ${id} Updated Successfully`
        }
      })
    } else {
      LogWarning('[/api/users] Update User Request without ID');
      response = {
        status: 400, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
        message: 'Please, provide an ID to Update an existing user'
      }
    }
    return response
  }
}
