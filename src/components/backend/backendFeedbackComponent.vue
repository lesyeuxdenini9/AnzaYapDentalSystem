<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-star"></i> Patient(s) Feedbacks for this month</span>
                    <hr/>
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
                                <th>Patient</th>
                                <th>Comment</th>
              
                            </tr>
                        </thead>
                            
                        <tbody>
                            <tr v-for="(feedback,index) in feedbackFinal" :key="index">
                                <td>{{`${dDate(feedback.createdAt)} ${dHour(feedback.createdAt)}`}}</td>
                                <td><img v-for="(star,index2) in feedback.stararray" :key="index2" src="@/assets/feedback/feedback1.png" style="height:20px;width:20px;"/></td>
                                <td style="padding:0;">
                                    <div style="display:inline;float:left;margin-right:20px;">
                                    <img ref="userimg" v-if="feedback.User.img == null" src="@/assets/default.png" style="border-radius:50%;height:50px;width:50px;"/>
                                    <img v-else style="border-radius:50%;padding:0;height:50px;width:50px;" :src="`${imgUrl}/${feedback.User.img}`"/> 
                                    </div>
                                    <div style="display:inline;float:left;">
                                    <span>{{feedback.User.fullname}}<br/><small>{{feedback.User.email}}</small></span>
                                    </div>
                                    
                                    </td>
                                <td>{{feedback.message}}</td>
                      
                            </tr>
                        </tbody>
                      </table>
   
        </div>
  
    </div>
</template>

<script>
import { mapState , mapGetters } from 'vuex'
import { formatBdayDate , format12Hour } from '@/helper/helper'
export default {
    data: function(){
        return {
            activeIndexBranch: 0,
            imgUrl: this.$store.state.imgUrl
        }
    },
    methods: {
       dHour: function(date){
            return format12Hour(date)
        },
        dDate: function(date){
            return formatBdayDate(date)
        },
        changeFilterbranch: function(index){
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            this.activeIndexBranch = index
            this.$store.dispatch("feedback/adminget",this.branches[this.activeIndexBranch].id)
        },
    },
    computed: {
        ...mapState({
             branches: state=> state.branch.branches,
        }),
        ...mapGetters('feedback',[
            'feedbackFinal'
        ])
    },
    mounted(){
        this.$store.dispatch("activenav","backendfeedbacknav")
        this.$store.dispatch("branch/getList")
            .then(()=>this.$store.dispatch("feedback/adminget",this.branches[this.activeIndexBranch].id))
            .then(()=>{

            }).catch(err=>console.log(err))
    }
}
</script>