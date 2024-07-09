import * as admin from 'firebase-admin'
import functionsTest from 'firebase-functions-test'
import { SetIncrementService } from '../../infrastructure/services/set-increment-service'
import { firestore as firestoreFunctions } from 'firebase-functions';

const test = functionsTest()

interface SutType {
  sut: SetIncrementService,
  firestoreMock: any,
  modelStub: string
}

const makeSut = (): SutType => {
  const firestoreMock = {
    collection: jest.fn().mockReturnValue({
      doc: jest.fn().mockReturnValue({
        get: jest.fn(() => Promise.resolve({exists: true, data: () => ({ value:1})})),
        set: jest.fn(),
        update: jest.fn()
      })
    })
  } as any
  
  const modelStub = 'user'
  const sut = new SetIncrementService(firestoreMock, modelStub)
  return {
    sut,
    firestoreMock,
    modelStub
  }
}

describe('Set increment Service', () => {
  it('Should set increment id', async () => {
    // const { sut, firestoreMock } = makeSut()
    // const setIncrementIdService = sut
    // const snap = test.firestore.makeDocumentSnapshot({ name: 'Test' }, 'users/1')
    // const context = { params: { docId: 1 } }

    // await setIncrementIdService.execute(snap, context)

  
    // expect(firestoreMock.collection).toHaveBeenCalledWith('metadata')
    // expect(firestoreMock.collection().doc().get).toHaveBeenCalled()
    // expect(firestoreMock.collection().doc().set).toHaveBeenCalledWith({ value: 2 })
    // expect(firestoreMock.collection().doc().update).toHaveBeenCalledWith(snap.ref, { increment_id: 2 })

  })
})