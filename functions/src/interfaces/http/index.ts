import express from 'express'
import { CreateRecordController } from '../../infrastructure/controller/create-record-controller'
import { setupSwagger } from './swagger'


const app = express()
const createRecordController = new CreateRecordController();

app.use(express.json());
app.post('/createRecord', (req, res) => createRecordController.createRecord(req, res))

setupSwagger(app)

export default app
