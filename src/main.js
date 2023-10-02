import { VueElement, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
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
    components,
    directives,
    theme:{
        defaultTheme: 'light',
        themes: {
            myKitchenLightTheme,
        },
    }, vuetifyOptions
})

const app = createApp(App).use(store).use(router).use(vuetifyApp).mount('#app')


    



