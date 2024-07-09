import * as admin from 'firebase-admin'
import { CreateRecordService } from '../../infrastructure/services/create-record-service'

interface SutType {
  sut: CreateRecordService,
  firestoreMock: any
}

const makeSut = (): SutType => {
  const firestoreMock = {
    collection: jest.fn().mockReturnValue({
      add: jest.fn(() => Promise.resolve({ id: '123' }))
    })
  } as any

  const sut = new CreateRecordService(firestoreMock)
  return {
    sut,
    firestoreMock
  }
}

describe('Create a record Service', () => {
  it('should create a new record', async () => {
    const { sut,  firestoreMock} = makeSut()
    const result = await sut.execute({ name: 'Test' })

    expect(result).toEqual({ id: '123', name: 'Test' })
    expect(firestoreMock.collection).toHaveBeenCalledWith('users')
    expect(firestoreMock.collection().add).toHaveBeenCalledWith({
      name: 'Test',
      createdAt: expect.any(admin.firestore.FieldValue.serverTimestamp().constructor)
    })
  })
})
