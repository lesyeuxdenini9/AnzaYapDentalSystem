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

import { calculateAge, formatBdayDate , formatDate, roundToDecimal , formatHour , format12Hour, limitText , formatraw12Hour , maskspace} from "@/helper/helper"
Vue.prototype.$helper = { calculateAge, formatBdayDate , formatDate, roundToDecimal , formatHour , format12Hour, limitText , formatraw12Hour , maskspace}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

