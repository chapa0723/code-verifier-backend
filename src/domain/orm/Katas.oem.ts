import { katasEntity } from '../entities/Katas.entity'
import { LogSuccess, LogError } from '../../utils/logger'

// CRUD
/**
 * Method to optain all Katas from collection  "Katas" in Mongo Server
 */
export const getAllKatas = async () => {
  try {
    let katasModel = katasEntity()

    // Search All Katas
    return await katasModel.find({ isDelete: false })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting ALl Katas: ${error}`)
  }
}

// Get Kata by ID
export const getKataById = async (id: string) : Promise <any | undefined> => {
  try {
    let katasModel = katasEntity()
    // Search Katas by ID
    return await katasModel.findById(id)
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Kata by ID: ${error}`)
  }
}

// Delete Kata by ID
export const deleteKataById = async (id: string) : Promise <any | undefined> => {
  try {
    let katasModel = katasEntity()
    // Delete Kata by ID
    return await katasModel.deleteOne({_id: id})
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting Kata by ID: ${error}`)
  }
}

// Create New Kata
export const createKata = async (kata: any) : Promise <any | undefined> => {
  try {
    let katasModel = katasEntity()
    // Create / Insert a new Kata
    return await katasModel.create(kata)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating Kata: ${error}`)
  }
}
// Update Kata by ID
export const updateKataByID = async (id: string, kata: any) : Promise <any | undefined> => {
  try {
    let katasModel = katasEntity()
    // Update Kata by ID
    return await katasModel.findByIdAndUpdate(id, kata)
  } catch (error) {
    LogError(`[ORM ERROR]: Updateing Kata ${id}: ${error}`)
  }
}

// TODO
// Get Kata by valoration