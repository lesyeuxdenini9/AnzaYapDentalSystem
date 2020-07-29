<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-users"></i> Patient(s) Search</span>
                  <hr/>
                  

                  <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <label>Last Name</label>
                                <input type="text" class="form-control" v-model="filter.lastname"/>
                            </div>
                              <div class="col-md-3">
                                 <label>Middle Name</label>
                                <input type="text" class="form-control" v-model="filter.middlename"/>
                            </div>
                              <div class="col-md-3">
                                 <label>First Name</label>
                                <input type="text" class="form-control" v-model="filter.firstname"/>
                            </div>
                              <div class="col-md-3">
                                 <label>Email Address</label>
                                <input type="text" class="form-control"  v-model="filter.email"/>
                            </div>
                        </div>

                        <div class="row">
                             <div class="col-md-3">
                                <button @click="clear()" class="btn btn-danger form-control"><span class="fa fa-recycle"></span> Clear</button>
                            </div>

                            <div class="col-md-3">
                                <button @click="search()" class="btn btn-primary form-control"><span class="fa fa-search"></span> Search</button>
                            </div>
                        </div>
                    </div>
                  </div>

                   <div class="card">
                        <div class="card-header">Results - {{patients.length}}</div>
                    <div class="card-body">
                        <table class="table table-condensed table-hover table-striped" v-if="patients.length>0">
                            <thead>
                                 <tr>
                                    <th>Lastname</th>
                                    <th>Firstname</th>
                                    <th>Middlename</th>
                                    <th>Email</th>
                                    <th>Birthday</th>
                                    <th>Address</th>
                                    <th></th>
                                 </tr>
                            </thead>
                            <tbody>
                                <tr style="cursor:pointer" @dblclick="viewDetails(patient.id)" v-for="(patient,index) in patients" :key="index">
                                    <td>{{patient.lastname}}</td>
                                    <td>{{patient.firstname}}</td>
                                    <td>{{patient.middlename}}</td>
                                    <td>{{patient.email}}</td>
                                    <td>{{formatbday(patient.bday)}}</td>
                                    <td>{{patient.address}}</td>
                                    <td><router-link :to="{name: 'patientinfo',params: {idno: patient.id}}">View Info</router-link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                   </div>

        </div>
  
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatBdayDate } from "@/helper/helper"
export default {
 data: function(){
     return {
         filter: {
             lastname: '',
             middlename: '',
             firstname: '',
             email: '',
         }
     }
 },
 computed: {
     ...mapState({
         patients: state=> state.user.patients
     })
 },
 methods: {
     viewDetails: function(idno){
         this.$router.push({name: 'patientinfo',params: {idno: idno}})
     },
     search: function(){
        this.$store.dispatch('user/searchPatient',this.filter)
     },
     formatbday(date){
         return formatBdayDate(date)
     },
     clear: function(){
         this.filter = {
             lastname: '',
             middlename: '',
             firstname: '',
             email: '',
         }
         this.$store.state.user.patients = []
     }
 },
 mounted(){
    this.$store.dispatch("activenav","patientnav")
 }

}
</script>