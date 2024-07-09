import * as functions from 'firebase-functions'
import app from './interfaces/http/index'
import * as admin from 'firebase-admin'
admin.initializeApp()

export const api = functions.https.onRequest(app)