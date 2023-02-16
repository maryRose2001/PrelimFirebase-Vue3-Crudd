import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: "AIzaSyAk8l9tpgAE5Bk68EV1kVvCo13ZhRVWHuo",
  authDomain: "contact-app-11b22.firebaseapp.com",
  projectId: "contact-app-11b22",
  storageBucket: "contact-app-11b22.appspot.com",
  messagingSenderId: "683773867307",
  appId: "1:683773867307:web:32ada9ab3cf909966f016e",
  measurementId: "G-BTW4QKB9ZM"
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const contactsCollection = db.collection('contacts')

export const createContact = contact => {
  return contactsCollection.add(contact)
}

export const getContact = async id => {
  const contact = await contactsCollection.doc(id).get()
  return contact.exists ? contact.data() : null
}

export const updateContact = (id, contact) => {
  return contactsCollection.doc(id).update(contact)
}

export const deleteContact = id => {
  return contactsCollection.doc(id).delete()
}

export const useLoadContacts = () => {
  const contacts = ref([])
  const close = contactsCollection.onSnapshot(snapshot => {
    contacts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return contacts
}
