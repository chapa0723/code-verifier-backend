import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IKatasController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'

// ORM - Users Collectrion
import { deleteKataById, getAllKatas, getKataById, createKata, updateKataByID } from '../domain/orm/Katas.oem'

@Route('/api/katas')
@Tags('KatasController')
export class KatasController implements IKatasController {
  /**
   * Endpoint to retreive the Katas in the collection "Katas" of DB
   * @param {String} id  ID of Kata to retreive (optional)
   * @returns All Katas o Kata found by ID
   */
  @Get('/')
  public async getKatas (@Query()id?: string): Promise<any> {
    let response: any = ''
    if (id) {
      LogSuccess(`[/api/katas] Get Katas by ID: ${id}`)
      response = await getKataById(id)
    } else {
      LogSuccess('[/api/katas] Get All Katas Request')
      response = await getAllKatas()
    }
    return response
  }

  /**
   * Endpoint to delete a Kata from the collection "Katas" of DB
   * @param {String} id  ID of Kata to delete (optional)
   * @returns message informing if deleteion was successful
   */
  @Delete('/')
  public async deleteKata (@Query()id?: string): Promise<any> {
    let response: any = ''
    if (id) {
      await deleteKataById(id).then((r) => {
        response = {
          message: `Katas with id ${id} Delete Successfully`
        }
      })
    } else {
      LogWarning('[/api/katas] Delete Kata Request without ID')
      response = {
        message: 'Please, provide an ID to delete from DB'
      }
    }
    return response
  }

  @Post('/')
  public async createKata (kata: any): Promise<any> {
    let response: any = ''
    await createKata(kata).then((r) => {
      LogSuccess(`[/api/katas] Created Kata: ${kata}`)
      response = {
        message: `Kata created successfully: ${kata.name}`
      }
    })
    return response
  }

  @Put('/')
  public async updateKata (@Query()id: string, kata: any): Promise<any> {
    let response: any = ''
    if (id) {
      await updateKataByID(id, kata).then((r) => {
        response = {
          message: `Kata with id ${id} Updated Successfully`
        }
      })
    } else {
      LogWarning('[/api/katas] Update Kata Request without ID')
      response = {
        message: 'Please, provide an ID to Update an existing Kata'
      }
    }
    return response
  }
}
