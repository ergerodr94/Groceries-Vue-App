import { createStore } from 'vuex'
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.js'
import axios from 'axios';
import firebase from 'firebase/compat/app';
import router from '@/router/index.js';

onAuthStateChanged(auth, (user) => {
  if(user){
  // https://firebase.google.com/docs/reference/js/auth.user
  const uid = user.uid;
  console.log("uid: ", uid)
  } else { 
    // User is signed out
  }
})

export default createStore({

  state: {
    //Where our Data is stored.  
    show1: false,
    newUser: true, 
    email: "",
    user: null, 
    password: "",
    loginResponse: ""
  },

  getters: {
    //allows us to get data from our state. 
  },

  mutations: {
    //Methods that change the data in the state. Mutations are committed(triggered). 
    handleLogin(state){
      // Replace with your actual API endpoint
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // Get Google Access Token
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken; 
          console.log("Token: ", token)
          //Signed in user info
          state.user = result.user;
          router.push('/newuser');
        }).catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(credential);
        });
    },
    handleLogout(state){
      state.user = "";
    }
    
  },

  actions: {
    //Methods that can't change data in the state, but they can call mutations. Actions are dispached(triggered).
  },

  modules: {
  }
})
