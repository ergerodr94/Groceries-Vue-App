import { createStore } from 'vuex'
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from '../firebase.js'
import axios from 'axios';
import firebase from 'firebase/compat/app';
import router from '@/router/index.js';
import { VueElement, onMounted, watch } from 'vue';

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    const provider = new GoogleAuthProvider();
    return firebase.auth().signInWithPopup(auth, provider);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMsg = error.message;
  })

export default createStore({
  state: {
    //Where our Data is stored. 
    show1: false,
    newUser: true, 
    household: null,
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
        .then(async (result) => {
          // Get Google Access Token
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken; 
          //Signed in user info
          state.user = result.user;

          //Write code here that will check if a user, already has a house in the database, and then 
          //retrieve that information to write to the state. 
          if(state.user.uid ){
            result = await this.dispatch('retrieveHouse');
            console.log("dispatch Result")
            console.log(result);

            //state.household = ?
          }

          console.log("result.user: see below");
          localStorage.setItem(result.user.uid, result.user);
          console.log(result.user);
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
        onAuthStateChanged(auth, (user) => {
          if(user){
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log("onAuthStateChanged: ");
          console.log(user.uid);
          } else { 
            // User is signed out
          }
        })
        //firebase:authUser:AIzaSyC6_5UcHWmpAV5EZPUXbnJrTcRL7KTrNuU:[DEFAULT]
        watch(state.user, ()=>{
          localStorage.setItem("user", JSON.stringify(userVal));
        },
        { deep:true}
        );
      
        state.user = JSON.parse(localStorage.getItem("user"));
        console.log("Get Item: " + user);
   
      },

    houseRegistered(state, houseName){
      state.newUser = false;
      state.household = houseName;
      console.log("houseRegistration: complete!")
    }
    
  },

  actions: {
    //Methods that can't change data in the state, but they can call mutations. Actions are dispached(triggered).
    async retrieveHouse(){
      const url = 'http://localhost:5001/unpack-the-pantry-fc442/us-central1/retrieveHouse/retrieveHouse'
      await axios.post(url, {
        uid: this.state.user.uid 
      }).then(response => {
        if(response.status === 200){
          this.commit('houseRegistered', response.data.houseID);
        }
      });
    }
  },

  modules: {
    
  }
})
