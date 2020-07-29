import Axios from 'axios'
export default {
    namespaced:true,
    state: {
        medicines: [],
        stocksin: [],
        medicine: {},
    },
    actions: {
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
        }
    },
    getters: {

    },
    mutations: {
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