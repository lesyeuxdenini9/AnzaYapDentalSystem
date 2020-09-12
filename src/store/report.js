import Axios from 'axios'
export default {
    namespaced: true,
    state: {
        transactions: [],
        billings: [],
        sales: [],
        purchases: [],
        byGender: [],
    },
    actions: {
        getByGender: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reports/getByGender`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setByGender",res.data)
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
        sales_yearly: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reports/sales_yearly`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setSales",res.data)
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
        sales_monthly: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reports/sales_monthly`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setSales",res.data)
                        resolve(res.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                    reject(err)
                })
        })
        },
        sales_daily: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reports/sales_daily`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setSales",res.data)
                        resolve(res.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                    reject(err)
                })
            })
     
        },
        pharmacy_daily: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reports/pharmacy_daily`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setSales",res.data)
                        resolve(res.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                    reject(err)
                })
            })
        },
        pharmacy_monthly: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reports/pharmacy_monthly`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setSales",res.data)
                        resolve(res.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                    reject(err)
                })
            })
        },
        appointment_daily: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reports/appointment_daily`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setSales",res.data)
                        resolve(res.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                    reject(err)
                })
            })
        },  
        appointment_monthly: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reports/appointment_monthly`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setSales",res.data)
                        resolve(res.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                    reject(err)
                })
            })
        },  
        appointment_yearly: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reports/appointment_yearly`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setSales",res.data)
                        resolve(res.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                    reject(err)
                })
            })
        },  
        pharmacy_yearly: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reports/pharmacy_yearly`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setSales",res.data)
                        resolve(res.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                    reject(err)
                })
            })
        },
        getRecords: function(context,data){
            Axios.post(`${context.rootState.apiUrl}/api/transaction/getRecords`,data,context.rootState.headerconfig)
            .then((res)=>{     
                    context.commit("setTransactions",res.data.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
      },
      billingRecords: function(context,data){
        Axios.post(`${context.rootState.apiUrl}/api/reports/billingRecords`,data,context.rootState.headerconfig)
        .then((res)=>{     
                context.commit("setBillings",res.data.data)
        })
        .catch((err)=>{
            if(err.response.status == 401 && err.response.data == "Unauthorized"){
                context.dispatch("refreshtoken",null,{root:true})
            }               
        })
      },
      pharmacyPurchaseRecords: function(context,data){
        Axios.post(`${context.rootState.apiUrl}/api/reports/pharmacyPurchaseRecords`,data,context.rootState.headerconfig)
        .then((res)=>{     
                context.commit("setPharmacyPurchase",res.data.data)
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
        setByGender: function(state,data){
            state.byGender = data
        },
        setTransactions: function(state,data){
            state.transactions = data
        },
        setBillings: function(state,data){
            state.billings = data
        },
        setSales: function(state,data){
            state.sales = data
        },
        setPharmacyPurchase: function(state,data){
            state.purchases = data
        }
    }
}
