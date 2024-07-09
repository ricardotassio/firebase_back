import { Request, Response } from 'express'
import { CreateRecordService } from '../services/create-record-service'
import * as admin from 'firebase-admin'

export class CreateRecordController {
  private createRecordService: CreateRecordService

  constructor() {
    const firestore = admin.firestore()
    this.createRecordService = new CreateRecordService(firestore)
  }

  async createRecord(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body

      if (!name) {
        return res.status(400).send({ error: 'Name is required' })
      }

      const result = await this.createRecordService.execute({ name })
      return res.status(201).send(result)
    } catch (error) {
      console.error(error)
      return res.status(500).send({ error: 'Internal Server Error' })
    }
  }
}
