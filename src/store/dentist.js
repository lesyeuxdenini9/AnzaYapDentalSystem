import Axios from 'axios'
export default {
    namespaced:true,
    state: {
        dentists: [],
    },
    actions: {
        search: function(context,data){
            Axios.post(`${context.rootState.apiUrl}/api/dentist/search`,data,context.rootState.headerconfig)
            .then((res)=>{     
                    context.commit('branch/setDentists',{data: res.data.data,index: data.branchindex},{root: true})          
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        getList: function(context){
            Axios.get(`${context.rootState.apiUrl}/api/dentist/list`,context.rootState.headerconfig)
            .then((res)=>{     
                    context.commit('setdentist',res.data.data)          
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        save: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/dentist/save`,data,context.rootState.headerconfig)
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
        removeList: function(context,data){
            Axios.patch(`${context.rootState.apiUrl}/api/dentist/archive/${data.id}`,data,context.rootState.headerconfig)
            .then((res)=>{
                if(res.data=="archived") context.commit("removeList",data.index)
            })  
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }   
            })
        },
        archiveList: function(context,data){
            Axios.patch(`${context.rootState.apiUrl}/api/dentist/archive/${data.id}/${data.archivestatus}`,data,context.rootState.headerconfig)
            .then((res)=>{
                if(res.data=="archived") context.commit("removeList",data.index)
            })  
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }   
            })
        },
        update: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/dentist/update/${data.id}`,data,context.rootState.headerconfig)
                .then((res)=>{     
                            resolve(res)
                            if(!res.data.errors) context.commit("updateEdit",{data: res.data,index: data.index})
                           
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
        setdentist: function(state,data){
            state.dentists = data
        },
        updateList: function(state,data){
            state.dentists.push(data)
        },
        removeList: function(state,index){
            state.dentists.splice(index,1)
        },
        updateEdit: function(state,{data,index}){
            state.dentists[index] = data
        }
    }
}