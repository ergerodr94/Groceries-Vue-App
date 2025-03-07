import { initializeApp } from 'firebase/app';

import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { connectStorageEmulator, getStorage} from 'firebase/storage';
import { connectAuthEmulator } from 'firebase/auth';

//https://www.youtube.com/watch?v=gA6WGYQWrKc
const firebaseConfig = { 
    apiKey: "AIzaSyC6_5UcHWmpAV5EZPUXbnJrTcRL7KTrNuU",
    authDomain: "unpack-the-pantry-fc442.firebaseapp.com",
    projectId: "unpack-the-pantry-fc442",
    storageBucket: "unpack-the-pantry-fc442.appspot.com",
    messagingSenderId: "359464108209",
    appId: "1:359464108209:web:6514126bca875ebeebe290",
    measurementId: "G-78G6T9CCV3"
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

if (process.env.VUE_APP_USE_AUTH_EMULATOR === "true"){
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

if (process.env.VUE_APP_USE_FIRESTORE_EMULATOR === "true"){
    connectFirestoreEmulator(db, "http://127.0.0.1", 8080);
}







