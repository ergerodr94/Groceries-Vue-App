import { VueElement, createApp, vuex, watch } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

//The line below checks auth state as soon as the app starts. 
store.dispatch("checkAuthState");

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

const app = createApp(App).use(store).use(vuex).use(router).use(vuetifyApp).mount('#app');




