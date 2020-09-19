import Axios from 'axios'
import branch from './branch'
export default {
    modules: {
        branch
    },
    namespaced:true,
    state: {
        medicines: [],
        stocksin: [],
        medicine: {},
        stockInfo: {
            Stockinitems: [],
        },
    },
    actions: {
        retrieveList: function(context,id){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/medicine/retrieve/${id}`,{},context.rootState.headerconfig)
                .then((res)=>{
                    // if(res.data=="archived") context.commit("removeList",data.index)
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
        search: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/medicine/search`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        resolve(res.data.data)
                        context.commit("setmedicine",res.data.data)
                        context.commit('branch/setItems',{data: res.data.data,index: data.branchindex})          
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                    reject(err)
                })
            })
         
        },
        getStocksin: function(context,data){
            Axios.post(`${context.rootState.apiUrl}/api/medicine/getStocksin`,data,context.rootState.headerconfig)
            .then((res)=>{     
                    context.commit('setStocksin',res.data.data)          
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        addstock: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/medicine/addstock`,data,context.rootState.headerconfig)
                .then((res)=>{     
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
        getList: function(context,{branch,type}){
            Axios.get(`${context.rootState.apiUrl}/api/medicine/list/${branch}/${type}`,context.rootState.headerconfig)
            .then((res)=>{     
                    context.commit('setmedicine',res.data.data)          
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        save: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/medicine/save`,data,context.rootState.headerconfig)
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
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/medicine/archive/${data.id}`,data,context.rootState.headerconfig)
                .then((res)=>{
                    // if(res.data=="archived") context.commit("removeList",data.index)
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
        update: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/medicine/update/${data.id}`,data,context.rootState.headerconfig)
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
        getInfo: function(context,data){
            Axios.post(`${context.rootState.apiUrl}/api/medicine/getInfo`,data,context.rootState.headerconfig)
            .then((res)=>{     
                     context.commit("setMedicineInfo",res.data.data)
                       
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        stockinfo: function(context,data){
            Axios.post(`${context.rootState.apiUrl}/api/medicine/stockinfo`,data,context.rootState.headerconfig)
            .then((res)=>{     
                     context.commit("setStockInfo",res.data.data)
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
        setStockInfo: function(state,data){
            state.stockInfo = data
        },
        setMedicineInfo: function(state,data){
            state.medicine = data
        },
        setmedicine: function(state,data){
            state.medicines = data
        },
        updateList: function(state,data){
            state.medicines.push(data)
        },
        removeList: function(state,index){
            state.medicines.splice(index,1)
        },
        updateEdit: function(state,{data,index}){
            state.medicines[index] = data
        },
        setStocksin: function(state,data){
            state.stocksin = data
        }
    }
}