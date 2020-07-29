import Axios from 'axios'
export default {
    namespaced:true,
    state: {
        services: [],
    },
    actions: {
        getList: function(context,branchid){
            Axios.get(`${context.rootState.apiUrl}/api/service/list/${branchid}`,context.rootState.headerconfig)
            .then((res)=>{     
                    context.commit('setservice',res.data.data)          
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        save: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/service/save`,data,context.rootState.headerconfig)
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
            Axios.patch(`${context.rootState.apiUrl}/api/service/archive/${data.id}`,data,context.rootState.headerconfig)
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
                Axios.patch(`${context.rootState.apiUrl}/api/service/update/${data.id}`,data,context.rootState.headerconfig)
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
        setservice: function(state,data){
            state.services = data
        },
        updateList: function(state,data){
            state.services.push(data)
        },
        removeList: function(state,index){
            state.services.splice(index,1)
        },
        updateEdit: function(state,{data,index}){
            state.services[index] = data
        }
    }
}