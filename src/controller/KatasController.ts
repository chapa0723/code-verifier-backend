import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IKataController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'

// ORM - Katas Collectrion
import { deleteKataById, getAllKatas, getKataById, createKata, updateKataByID } from '../domain/orm/Katas.orm'
import { IKata } from '@/domain/interfaces/IKata.interface'
import { query } from 'express'

@Route('/api/katas')
@Tags('KatasController')
export class KatasController implements IKataController {
  /**
   * Endpoint to retreive the kata in the collection "Katas" of DB
   * @param {String} id  ID of kata to retreive (optional)
   * @returns All katas o kata found by ID
   */
  @Get('/')
  public async getKatas (@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {
    let response: any = '';
    if (id) {
      LogSuccess(`[/api/katas] Get Kata by ID: ${id}`);
      response = await getKataById(id);
    } else {
      LogSuccess('[/api/katas] Get All Katas Request');
      response = await getAllKatas(page, limit);
    }
    return response;
  }

  /**
   * Endpoint to delete a kata from the collection "Katas" of DB
   * @param {String} id  ID of kata to delete (optional)
   * @returns message informing if deleteion was successful
   */
  @Delete('/')
  // eslint-disable-next-line padded-blocks
  public async deleteKata (@Query()id?: string): Promise<any> {
    // eslint-disable-next-line no-trailing-spaces
    
    let response: any = '';

    if (id) {
      await deleteKataById(id).then((r) => {
        response = {
          status: 204, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
          message: `Kata with id ${id} Delete Successfully`
        }
      })
    } else {
      LogWarning('[/api/katas] Delete Kata Request without ID');
      response = {
        status: 400, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
        message: 'Please, provide an ID to delete from DB'
      }
    }
    return response
  }

  @Put('/')
  public async updateKata (kata: IKata, @Query()id: string): Promise<any> {
    let response: any = '';
    if (id) {
      await updateKataByID(id, kata).then((r) => {
        response = {
          status: 204, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
          message: `Kata with id ${id} Updated Successfully`
        }
      })
    } else {
      LogWarning('[/api/katas] Update Kata Request without ID');
      response = {
        status: 400, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
        message: 'Please, provide an ID to Update an existing Kata'
      }
    }
    return response
  }

  @Post('/')
  public async createKata(kata: IKata): Promise<any> {
    let response: any = '';  
    if (kata) {
      LogSuccess(`[/api/katas] Create New Kata: ${kata.name}`);
      await createKata(kata).then((r) => {
        LogSuccess(`[/api/katas] Created Kata: ${kata.name}`);
        response = {
          status: 204, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
          message: `Kata created successfully: ${kata.name}`
        }
      });
    } else {
      LogWarning('[/api/kata] Register needs a kata entity');
      response = {
        status: 400, // Es importante tenerlo en cuenta para la correcta interpretacion de la respuesta
        message: 'Please, provide an Kata Entity to create one'
      }
    }

    return response;
  }
}
