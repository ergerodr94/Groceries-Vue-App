import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = { 
    apiKey: "AIzaSyC6_5UcHWmpAV5EZPUXbnJrTcRL7KTrNuU",
    authDomain: "unpack-the-pantry-fc442.firebaseapp.com",
    projectId: "unpack-the-pantry-fc442",
    storageBucket: "unpack-the-pantry-fc442.appspot.com",
    messagingSenderId: "359464108209",
    appId: "1:359464108209:web:6514126bca875ebeebe290",
    measurementId: "G-78G6T9CCV3"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();


