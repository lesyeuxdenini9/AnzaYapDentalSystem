import Axios from "axios"
export default {
    namespaced: true,
    state: {
        branches: [],
        branch: {},
    },
    actions: {
        search: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/branch/search/${data}`,context.rootState.headerconfig)
                    .then((res)=>{     
                        context.commit("setList",res.data.data) 
                        resolve(res.data.data)       
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                            reject(err)
                        }               
                    })
                })
        },
        getPublicList: function(context){
         
                Axios.get(`${context.rootState.apiUrl}/api/branch/publicList`,context.rootState.headerconfig)
                    .then((res)=>{     
                        context.commit("setList",res.data.data)   
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                     
                        }               
                    })
        },
        getList: function(context){
            return new Promise((resolve,reject)=>{
            Axios.get(`${context.rootState.apiUrl}/api/branch/list`,context.rootState.headerconfig)
                .then((res)=>{     
                    context.commit("setList",res.data.data) 
                    resolve(res.data.data)       
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        getListUser: function(context,usetype){
            return new Promise((resolve,reject)=>{
            Axios.get(`${context.rootState.apiUrl}/api/branch/getListUser/${usetype}`,context.rootState.headerconfig)
                .then((res)=>{     
                    context.commit("setList",res.data.data) 
                    resolve(res.data.data)       
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        getListService: function(context){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/branch/getListService`,context.rootState.headerconfig)
                    .then((res)=>{     
                        context.commit("setList",res.data.data) 
                        resolve(res.data.data)       
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                            reject(err)
                        }               
                    })
                })
        },
        getListDentist: function(context){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/branch/getListDentist`,context.rootState.headerconfig)
                    .then((res)=>{     
                        context.commit("setList",res.data.data) 
                        resolve(res.data.data)       
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                            reject(err)
                        }               
                    })
                })
        },
        getListMedicine: function(context,type){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/branch/getListMedicine/${type}`,context.rootState.headerconfig)
                    .then((res)=>{     
                        context.commit("setList",res.data.data) 
                        resolve(res.data.data)       
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                            reject(err)
                        }               
                    })
                })
        },
        getListAllInfo: function(context){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/branch/getListAllInfo`,context.rootState.headerconfig)
                    .then((res)=>{     
                        context.commit("setList",res.data.data) 
                        resolve(res.data.data)       
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                            reject(err)
                        }               
                    })
                })
        },

        getInfo: function(context,idno){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/branch/getInfo/${idno}`,context.rootState.headerconfig)
                    .then((res)=>{     
                        context.commit("setBranch",res.data.data) 
                        resolve(res.data.data)       
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                            reject(err)
                        }               
                    })
                })
        },

        save: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/branch/save`,data,context.rootState.headerconfig)
                .then((res)=>{     
                            resolve(res)
                            if(!res.data.errors) context.commit("addList",res.data)
                           
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        remove: function(context,data){
            Axios.patch(`${context.rootState.apiUrl}/api/branch/remove`,data,context.rootState.headerconfig)
            .then(()=>{     
                context.commit("removeList",data.index)          
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        update: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/branch/update`,data,context.rootState.headerconfig)
                .then((res)=>{     
                            resolve(res)
                            if(!res.data.errors) context.commit("updateList",data)
                           
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            }) 
        }
    },
    getters: {

    },
    mutations: {
        setDentists: function(state,{data,index}){
            state.branches[index].Dentists = data
        },
        setItems: function(state,{data,index}){
            state.branches[index].Medicines = data
        },
        setService: function(state,{data,index}){
            state.branches[index].Services = data
        },
        setUsers:  function(state,{data,index}){
            state.branches[index].Users = data
        },
        setList: function(state,data){
            state.branches = data
        },
        addList: function(state,data){
            state.branches.push(data)
        },
        updateList: function(state,data){
            state.branches[data.index] = data
        },
        removeList: function(state,index){
            state.branches.splice(index,1)
        },
        setBranch: function(state,data){
            state.branch = data[0]
        }
    }
}