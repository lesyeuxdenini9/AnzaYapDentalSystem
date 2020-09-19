import Axios from "axios"
// import staff from "./staff"
export default {
    namespaced: true,
    // modules:{
    //     staff
    // },
    state: {
        users: [],
        userinfo: {},
        patients: [],
    },
    actions: {
        getUsers: function(context,{usertype}){
                    Axios.get(`${context.rootState.apiUrl}/api/user/list/${usertype}`,context.rootState.headerconfig)
                    .then((res)=>{     

                            context.commit('setuser',res.data.data)          
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                        }               
                    })
        },
        getUsersbyArchive: function(context,{usertype,archive}){
            Axios.get(`${context.rootState.apiUrl}/api/user/list/${usertype}/${archive}`,context.rootState.headerconfig)
            .then((res)=>{     

                    context.commit('setuser',res.data.data)          
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        getUserinfo: function(context,idno){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/user/details/${idno}`,context.rootState.headerconfig)
                    .then((res)=>{      
                            context.commit('setUserinfo',res.data.data)        
                            resolve(res)  
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                        }
                        reject(err)               
                    })
            }) 
        },  
        searchUser: function(context,data){

            return new Promise((resolve,reject)=>{

                setTimeout(()=>{
                      Axios.get(`${context.rootState.apiUrl}/api/user/getList/${data}`,context.rootState.headerconfig)
                      .then((res)=>{     
                              context.commit('setuser',res.data.data)     
                              resolve(res)         
                      })
                      .catch((err)=>{
                          if(err.response.status == 401 && err.response.data == "Unauthorized"){
                              context.dispatch("refreshtoken",null,{root:true})
                          }               
                          reject(err)
                      })
                },300)
  
            })
            
        },
        addpatient: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/user/addpatient`,data,context.rootState.headerconfig)
                .then((res)=>{     
                            resolve(res)
                            if(!res.data.errors) context.commit("updateList",res.data)
                           
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        saveuser: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/user/save`,data,context.rootState.headerconfig)
                .then((res)=>{     
                            resolve(res)
                            if(!res.data.errors) context.commit("updateList",res.data)
                           
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        saveuser_superadmin: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/user/saveuser_superadmin`,data,context.rootState.headerconfig)
                .then((res)=>{     
                            resolve(res)
                            if(!res.data.errors) context.commit("updateList",res.data)
                           
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        registeruser: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/user/register`,data,context.rootState.headerconfig)
                .then((res)=>{     
                            resolve(res)
                            if(!res.data.errors) context.commit("updateList",res.data)
                           
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        archiveList: function(context,data){
            Axios.patch(`${context.rootState.apiUrl}/api/user/archive/${data.id}/${data.archivestatus}`,data,context.rootState.headerconfig)
            .then((res)=>{
                if(res.data=="archived") context.commit("removeUser",data.index)
            })  
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }   
            })
        },
        changepassEmployee: function(context,data){
                return new Promise((resolve,reject)=>{
                    Axios.patch(`${context.rootState.apiUrl}/api/user/changepassEmployee/${data.id}`,data,context.rootState.headerconfig)
                    .then((res)=>{
                        resolve(res)
                        if(!res.data.errors) context.commit("updateUser",{user: res.data,index: data.index})
                    })  
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                        }   
                        reject(err)
                    })
                })
        },
        changepass: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/user/changepass/${data.id}`,data,context.rootState.headerconfig)
                .then((res)=>{
                    resolve(res)
                    if(!res.data.errors) context.commit("updateUser",{user: res.data,index: data.index})
                })  
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }   
                    reject(err)
                })
            })
        },
        changepic: function(context,data){
            const userinfo = JSON.parse(context.rootState.userinfo)
            let fd = new FormData
            fd.append("imgfile",data.imgfile)
            fd.append("id",userinfo.id)
            fd.append("oldimg",data.oldimg)
            const headerconfig = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${context.rootState.accesstoken}`,
                }
            }
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/user/changepic`,fd,headerconfig)
                    .then((res)=>{
                      return res
                    })
                    .then(()=>{
                        
                        Axios.post('https://dentalthesisphotostorage.000webhostapp.com/dentalPublic/upload.php',fd, {
                        headers: {
                            'content-type': 'multipart/form-data',
                            'Accept': 'application/json',
                            }
                        }).then((response)=>{
                            resolve(response)
                        })
                    
                    }
                        
                    )
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                        }   
                        reject(err)            
                    })
            })

        },
        updateUser: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/user/update/${data.id}`,data,context.rootState.headerconfig)
                .then((res)=>{
                    resolve(res)
                    if(!res.data.errors) context.commit("updateUser",{user: res.data,index: data.index})
                })  
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }   
                    reject(err)
                })
            })
        },
        updateuser_superadmin: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/user/updateuser_superadmin/${data.id}`,data,context.rootState.headerconfig)
                .then((res)=>{
                    resolve(res)
                    if(!res.data.errors) context.commit("updateUser",{user: res.data,index: data.index})
                })  
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }   
                    reject(err)
                })
            })
        },
        searchPatient: function(context,data){
            Axios.post(`${context.rootState.apiUrl}/api/user/searchPatient`,data,context.rootState.headerconfig)
            .then((res)=>{     
                context.commit("setPatient",res.data.data)           
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        search: function(context,data){
            Axios.post(`${context.rootState.apiUrl}/api/user/search`,data,context.rootState.headerconfig)
            .then((res)=>{     
                context.commit("branch/setUsers",{data: res.data.data,index: data.branchindex},{root: true})            
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
              
        },
        searchSuperadmin: function(context,data){
            Axios.post(`${context.rootState.apiUrl}/api/user/search`,data,context.rootState.headerconfig)
            .then((res)=>{     
                context.commit("setuser",res.data.data)            
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        changearchivestatus: function(context,data){
            Axios.post(`${context.rootState.apiUrl}/api/user/changearchivestatus`,data,context.rootState.headerconfig)
            .then(()=>{     
               
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        }
    },
    getters: {
        users: function(state){
            return state.users
        },
        pendingTransaction: function(state){
            let pending = []
            state.userinfo.Transactions.forEach((transaction)=>{
               if(transaction.status == 0 || transaction.status == 1){
                 pending.push(transaction)
               }
            })
            
            return pending
        },
        doneTransaction: function(state){
            let done = []
            state.userinfo.Transactions.forEach((transaction)=>{
                if(transaction.status != 0 && transaction.status != 1){
                   done.push(transaction)
                }
             })
             
             return done
        },
        activeReservation: function(state){
            let active = []
            state.userinfo.Reservations.forEach((reservation)=>{
                if(reservation.status == 1){
                    active.push(reservation)
                }
            })

            return active
        }
    },
    mutations: {
        setuser: function(state,data){
            state.users = data
        },
        setUserinfo: function(state,data){
            state.userinfo = data
        },
        updateList: function(state,data){
            state.users.push(data)
        },
        removeUser: function(state,index){
            state.users.splice(index,1)
        },
        updateUser: function(state,data){
            state.users[data.index] = data.user
        },
        setPatient: function(state,data){
            state.patients = data
        }
    }

}