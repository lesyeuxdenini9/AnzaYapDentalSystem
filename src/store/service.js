import Axios from 'axios'
import branch from './branch'
export default {
    modules: {
        branch
    },
    namespaced:true,
    state: {
        services: [],
        categories: [
            'Esthetic Dentistry',
            'Preventive Dentistry',
            'Periodontics & Endodontics',
            'Oral Surgery',
            'Orthodontics',
            'Dental Roentology',
        ],
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
        archiveList: function(context,data){
            Axios.patch(`${context.rootState.apiUrl}/api/service/archive/${data.id}/${data.archivestatus}`,data,context.rootState.headerconfig)
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
        },
        search: function(context,data){
        //context.commit("branch/setService",data,{root:true})

                    Axios.post(`${context.rootState.apiUrl}/api/service/search`,data,context.rootState.headerconfig)
                    .then((res)=>{     
                        context.commit("branch/setService",{data: res.data.data,index: data.branchindex})            
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                        }               
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