import Axios from 'axios'
export default {
    namespaced: true,
    state: {
        usertransactions: [],
        transactionInfo: {
            Branch: {},
            User: {},
            Dentist: {},
            Treatments: [],
            Billings:[],
        },
        prescriptInfo: {},
        billinfo: {
            User:{
                address: '',
                email: '',
            },
            Branch: {},
            customerName: '',
            Transaction: {
                Treatments: [],
                Billings: [],
            },
            Healthcard: {},
        },
        pharmacyTransactions: [],
    },
    actions: {
        updateActualTreatmentAmount: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/transaction/updateActualTreatmentAmount`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    resolve(res)   
                    if(!res.data.errors)   context.dispatch("getTransaction",data.transactID)        
                              
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
                Axios.post(`${context.rootState.apiUrl}/api/transaction/save`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    if(!res.data.errors) context.dispatch("user/getUserinfo",res.data.userid,{root: true})             
                    resolve(res)      
                              
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        getUserTransaction: function(context,{userid}){
            Axios.get(`${context.rootState.apiUrl}/api/transaction/user/${userid}`,context.rootState.headerconfig)
            .then((res)=>{     
                    context.commit("setUserTransaction",res.data.data)                  
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        getTransaction: function(context,idno){
            Axios.get(`${context.rootState.apiUrl}/api/transaction/${idno}`,context.rootState.headerconfig)
            .then((res)=>{     
                    context.commit("settransactionInfo",res.data.data)                  
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        }, 
        actionSave: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/transaction/action/save`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    resolve(res)   
                    if(!res.data.errors)   context.dispatch("getTransaction",data.transactionId)        
                              
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        removeAction_: function(context,data){
            Axios.delete(`${context.rootState.apiUrl}/api/transaction/action/remove/${data.id}`,context.rootState.headerconfig)
            .then((res)=>{     
                if(!res.data.errors)   context.dispatch("getTransaction",data.transactID)        
                          
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        addMedicineused: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/transaction/action/addMedicineused`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    if(!res.data.errors) context.dispatch("getTransaction",data.transactID)  
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
        updateMedicineused: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/transaction/action/updateMedicineused`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    if(!res.data.errors) context.dispatch("getTransaction",data.transactID)  
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
        removeMedicineused: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/transaction/action/removeMedicineused`,data.info,context.rootState.headerconfig)
                 .then((res)=>{     
                     if(!res.data.errors)   context.dispatch("getTransaction",data.transactID)        
                     resolve(res)
                 })
                 .catch((err)=>{
                     if(err.response.status == 401 && err.response.data == "Unauthorized"){
                         context.dispatch("refreshtoken",null,{root:true})
                         reject(err)
                     }               
                 })
         })
        },
        actionUpdate: function(context,data){
            return new Promise((resolve,reject)=>{
                   Axios.patch(`${context.rootState.apiUrl}/api/transaction/action/update/${data.id}`,data,context.rootState.headerconfig)
                    .then((res)=>{     
                        if(!res.data.errors)   context.dispatch("getTransaction",data.transactID)        
                        resolve(res)
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                            reject(err)
                        }               
                    })
            })
         
        },
        editStatus: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/transaction/editStatus`,data,context.rootState.headerconfig)
                 .then((res)=>{     
                     if(!res.data.errors)   context.dispatch("getTransaction",data.transactid)        
                     resolve(res)
                 })
                 .catch((err)=>{
                     if(err.response.status == 401 && err.response.data == "Unauthorized"){
                         context.dispatch("refreshtoken",null,{root:true})
                         reject(err)
                     }               
                 })
         })
        },
        updateType: function(context,{tid,val}){
            Axios.patch(`${context.rootState.apiUrl}/api/transaction/editType/${tid}`,{val: val},context.rootState.headerconfig)
            .then(()=>{     
                // if(!res.data.errors) context.dispatch("getTransaction",tid)        
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        createPrescription: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/transaction/savePrescription`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    if(!res.data.errors) context.dispatch("getTransaction",data.tid)     
                    resolve(res)   
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        createBillTreatment: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/transaction/createBillTreatment`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    if(!res.data.errors) context.dispatch("getTransaction",data.transactID)     
                    resolve(res)   
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        viewBill: function(context,idno){
            Axios.get(`${context.rootState.apiUrl}/api/transaction/viewBill/${idno}`,context.rootState.headerconfig)
            .then((res)=>{     
                context.commit("setBillInfo",res.data.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
             
                }               
            })
        },
        additionalTreatment: function(context,data){
  
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/transaction/additionalTreatment/${data.tid}`,data.data,context.rootState.headerconfig)
                .then((res)=>{     
                    if(!res.data.errors) context.dispatch("getTransaction",data.tid)     
                    resolve(res)   
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        removePrescription: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/transaction/removePrescription`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    if(!res.data.errors) context.dispatch("getTransaction",data.tid)     
                    resolve(res)   
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        removeTreatment: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/transaction/removeTreatment`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    if(!res.data.errors) context.dispatch("getTransaction",data.tid)     
                    resolve(res)   
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        updatePrescription: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/transaction/updatePrescription`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    if(!res.data.errors) context.dispatch("getTransaction",data.tid)     
                    resolve(res)   
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        getPrescriptInfo: function(context,idno){
            Axios.get(`${context.rootState.apiUrl}/api/transaction/prescriptionInfo/${idno}`,context.rootState.headerconfig)
            .then((res)=>{     
                    context.commit("setPrescriptionInfo",res.data.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        getPrescriptInfoByRef: function(context,refno){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/transaction/prescriptInfoByRef/${refno}`,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setPrescriptionInfo",res.data.data)
                        resolve(res)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
       
        },
        createBillPharmarcy: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/transaction/createBillPharmarcy`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        resolve(res)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        getRecords: function(context,data){
                Axios.post(`${context.rootState.apiUrl}/api/transaction/getRecords`,data,context.rootState.headerconfig)
                .then((res)=>{     
                        context.commit("setUserTransaction",res.data.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                })
        },
        saveMedRemarks: function(context,data){
            Axios.patch(`${context.rootState.apiUrl}/api/transaction/saveMedRemarks`,data,context.rootState.headerconfig)
            .then(()=>{     
                 
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        addDiscount: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/transaction/addDiscount`,data,context.rootState.headerconfig)
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
        getPastListPharmacy: function(context,data){
            Axios.post(`${context.rootState.apiUrl}/api/transaction/getPastListPharmacy`,data,context.rootState.headerconfig)
            .then((res)=>{     
                context.commit("setpharmacyTransactions",res.data.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        }
    },
    getters: {
        topTeeth: function(state){
            let topT = []
            state.transactionInfo.User.Teeth.map((tooth)=>{
                if(tooth.flag == 0) topT.push(tooth)
            })
            if(state.transactionInfo.toothType == 1) topT.splice(10,6)
            return topT
            
        },
        BottomTeeth: function(state){
            let botT = []
            state.transactionInfo.User.Teeth.map((tooth)=>{
                if(tooth.flag == 1) botT.push(tooth)
            })
            if(state.transactionInfo.toothType == 1) botT.splice(10,6)
            return botT
        }
    },
    mutations: {
        setUserTransaction: function(state,data){
            state.usertransactions = data
        },
        settransactionInfo: function(state,data){
            state.transactionInfo = data
        },
        setPrescriptionInfo: function(state,data){
            state.prescriptInfo = data
        },
        setBillInfo: function(state,data){
            state.billinfo = data
        },
        setpharmacyTransactions: function(state,data){
            state.pharmacyTransactions = data
        }
    }
}