import { VueElement, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
//import vuetify from './vuetify.js'

const vuetifyOptions = {}

const myKitchenLightTheme = {
    dark: false, 
    colors: {
        background: '#f6f6df',
        surface: '#A80000',
        primary: '#004DD1',
        'primary-darken-1': '#3700B3',
        secondary: '#8ee5ec',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
}

const vuetifyApp = createVuetify({
    icons: {
      defaultSet: 'mdi',
    },
    components,
    directives,
    theme:{
        defaultTheme: 'dark',
        themes: {
            myKitchenLightTheme,
        },
    }, vuetifyOptions
})

const app = createApp(App).use(store).use(router).use(vuetifyApp).mount('#app')

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

console.log(firebase);    



