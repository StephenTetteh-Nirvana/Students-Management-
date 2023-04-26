import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import{getFirestore,collection} from 'firebase/firestore'

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";


const firebaseConfig = {

  apiKey: "AIzaSyAfWHMI_JjXXjDlgcsGCN9J5TN1klpkXGA",

  authDomain: "payment-form-34f25.firebaseapp.com",

  projectId: "payment-form-34f25",

  storageBucket: "payment-form-34f25.appspot.com",

  messagingSenderId: "1040352949790",

  appId: "1:1040352949790:web:e67579251a1f9e38a8a00f"

};


// Initialize Firebase

initializeApp(firebaseConfig);

const db=getFirestore()
const ColRef=collection(db,"students-data")
export default ColRef;


createApp(App)
.use(router)
.mount('#app')
