<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-user"></i> {{user.fullname}} 
                    <router-link :to="{name: 'listPatient'}"><button class="float-right"><span class="fa fa-times"></span></button></router-link>
                  </span> - <span>{{user.email}}</span>
                    <hr/>

                    <editModal :editInfo="editInfo" v-if="showeditModal" @closemodal="closemodal()" @refreshlist="init"/>

                    <div class="card">
                            <div class="card-header card-default" style="background:#343A40;color:white;">
                     
                                <toggle-button style="margin-top: 5px;" @change="changestatus()" v-model="archiveStatus" :sync="true"
                                    :labels="{checked: 'Active', unchecked: 'Inactive'}"
                                    :width="130"
                                    :font-size="18"
                                    :height="30"
                                    />
                                <button @click="edit" class="float-right btn btn-default" style="color:white;"><span class="fa fa-pen"></span></button>
                            </div>
                        <div class="card-body">
                    
                            <div class="col col-md-3" style="position:relative;">
                                <img v-if="user.img == null" src="@/assets/default.png" style="height:18em;width:100%;"/>
                                <img v-else :src="`${imgUrl}/${user.img}`" style="height:18em;width:100%;"/>
                            </div>

                            <div class="col col-md-9">
                              
                            <div class="col-md-4">
                                 <div class="form-group">
                                        <label>First name</label>
                                        <input type="text" class="form-control" v-model="user.firstname" readonly style="background:white;"/>
                                </div>
                            </div>

                             <div class="col-md-4">
                                 <div class="form-group">
                                        <label>Middle name</label>
                                        <input type="text" class="form-control" v-model="user.middlename" readonly style="background:white;"/>
                                </div>
                            </div>

                             <div class="col-md-4">
                                 <div class="form-group">
                                        <label>Last name</label>
                                        <input type="text" class="form-control" v-model="user.lastname" readonly style="background:white;"/>
                                </div>
                            </div>
                      

                        
                             

                               <div class="col-md-4">
                                <div class="form-group">
                                        <label>Email Address</label>
                                        <input type="email" class="form-control" v-model="user.email" readonly style="background:white;"/>
                                </div>
                            </div>

                             <div class="col-md-4">
                                <div class="form-group">
                                        <label>Birthday</label>
                                        <input type="text" class="form-control" v-model="bday" readonly style="background:white;"/>
                                </div>
                            </div>

                             <div class="col-md-4">
                                <div class="form-group">
                                        <label>Contact No</label>
                                        <input type="text" class="form-control" v-model="user.contact" readonly style="background:white;"/>
                                </div>
                            </div>

           
                               <div class="col-md-4">
                                <div class="form-group">
                                        <label>Gender</label>
                                        <input type="text" class="form-control" v-model="user.gender" readonly style="background:white;"/>
                                </div>
                            </div>

                            
                             <div class="col-md-8">
                                <div class="form-group">
                                        <label>Address</label>
                                        <input type="text" class="form-control" v-model="user.address" readonly style="background:white;"/>
                                </div>
                            </div>

                            </div>

                                <div class="col-md-12">
                                <div class="form-group">
                                        <label>Medical History</label>
                                        <textarea type="text" class="form-control" v-model="user.history" readonly style="background:white;"/>
                                </div>
                            </div>


                        </div>


                        </div>

                     <!-- <div class="card">
                            <div class="card-header card-default" style="background:#343A40;color:white;"><span>Approved Reservation</span></div>
                        <div class="card-body">
                                <table class="table table-condensed">
                                    <thead>
                                    <tr>
                                        <th>Reservation Code</th>
                                        <th>Date</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Dentist</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr @dblclick="viewReservation(active.id)" style="cursor:pointer;" v-for="(active,index) in activeReservation" :key="index">
                                            <td>{{active.reservationNo}}</td>
                                            <td>{{dDate(active.date)}}</td>
                                            <td>{{dHour(active.starttime)}}</td>
                                            <td>{{dHour(active.endtime)}}</td>
                                            <td>{{active.Dentist.fullname}}</td>
                                            <td><a @click="viewReservation(active.id)" href="javascript:void(0)">View Reservation</a></td>
                                        </tr>
                                    </tbody>
                                </table>

                        </div>

                    </div> -->

                     <div class="card">
                            <div class="card-header card-default" style="background:#343A40;color:white;"><span>Records</span> <button style="color:white;display:none;" @click="showaddTransactModal = true" class="btn btn-default float-right"><span class="fa fa-plus"></span> New Transaction</button></div>
                        <div class="card-body">

                            <div class="card">
                                 <div class="card-header card-default"><span class="card-title">Active</span></div>
                                        <div class="card-body">
                                            
                                        <table class="table table-condensed table-hover table-striped">
                                    <thead>
                                    <tr>
                                        <th>Transaction Code</th>
                                        <th>Branch</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Dentist</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr @dblclick="viewTransaction(pending.id)" style="cursor:pointer;" v-for="(pending,index) in pendingTransaction" :key="index">
                                            <td>{{pending.transactionNo}}</td>
                                            <td>{{pending.Branch.branch}}</td>
                                            <td>{{dDate(pending.transactionDate)}}</td>
                                            <td>{{dDate(pending.transactionEndDate)}}</td>
                                            <td>{{pending.dentist}}</td>
                                            <td>{{getStatus(pending.status)}}</td>
                                            <td><router-link :to="{name: 'transactioninfo',params: {idno: pending.id}}">View Transaction Details</router-link></td>

                                        </tr>
                                    </tbody>
                                </table>
                                        </div>
                            </div>


                                  <div class="card">
                                 <div class="card-header card-default"><span class="card-title">History</span></div>
                                        <div class="card-body">
                                            
                                        <table class="table table-condensed table-striped">
                                    <thead>
                                    <tr>
                                        <th>Transaction Code</th>
                                        <th>Branch</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Dentist</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                      <tbody>
                                        <tr @dblclick="viewTransaction(done.id)" style="cursor:pointer;" v-for="(done,index) in doneTransaction" :key="index">
                                            <td>{{done.transactionNo}}</td>
                                            <td>{{done.branchId}}</td>
                                            <td>{{dDate(done.transactionDate)}}</td>
                                            <td>{{dDate(done.transactionEndDate)}}</td>
                                            <td>{{done.dentist}}</td>
                                            <td>{{getStatus(done.status)}}</td>
                                            <td><router-link :to="{name: 'transactioninfo',params: {idno: done.id}}">View Transaction Details</router-link></td>

                                        </tr>
                                    </tbody>
                                </table>
                                        </div>
                            </div>
 
                                
                        </div>

                    </div>
        </div>

        <addTransactionModal v-if="showaddTransactModal" @closemodal="closemodal"/>
  
    </div>
</template>

<script>
import { formatBdayDate , formatHour  } from "@/helper/helper"
import editModal from "@/components/setting/staff/editModal"
import addTransactionModal from "@/components/backend/transaction/addModal"
import { mapActions,mapState, mapGetters } from 'vuex'
export default {
    data: function(){
        return {
                editInfo: {},
                showeditModal: false,
                showaddTransactModal: false,
                imgUrl: this.$store.state.imgUrl,
                statuspatient: true,
                archiveStatus: false,
                
        }
    },
   methods: {
       getarhiveStatus: function(){
           this.archiveStatus =  this.$store.state.user.userinfo.archive == 0 ? true : false
       },
       changestatus: function(){
           this.$store.dispatch("user/changearchivestatus",{status: this.archiveStatus, id: this.user.id})
       },
       viewReservation: function(id){
           alert(id)
       },
       viewTransaction: function(id){
           this.$router.push({name: 'transactioninfo',params: {idno: id}})
       },
      ...mapActions('user',[
          'getUserinfo'
      ]),

      ...mapActions('transaction',[
          'getUserTransaction',
      ]),
    edit: function(index){
        this.editInfo = this.user
        this.editInfo.index = index
        this.showeditModal = true
    },
    closemodal: function(){
       this.showaddTransactModal = false
       this.showeditModal = false
    }, 
    dDate: function(date){
        return formatBdayDate(date)
    },
    dHour: function(date){
        return formatHour(date)
    },
    getStatus: function(status){
        let statustring = ''
        switch(status){
            case 0:
                statustring = "On-Going / Pending"
                break
            case 1:
                statustring = "For Followup"
                break 
            case 2:
                statustring = "Done"
                break
            default: 
                break
        }

        return statustring
    },
    init: function(){
          this.getUserinfo(this.$route.params.idno).then(()=>{
        this.archiveStatus = this.user.archive == 0 ? true : false    
    })
    }
      
  },
  computed: {
      ...mapState({
          user: state=> state.user.userinfo,
      }),
      ...mapGetters('user',[
          'pendingTransaction',
          'doneTransaction',
          'activeReservation'
      ]),
      bday: {
          get: function(){
              return formatBdayDate(this.user.bday)
          }
      },
 
  },
  mounted(){
    this.$store.dispatch("activenav","patientnav")
    this.getUserinfo(this.$route.params.idno).then(()=>{
        this.archiveStatus = this.user.archive == 0 ? true : false    
    })

  },
  components: {
      editModal,
      addTransactionModal,
  }


}
</script>
