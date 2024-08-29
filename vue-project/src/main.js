import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PokeCard from './components/PokeCard.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('cardComponent', PokeCard)

app.mount('#app')
