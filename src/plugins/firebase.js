import firebase from 'firebase'
import 'firebase/storage'

let initFlag = false
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyA6dtql2UHUPAyyOxiE8tsoSlMzP55b604',
    authDomain: 'hashirama.firebaseapp.com',
    databaseURL: 'https://hashirama.firebaseio.com',
    projectId: 'hashirama',
    storageBucket: 'hashirama.appspot.com',
    messagingSenderId: '661599657184',
    appId: '1:661599657184:web:f797ca6c451c54069d0485'
  })
  console.log('Init Firebase')
  initFlag = true
}

const firestore = firebase.firestore()
const firestorage = firebase.storage()
const settings = { timestampsInSnapshots: true }
if (initFlag === true) {
  firestore.settings(settings)
}

export { firebase }
export { firestore }
export { firestorage }
