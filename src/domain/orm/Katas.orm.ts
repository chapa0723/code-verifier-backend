import { kataEntity } from '../entities/Katas.entity'
import { LogSuccess, LogError } from '../../utils/logger'

// Import Enviroments Variables
import dotevn from 'dotenv'
import { IKata } from '../interfaces/IKata.interface'
// Configure Enviroment Variables
dotevn.config()


// CRUD
/**
 * Method to optain all user from collection  "Users" in Mongo Server
 */
export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    let kataModel = kataEntity();

    let response: any = {}

    // Search all users (using pagination)
    await kataModel.find({isDeleted: false})
      .limit(limit)
      .skip((page - 1) * limit)
      .exec().then((katas: IKata[]) => {
        response.katas = katas;
      })

    // Count total documentos in collection "Users"
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPages = page;
    })

    return response;

  } catch (error) {
    LogError(`[ORM ERROR]: Getting ALl KATAS: ${error}`);
  }
}


// Get User by ID
export const getKataById = async (id: string) : Promise <any | undefined> => {
  try {
    let kataModel = kataEntity();
    
    // Search KATA by ID
    return await kataModel.findById(id);

  } catch (error) {
    LogError(`[ORM ERROR]: Getting Kata by ID: ${error}`);
  }
}

// Delete KATA by ID
export const deleteKataById = async (id: string) : Promise <any | undefined> => {
  try {
    let kataModel = kataEntity();
    // Delete KATA by ID
    return await kataModel.deleteOne({_id: id});
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting KATA by ID: ${error}`);
  }
}

// Create New User
export const createKata = async (kata: IKata) : Promise <any | undefined> => {
  try {
    let kataModel = kataEntity()
    // Create / Insert a new KATA
    return await kataModel.create(kata)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating KATA: ${error}`);
  }
}

// Update KATA by ID
export const updateKataByID = async (id: string, kata: IKata) : Promise <any | undefined> => {
  try {
    let kataModel = kataEntity();
    // Update KATa by ID
    return await kataModel.findByIdAndUpdate(id, kata);
  } catch (error) {
    LogError(`[ORM ERROR]: Updateing Kata ${id}: ${error}`);
  }
}
