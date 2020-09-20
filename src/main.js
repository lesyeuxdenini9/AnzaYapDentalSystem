import 'bootstrap'
import '@/assets/scss/app.scss'
require('dotenv').config()
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/route'
import store from '@/store/index'
import io from 'socket.io-client'
Vue.prototype.$mysocket = io(`${store.state.apiUrl}`, { transport : ['websocket'] })
import vueSweetalert2 from 'vue-sweetalert2'
Vue.use(vueSweetalert2)
import 'sweetalert2/dist/sweetalert2.min.css'
import VueCarousel from 'vue-carousel'
Vue.use(VueCarousel)
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
Vue.use(Chartkick.use(Chart))

import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs
Vue.prototype.$pdfMake = pdfMake

import { calculateAge, formatBdayDate , formatDate, roundToDecimal , formatHour , format12Hour, limitText , formatraw12Hour , maskspace} from "@/helper/helper"
Vue.prototype.$helper = { calculateAge, formatBdayDate , formatDate, roundToDecimal , formatHour , format12Hour, limitText , formatraw12Hour , maskspace}


import ToggleButton from 'vue-js-toggle-button'
 
Vue.use(ToggleButton)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

