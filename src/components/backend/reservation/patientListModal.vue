<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-users"></span> Patient List</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                            <div class="row">
                                <div class="col col-md-4">
                                <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Last Name</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="filter.lastname"/>
                                      </div>
                                </div>

                                 <div class="col col-md-4">
                                <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Middle Name</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="filter.middlename"/>
                                      </div>
                                </div>

                                 <div class="col col-md-4">
                                <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">First Name</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="filter.firstname"/>
                                      </div>
                                </div>

                                 <div class="col col-md-4">
                                <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Email</span>
                                      </div>
                                      <input type="email" class="form-control" v-model="filter.email"/>
                                      </div>
                                </div>

                                 <div class="col col-md-4">
                                        <button @click="search()" class="btn btn-primary form-control"><span class="fa fa-search"></span> Search</button>
                                </div>

                            </div>

                        <div>

                            <div class="card"  style="height:500px;">
                                       <div class="card-header" style="background:#343A40;padding:0;">
                                                    <table class="table table-condensed" style="margin:0;padding:0;">
                                                        <thead>
                                                            <tr style="color:white;">
                                                                <th style="width: 15%"></th>
                                                                <th style="width: 15%">LastName</th>
                                                                <th style="width: 15%">FirstName</th>
                                                                <th style="width: 15%">MiddleName</th>
                                                                <th style="width: 15%">Email Address</th>
                                                                <th style="width: 15%">Contact</th>
                                                                <th style="width: 10%"></th>
                                                    
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                               <div class="card-body" style="overflow-y:auto !important;padding: 0;overflow-x:hidden">
                                    <table class="table table-striped" style="padding: 0;margin: 0;">
                                        <tbody>
                                             <tr @dblclick="select(patient)"  style="cursor:pointer;border:none;padding:0 !important;" v-for="(patient,index) in patients" :key="index">
                                                <td style="text-align:center;width:15%;">
                                                    <img v-if="patient.img == null" src="@/assets/default.png" style="height:60px;width:90px;"/>
                                                    <img v-else :src="`${imgUrl}/${patient.img}`" style="height:60px;width:80px;"/>
                                                </td>
                                                <td style="width:15%;">{{patient.lastname}}</td>
                                                <td style="width:15%;">{{patient.firstname}}</td>
                                                <td style="width:15%;">{{patient.middlename}}</td>
                                                <td style="width:15%;">{{patient.email}}</td>
                                                <td style="width:15%;">{{patient.contact}}</td>
                                                <td style="text-align:right;width:10%;"><button @click="select(patient)"><span class="fa fa-check"></span></button></td>
                                            </tr>  
                                        </tbody>
                                    </table>
                               </div>

                            </div>

                              <div style="text-align:center"><span>Page {{filter.page}}</span></div>

                        <button @click="prev" :disabled="filter.page == 1" class="btn btn-default float-left"><span class="fa fa-arrow-left"></span> Prev</button>
                        <button @click="next" class="btn btn-default float-right">Next <span class="fa fa-arrow-right"></span></button>

                            <!-- {{medicines}} -->
                        </div>

                </div>

               
                </div>
            </div>
            </div>
</template>

<script>
// import { formatHour } from "@/helper/helper"
import { mapState } from "vuex"
export default {
    props: {
       
    },
    data: function(){
        return {
             errormsg: [],
            doneTypingInterval: 500,
            typingTimer: '',
            filter: {
                lastname: '',
                middlename: '',
                firstname: '',
                email: '',
                limit: 20,
                page: 1,
            },
             imgUrl: this.$store.state.imgUrl,
        }
    },
    watch: {
        // search: function(newval){
        //     clearTimeout(this.typingTimer)
        //     if(newval.length > 0){
        //         this.typingTimer = setTimeout(()=>{
        //             console.log("proceed")
        //             // proceed search here
        //         },this.doneTypingInterval)
        //     }else{
        //          this.$store.dispatch("medicine/getList")
        //     }
        // }
    },
    computed: {
        ...mapState({
        patients: state=> state.user.patients
        })
    },
    methods: {
        prev: function(){
           this.filter.page--
           this.search()
        },
        next: function(){
            this.filter.page++
            this.search()
        },
         search: function(){
            this.$store.dispatch('user/searchPatient',this.filter)
        },
        closethis: function(){
            this.$emit("closemodal")
        },
        select: function(patient){
            this.$emit("setpatient",patient)
            this.closethis()
        }
  
    },

    mounted(){
        this.search()
    },
 
}
</script>
