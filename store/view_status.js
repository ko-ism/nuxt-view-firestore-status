import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const statusRef = db.collection('status-database')

export const state = () => ({
  statuses: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('statuses', statusRef)
  }),
  remove: firestoreAction((context, id) => {
    statusRef.doc(id).delete()
  }),
  toggle: firestoreAction((context, status) => {
    statusRef.doc(status.id).update({
      done: !status.done
    })
  })
}

// export const getters = {
//   orderedStatus: state => {
//     return _.sortBy(state.status, 'timestamp')
//   }
// }