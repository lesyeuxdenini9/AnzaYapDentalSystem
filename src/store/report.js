import Axios from 'axios'
export default {
    namespaced: true,
    state: {
        transactions: [],
        billings: [],
        sales: [],
    },
    actions: {
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
      }
    },
    getters: {
   
    },
    mutations: {
        setTransactions: function(state,data){
            state.transactions = data
        },
        setBillings: function(state,data){
            state.billings = data
        },
        setSales: function(state,data){
            state.sales = data
        }
    }
}