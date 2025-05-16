import './assets/main.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia' // Import Pinia

import App from './App.vue'
import router from './router'

import VueApexCharts from 'vue3-apexcharts'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueApexCharts)

app.mount('#app')
