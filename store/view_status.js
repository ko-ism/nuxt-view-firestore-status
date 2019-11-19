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
  }),
  popup: firestoreAction((context) => {
    statusRef.onSnapshot(function(snapshot){
      snapshot.docChanges().forEach(function(change){
        if (change.type === "added"){
          alert("ドキュメントが追加されました。\r\nIDは、" + change.doc.id + "です。")
        }
        if (change.type === "modified"){
          alert("ドキュメントが変更されました。\r\nIDは、" + change.doc.id + "です。")
        }
        if (change.type === "removed"){
          alert("ドキュメントが削除されました。\r\nIDは、" + change.doc.id + "です。")
        }
      })
    })
  })
}

// export const getters = {
//   orderedStatus: state => {
//     return _.sortBy(state.statuses, 'timestamp')
//   }
// }