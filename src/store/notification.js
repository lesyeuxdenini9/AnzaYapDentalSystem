import Axios from 'axios'
export default {
    namespaced: true,
    state:{
       notifications: [],
    },
    actions: {
        createMessage: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/notification/message/create`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    resolve(res)   
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        getPendingNotification: function(context,data){
            Axios.get(`${context.rootState.apiUrl}/api/notification/get/${data.admin}`,context.rootState.headerconfig)
            .then((res)=>{     
                context.commit("setNotifications",res.data.data)      
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        markasRead: function(context,idno){
            Axios.patch(`${context.rootState.apiUrl}/api/notification/markasRead/${idno}`,{},context.rootState.headerconfig)
            .then(()=>{     
                context.dispatch("getPendingNotification",{admin:1})      
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        markasReadpatient: function(context,idno){
            Axios.patch(`${context.rootState.apiUrl}/api/notification/markasReadpatient/${idno}`,{},context.rootState.headerconfig)
            .then(()=>{     
                context.dispatch("getPendingNotification",{admin:0})      
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        messageMarkasRead: function(context,idno){
            Axios.patch(`${context.rootState.apiUrl}/api/notification/messageMarkasRead/${idno}`,{},context.rootState.headerconfig)
            .then(()=>{     
                context.dispatch("getPendingNotification",{admin:0})      
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        }
    },
    getters: {
        notifs: function(state){
            let notifs = state.notifications.filter((notif)=>{
                if(notif.isAnnounce == 0) return notif
            })
            return notifs
        },
        messages: function(state){
            let messages = state.notifications.filter((notif)=>{
                if(notif.isAnnounce == 1) return notif
            })

            return messages
        }
    },
    mutations: {
        setNotifications: function(state,data){
            state.notifications = data
        }
    }
}