import Axios from 'axios'
import { formatDate } from "@/helper/helper"
export default {
    namespaced: true,
    state:{
        reservations:[],
        followupTransactions: [],
        pendings: [],
        reservationInfo: {},
        activeList: [],
        reservationsList: [],
        approvedTimes: [],
        appointments: [],
        reservationFollowups: [],
        list: [],
        nextappointments: [],
        pendingCount: 0,
    },
    actions: {
        getUserTransactionWalkIn: function(context,{status,branch,userid}){
            Axios.get(`${context.rootState.apiUrl}/api/transaction/get/${status}/${branch}/${userid}`,context.rootState.headerconfig)
            .then((res)=>{     
                context.commit("setFollowupTransaction",res.data.data)      
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },

        createWalkInReservation: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reservation/createWalkInReservation`,data,context.rootState.headerconfig)
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
        getUserTransaction: function(context,{status,branch}){
            Axios.get(`${context.rootState.apiUrl}/api/transaction/get/${status}/${branch}`,context.rootState.headerconfig)
            .then((res)=>{     
                context.commit("setFollowupTransaction",res.data.data)      
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        save: function(context,data){
          return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reservation/create`,data ,context.rootState.headerconfig)
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
        getPending: function(context,data = null){
            if(data==null){
                Axios.get(`${context.rootState.apiUrl}/api/reservation/get/0`,context.rootState.headerconfig)
                .then((res)=>{     
                    context.commit("setPendingReservation",res.data.data) 
                    context.commit("setPendingCount",res.data.data.length)     
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                })
            }else{
                Axios.post(`${context.rootState.apiUrl}/api/reservation/get/0`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    context.commit("setPendingReservation",res.data.data)      
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }               
                })
            }
      
        },
        getReservationInfo: function(context,idno){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/reservation/info/${idno}`,context.rootState.headerconfig)
                .then((res)=>{     
                    context.commit("setReservationInfo",res.data.data) 
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
        cancelReservation: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/reservation/cancel/${data.id}`,data,context.rootState.headerconfig)
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
        denyReservation: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/reservation/deny/${data.id}`,data,context.rootState.headerconfig)
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
        approvedReservation: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/reservation/confirm/${data.id}`,data,context.rootState.headerconfig)
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
        getApprovedListDay: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/reservation/activelist/${data.date}/${data.dentist}/${data.branch}`,context.rootState.headerconfig)
                .then((res)=>{     
                    context.commit("setActiveList",res.data.data)
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
        getPatientReservations: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reservation/patient`,{start: formatDate(data.start),end: formatDate(data.end), branchid: data.branchid, reservation: data.reservationNo},context.rootState.headerconfig)
                .then((res)=>{     
                    context.commit("setReservations",res.data.data)
                    context.commit("setReservationsList",res.data.data)
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
        getApprovedTimeDay: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reservation/getApprovedTimeDay`,data,context.rootState.headerconfig)
                .then((res)=>{     
                    context.commit("setApprovedTime",res.data.data)
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
        getAppointments: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reservation/appointments`,{start: formatDate(data.start),end: formatDate(data.end), branch: data.branch, dentist: data.dentist},context.rootState.headerconfig)
                .then((res)=>{     
                    context.commit("setAppointments",res.data.data)
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
        proceedTransaction: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reservation/proceedTransaction`,data,context.rootState.headerconfig)
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
        createFollowupReservation: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reservation/createFollowupReservation`,data,context.rootState.headerconfig)
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
        changeReservationDate: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reservation/changeReservationDate`,data,context.rootState.headerconfig)
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
        getReservationFollowup:function(context,idno){
            Axios.get(`${context.rootState.apiUrl}/api/reservation/getReservationFollowup/${idno}`,context.rootState.headerconfig)
            .then((res)=>{     
               context.commit("setReservationFollowup",res.data.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        deleteReservation: function(context,idno){
            return new Promise((resolve,reject)=>{
                Axios.delete(`${context.rootState.apiUrl}/api/reservation/deleteReservation/${idno}`,context.rootState.headerconfig)
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
        list: function(context,data){
            Axios.post(`${context.rootState.apiUrl}/api/reservation/list`,data,context.rootState.headerconfig)
            .then((res)=>{     
                context.commit("setList",res.data.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        changeTimeReservation: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/reservation/changeTimeReservation`,data,context.rootState.headerconfig)
                .then((res)=>{     
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
        getNextAppointment: function(context){
            Axios.post(`${context.rootState.apiUrl}/api/reservation/getNextAppointment`,{},context.rootState.headerconfig)
            .then((res)=>{     
                context.commit("setNextAppointment",res.data.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        }
    
    },
    getters: {
            getActiveEvents: function(state){
                let events = state.activeList.map((list)=>{
                    return {
                        id: list.id,
                        title: `Reservation No: ${list.reservationNo}`,
                        // start: `${list.date} ${formatHour(list.starttime)}:00`,
                        // end: `${list.date} ${formatHour(list.endtime)}:00`,
                        start: `${list.date} ${list.Start}:00`,
                        end: `${list.date} ${list.End}:00`,
                        customRender: true,
                        extendedProps: {
                            status: list.status,
                            Start: list.Start,
                            End: list.End,
                            isResched: list.isResched
                        }
                    }
                })

                return events
            },
            getApprovedAppointments: function(state){
               
                let events = state.appointments.map((list)=>{
                    return {
                        id: list.id,
                        title: `Reservation No: ${list.reservationNo}`,
                        // start: `${list.date} ${formatHour(list.starttime)}:00`,
                        // end: `${list.date} ${formatHour(list.endtime)}:00`,
                        start: `${list.date} ${list.Start}:00`,
                        end: `${list.date} ${list.End}:00`,
                        customRender: true,
                        extendedProps: {
                                status: list.status,
                                dentist: list.Dentist.fullname,
                                treatments: list.Treatments,
                                patient: list.User,
                                reservationInfo: list,
                                branch: list.Branch.branch,
                                Start: list.Start,
                                End: list.End,
                                isResched: list.isResched
                        }
                    }
                })
                return events
            },
            getReservationEvents: function(state){
                let events = state.reservations.map((list)=>{
                    return {
                        id: list.id,
                        title: `Reservation No: ${list.reservationNo}`,
                        // start: `${list.date} ${formatHour(list.starttime)}:00`,
                        // end: `${list.date} ${formatHour(list.endtime)}:00`,
                        start: `${list.date} ${list.Start}:00`,
                        end: `${list.date} ${list.End}:00`,
                        customRender: true,
                        extendedProps: {
                                status: list.status,
                                dentist: list.Dentist.fullname,
                                branch: list.Branch.branch,
                                Start: list.Start,
                                End: list.End,
                                isResched: list.isResched
                        }
                    }
                })
                return events
            },
            getReserveTime: function(state){
                let reservetime = []
                state.approvedTimes.forEach((time)=>{

                    // let starttime = parseInt(formatHour(time.starttime).split(":")[0])
                    // let endtime = parseInt(formatHour(time.endtime).split(":")[0])
                    let starttime = parseInt(time.Start.split(":")[0])
                    let endtime = parseInt(time.End.split(":")[0])
    
                    // for(starttime; starttime<endtime; starttime++){
                    //     reservetime.push({active: 0,index: starttime, value: `${starttime}:00`})
                    // }

                    for(starttime; starttime<=endtime; starttime++){
                        reservetime.push({active: 0,index: starttime, value: `${starttime}:00`, text: ''})
                    }

                })
                
                return reservetime

            },

    },
    mutations: {
        setPendingCount: function(state,data){
            state.pendingCount = data
        },
        setFollowupTransaction: function(state,data){
            state.followupTransactions = data
        },
        setPendingReservation: function(state,data){
            state.pendings = data
        },
        setReservationInfo: function(state,data){
            state.reservationInfo = data
        },
        setActiveList: function(state,data){
            state.activeList = data
        },
        setReservations: function(state,data){
            state.reservations = data
        },
        setReservationsList: function(state,data){
            state.reservationsList = data
        },
        setApprovedTime: function(state,data){
            state.approvedTimes = data
        },
        setAppointments: function(state,data){
            state.appointments = data
        },
        setReservationFollowup:function(state,data){
            state.reservationFollowups = data
        },
        setList: function(state,data){
            state.list = data
        },
        setNextAppointment: function(state,data){
            state.nextappointments = data
        }
    }
}