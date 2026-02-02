import "./assets/main.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vue-multiselect/dist/vue-multiselect.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faFutbol,
  faVolleyball,
  faBasketball,
  faUser,
  faUsers,
  faTrash,
  faPlus
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faFutbol,
  faVolleyball,
  faBasketball,
  faUser,
  faUsers,
  faTrash,
  faPlus
)

const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
