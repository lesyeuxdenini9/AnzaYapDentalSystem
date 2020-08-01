import Axios from 'axios'
export default {
    namespaced: true,
    state: {
        data: {},
        dentistTransactions: [],
    },
    actions: {
        dentistTransaction: function(context,branchid){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/dashboard/dentistTransaction/${branchid}`,context.rootState.headerconfig)
                .then((res)=>{
                    resolve(res.data.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }     
                    reject(err)          
                })
            })
        },
        getData: function(context,branch){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/dashboard/getData/${branch}`,context.rootState.headerconfig)
                .then((res)=>{
                    context.commit("setData",res.data)
                    resolve(res)
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
        getData: function(state){
            return state.data
        }
    },
    mutations: {
        setData: function(state,data){
            state.data = data
        },
        setDentistTransaction: function(state,data){
            state.dentistTransactions = data
        }
    }
}
