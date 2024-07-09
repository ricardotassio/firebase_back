import * as admin from 'firebase-admin'
import { firestore as firestoreFunctions, EventContext } from 'firebase-functions'


export class SetIncrementService {
  private firestore: admin.firestore.Firestore
  private model: string

  constructor(firestore: admin.firestore.Firestore, model: string) {
    this.firestore = firestore
    this.model = model
  }

  async execute(snap: firestoreFunctions.QueryDocumentSnapshot, context: EventContext) {
    const newValue = snap.data()
    const incrementIdRef = this.firestore.collection(this.model).doc('increment_id')

    await this.firestore.runTransaction(async (transaction) => {
      const doc = await transaction.get(incrementIdRef)
      let nextIncrementId = 1

      if (doc.exists) {
        const currentIncrementId = doc.data()?.value || 0
        nextIncrementId = currentIncrementId + 1
      }

      transaction.set(incrementIdRef, { value: nextIncrementId })
      transaction.update(snap.ref, { increment_id: nextIncrementId })
    })
  }
}
