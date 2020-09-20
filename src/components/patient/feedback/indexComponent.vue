<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-star"></i> Clinic Feedbacks</span>
                    <hr/>
                    <div class="row">
                        <div class="col-md-3">
                                <div class="card">
                                    <div class="card-body">

                                                <div class="col-md-12" style="padding:0;margin-bottom:10px;">
                                                    <div style="position:inline;float:left;" @click="ratestar(index)" v-for="(star,index) in feedback.stars" :key="index">
                                                       
                                                    <img v-if="star.check == 0" ref="ratestar" src="@/assets/feedback/feedback0.png" style="cursor:pointer;height:50px;width:50px;margin:5px;"/>
                                                    <img v-else ref="ratestar" src="@/assets/feedback/feedback1.png" style="cursor:pointer;height:50px;width:50px;margin:5px;"/>
                                                    </div>
                                                </div>
                                            
                                                  <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3">Branch <span style="color:maroon;">*</span></span>
                                                            </div>
                                                        <select class="form-control" v-model="feedback.branch">
                                                            <option v-for="(branch,index) in branches" :key="index" :value="branch.id">{{branch.branch}}</option>
                                                        </select>

                                                  </div>

                                                   <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon3">Comment</span>
                                                    </div>

                                                    <textarea rows="10" class="form-control" v-model="feedback.comment"/>

                                                 </div>

                                                     <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <span v-for="(error,index) in errormsg" :key="index">
                                   <span v-for="(msg,index2) in error" :key="index2">{{msg}}<br v-if="msg.length > 1"/></span>
                            </span>
                           
                            </div>


                                                    <button @click="save()" class="btn btn-primary form-control"><span class="fa fa-check"></span> Create</button>
                                    </div>
                                </div>
                        </div>
                        <div class="col-md-9">
                                     <div class="card">
                                    <div class="card-body">
                                             <ul class="nav nav-tabs">
            
                        <li class="nav-item" v-for="(branch,index) in branches" :key="index">
                            <a v-if="index==0" @click="changeFilterbranch(index)" class="active navbranch nav-link" href="javascript:void(0)">
                                      {{branch.branch}}
                            </a>
                            <a v-else @click="changeFilterbranch(index)" class="navbranch nav-link" href="javascript:void(0)">
                                      {{branch.branch}}
                            </a>
                            
                        </li>
                      
                    </ul>   

                    <table class="table table-condensed table-striped">
                        <thead>
                            <tr style="background:#3B61D1;color:white;">
                                <th style="width:20%;">Date</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th style="width:20px;"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(feedback,index) in feedbackFinal" :key="index">
                                <td>{{`${dDate(feedback.createdAt)} ${dHour(feedback.createdAt)}`}}</td>
                                <td><img v-for="(star,index2) in feedback.stararray" :key="index2" src="@/assets/feedback/feedback1.png" style="height:20px;width:20px;"/></td>
                                <td>{{feedback.message}}</td>
                                <td><button @click="removecomment(feedback.id,index)" style="color:maroon;border:none;background:transparent;"><span class="fa fa-times"></span></button></td>
                            </tr>
                        </tbody>
                    </table>

                                    </div>
                                     </div>
                        </div>
                    </div>


          

        </div>
  
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatBdayDate , format12Hour } from '@/helper/helper'
export default {
    data: function(){
        return {
            feedback: {
                branch: '',
                comment: '',
                stars: [{check: 1},{check: 0},{check: 0},{check: 0},{check: 0}]
            },
            activeIndexBranch: 0,
            errormsg: [],
        }
    },
    methods: {
        dHour: function(date){
            return format12Hour(date)
        },
        dDate: function(date){
            return formatBdayDate(date)
        },
        ratestar: function(index){
  
            if(this.feedback.stars[index].check == 0){
                for(let x = (index+1) ; x > 0 ; x--){
                    let newindex = x-1
                    this.feedback.stars[newindex].check = 1
                }
            }else{
                for(let x = (index+1) ; x < this.feedback.stars.length ; x++){
                    this.feedback.stars[x].check = 0
                }
            }
        
        },
        removecomment: function(id,index){
            this.$swal({
                title: 'Remove this feedback?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
              }).then((result) => {
                if (result.value) {
                //   this.$store.dispatch("logout")
                //   this.$router.replace("/")
                    this.$store.dispatch("feedback/remove",{id:id,index:index})
                }
              })
        },
         changeFilterbranch: function(index){
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            this.activeIndexBranch = index
             this.$store.dispatch("feedback/patientget",this.branches[this.activeIndexBranch].id)
        },
        save: function(){
             this.$store.dispatch('feedback/save',this.feedback)
                   .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                        this.$swal("Feedback has been created","","success")
                        this.errormsg = []
                        this.$refs.errormessage.classList.remove("show")
                        this.feedback = {branch: '',comment: '',stars: [{check: 1},{check: 0},{check: 0},{check: 0},{check: 0}]}}
                        this.$store.dispatch("feedback/patientget",this.branches[this.activeIndexBranch].id)
            })
            .catch(err=>console.log(err))
        }

    },
    computed: {
        ...mapState({
            branches: state=> state.branch.branches,
            feedbacks: state=> state.feedback.feedbacks
        }),
        ...mapGetters('feedback',[
            'feedbackFinal'
        ])
    },
    mounted(){
        this.$store.dispatch("activenav","feedbacknav")
        this.$store.dispatch("branch/getList")
        .then(()=>this.$store.dispatch("feedback/patientget",this.branches[this.activeIndexBranch].id))
        .then(()=>{

        }).catch(err=>console.log(err))
      
    }

}
</script>