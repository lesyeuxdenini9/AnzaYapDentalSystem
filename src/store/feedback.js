import Axios from 'axios'
export default {
    namespaced: true,
    state: {
        feedbacks: [],
    },
    actions: {
        save: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/feedback/save`,data,context.rootState.headerconfig)
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
        patientget: function(context,branchid){
            Axios.get(`${context.rootState.apiUrl}/api/feedback/patientget/${branchid}`,context.rootState.headerconfig)
            .then((res)=>{     
                      context.commit("setFeedbacks",res.data.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        adminget: function(context,branchid){
            Axios.get(`${context.rootState.apiUrl}/api/feedback/adminget/${branchid}`,context.rootState.headerconfig)
            .then((res)=>{     
                      context.commit("setFeedbacks",res.data.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        remove: function(context,data){
            Axios.delete(`${context.rootState.apiUrl}/api/feedback/remove/${data.id}`,context.rootState.headerconfig)
            .then(()=>{     
                      context.commit("removeFeedbacks",data.index)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        }
    },
    getters: {
        feedbackFinal: function(state){
            let feedbacks = state.feedbacks.map((f)=>{
                let stararray = []
                for(let x = 0 ; x < f.star ; x++){
                    stararray.push({
                        star: 1,
                    })
                }
                f.stararray = stararray
                return f
            })

            return feedbacks
        }
    },
    mutations: {
        setFeedbacks: function(state,data){
            state.feedbacks = data
        },
        removeFeedbacks: function(state,index){
            state.feedbacks.splice(index,1)
        }
    }
}