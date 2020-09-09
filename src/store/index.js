import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)

import user from "./user"
import dashboard from "./dashboard"
import service from "./service"
import dentist from "./dentist"
import medicine from "./medicine"
import transaction from "./transaction"
import reservation from "./reservation"
import notification from "./notification"
import branch from "./branch"
import feedback from "./feedback"
import report from "./report"


export default new Vuex.Store({
    // namespaced: true,
    modules: {
            user,
            dashboard,
            service,
            dentist,
            medicine,
            transaction,
            reservation,
            notification,
            branch,
            feedback,
            report
    },
    state: {
        islogin: localStorage.getItem('islogin') || false,
        accesstoken: localStorage.getItem('accesstoken') || null,
        refreshtoken: localStorage.getItem('refreshtoken') || null,
        userinfo: localStorage.getItem('userinfo') || null,
        headerconfig: {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
            }
        },

        apiUrl: "https://anza-yap-backend.herokuapp.com",
        imgUrl: "https://dentalthesisphotostorage.000webhostapp.com/dentalPublic/uploads",
        //imgUrl: "http://localhost:8080/public/images/patients",
        //apiUrl: "http://localhost:8080",
        schedules: [],
    },
    getters: {

    },
    actions: {
        activenav: function(context,data){
            // const navs = document.querySelectorAll("ul li")
            const navs = document.getElementsByClassName("nav-item")
            navs.forEach((nav)=>{
                nav.classList.remove("active")
            })
            const dropdowncontents = document.getElementsByClassName("dropdownItem")
            dropdowncontents.forEach((dropdown)=>{
                dropdown.style.background="white"
                dropdown.style.color = "#007BFF"
                dropdown.style.fontWeight = "normal"
            })
            document.getElementById(`${data}`).classList.add("active")
        },
        authenticated: function(context,data){
            localStorage.setItem('accesstoken',data.data.accesstoken)
            localStorage.setItem('refreshtoken',data.data.refreshtoken)
            localStorage.setItem('userinfo',JSON.stringify(data.data.user))
            localStorage.setItem('islogin',true)
            if(data.data.user.usertype == 0)  localStorage.setItem("isadmin",true) 
            if(data.data.user.usertype == 1)  localStorage.setItem("isstaff",true)
            if(data.data.user.usertype == 3)  localStorage.setItem("issuperadmin",true)
            context.commit('changetokenstate',data.data)
            context.commit('changeislogin',{status: true})
        },
        login: function(context,data){
            return new Promise((resolve,reject)=>{
         
                   axios.post(`${context.state.apiUrl}/api/auth/login`,data)
                   .then((res)=>{
                      
                        resolve(res)
                   })
                   .catch(err=>reject(err))
              
            })


           
        },
        logout: function(context){

                axios.delete(`${context.state.apiUrl}/api/auth/logout`,context.state.headerconfig)
                .then(()=>{
                    localStorage.removeItem('accesstoken')
                    localStorage.removeItem('refreshtoken')
                    localStorage.removeItem('userinfo')
                    localStorage.removeItem('islogin')
                    localStorage.removeItem('isadmin')
                    localStorage.removeItem('isstaff')
                    localStorage.removeItem('issuperadmin')
                    context.commit('changeislogin',{status: false})  
                })
                .catch((err)=>{
                    console.log(err)
                    // if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    //     context.dispatch("refreshtoken")
                    // }     
                    localStorage.removeItem('accesstoken')
                    localStorage.removeItem('refreshtoken')
                    localStorage.removeItem('userinfo')
                    localStorage.removeItem('islogin')
                    localStorage.removeItem('isadmin')
                    localStorage.removeItem('isstaff')
                    localStorage.removeItem('issuperadmin')
                    context.commit('changeislogin',{status: false})        
                })
   
           
        },

    
        refreshtoken:function(context){
            // console.log(context.state.refreshtoken)
         
                axios.post(`${context.state.apiUrl}/api/auth/refreshtoken`,{refreshtoken: context.state.refreshtoken})
                .then((res)=>{
                    console.log(res)
                    context.dispatch("authenticated",res)
                    window.location.reload()
                 
                })
                .catch(err=>{
                    if(((err.response.status == 403 || err.response.status == 401) && err.response.data.msg)){
                       context.dispatch("logout")
                       window.location.href = "/"
                    }
                    
                }
                )
      
        },
        sendreset: function(context,data){
            return new Promise((resolve,reject)=>{
                axios.post(`${context.state.apiUrl}/api/auth/sendResetLink`,data)
                .then((res)=>{
                     resolve(res)
                })
                .catch(err=>reject(err))
            })
        },
        changepass: function(context,data){
            return new Promise((resolve,reject)=>{
                axios.post(`${context.state.apiUrl}/api/auth/changepass`,data)
                .then((res)=>{
                     resolve(res)
                })
                .catch(err=>reject(err))
            })
        },
        getSchedules: function(context,branchid){
            return new Promise((resolve,reject)=>{
                axios.get(`${context.state.apiUrl}/api/getSchedules/${branchid}`,context.state.headerconfig)
                .then((res)=>{
                    context.commit("setSchedules",res.data.data)
                    resolve(res)
                })
                .catch((err)=>{
                    reject(err)
                })
            })
        
        },
        updateSchedule: function(context,data){
            axios.post(`${context.state.apiUrl}/api/updateSchedule`,data,context.state.headerconfig)
            .then(()=>{
                context.dispatch("getSchedules")
            })
            .catch(err=>console.log(err))
        }

    },
    mutations: {
        changeislogin: function(state,data){
           state.islogin = data.status
        },
        changetokenstate: function(state,data){
            state.accesstoken = data.accesstoken
            state.refreshtoken = data.refreshtoken
            state.headerconfig.headers.Authorization = `Bearer ${data.accesstoken}`
            state.userinfo = JSON.stringify(data.user)
        },
        setSchedules: function(state,data){
            state.schedules = data
        },

       
    }

});
