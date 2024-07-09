import * as admin from 'firebase-admin'

interface CreateRecordDTO {
  name: string
}

export class CreateRecordService {
  private firestore: admin.firestore.Firestore

  constructor(firestore: admin.firestore.Firestore) {
    this.firestore = firestore
  }

  async execute({ name }: CreateRecordDTO) {
    const recordRef = await this.firestore.collection('users').add({
      name,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })

    return { id: recordRef.id, name }
  }
}
