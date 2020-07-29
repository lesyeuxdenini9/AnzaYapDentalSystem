import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import adminroutes from "./admin"
import patientroutes from "./patient"

const routes = []

adminroutes.routes.forEach((r)=>{
	routes.push(r)
})

patientroutes.routes.forEach((r)=>{
	routes.push(r)
})

import NotFound from "@/components/NotFoundComponent"

routes.push({path: '*',component: NotFound})

export default new VueRouter(
    { 
        mode:'history',
        hash: false,
        routes
    }
) 
    