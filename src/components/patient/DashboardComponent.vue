<template>
    <div>
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-user"></i> My Profile</span><hr/>
     <editModal :editInfo="editInfo" v-if="showeditModal" @closemodal="closemodal()" @refreshData="refreshData"/>
     <picModal :oldimg="user.img" v-if="showchangepicModal" @closemodal="closemodal" @refreshData="refreshData"/>
     
                   <div class="modal" ref="changePassModal" tabindex="-1" role="dialog" v-if="showChangePassModal">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"><span class="fa fa-lock"></span> Change Password</h5>
                            <button  type="button" class="close" @click="showChangePassModal=false" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                                    <div class="alert alert-danger alert-dismissible fade" ref="errormessage2" role="alert">
                            <span v-for="(error,index) in errormsg" :key="index">
                                   <span v-for="(msg,index2) in error" :key="index2">{{msg}}<br v-if="msg.length > 1"/></span>
                            </span>
                           
                            </div>

                                <div class="form-group">
                                    <label>Old Password</label>
                                    <input type="password" class="form-control" v-model="userchangepass.oldpass"/>
                                </div>

                                <div class="form-group">
                                    <label>New Password</label>
                                    <input type="password" class="form-control" v-model="userchangepass.password"/>
                                </div>

                                <div class="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" class="form-control" v-model="userchangepass.password_confirmation"/>
                                </div>
                        </div>

                        <div class="modal-footer">
                            <button @click="changepass" class="btn btn-primary"><span class="fa fa-check"></span> Update</button>
                        </div>
                        </div>
                    </div>
                 </div>


                    <!-- Content Row -->
                      <div class="card">
                            <div class="card-header card-default" style="background:#343A40;color:white;">Information(s)
                                <button @click="edit" class="float-right btn btn-default" style="color:white;"><span class="fa fa-pen"></span></button>
                            </div>
                        <div class="card-body">
              
                            <div class="col col-md-3" style="position:relative;">
                                <img ref="userimg" v-if="user.img == null" src="@/assets/default.png" style="height:20em;width:100%;"/>
                                <img ref="userimg" v-else :src="`${imgUrl}/${user.img}`"  style="height:20em;width:100%;"/>
                                  <button @click="showchangepicModal = true" class="form-control"><span class="fa fa-user"></span> Change Profile Picture</button>
                                        <button @click="showChangePassModal = true" class="form-control"><span class="fa fa-lock"></span> Change Password</button>
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


                                <div class="col-md-9" style="padding:0px 30px;">
                                <div class="form-group">
                                        <label>Medical History</label>
                                        <textarea type="text" class="form-control" v-model="user.history" readonly style="background:white;"/>
                                </div>
                            </div>


                        </div>
                        </div>

          </div>

          <!-- <pre>
            {{user}}
            </pre> -->

          <br/>

            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Pending Reservations</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">{{pendingReservation}}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-times fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-danger shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">No of Records</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">{{doneTransaction}}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-edit fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

               <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Followup Transaction</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">{{followupTransaction}}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-check fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

               <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Appointment Today</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">{{appointmentToday}}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clock fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          
        </div>
        
    

</template>

<script>
import {formatBdayDate,formatDate} from "@/helper/helper"
import { mapState, mapActions } from 'vuex'
import editModal from "@/components/patient/editProfileModal"
import picModal from "@/components/patient/changePicModal"
export default {
    data: function(){
       return {
             editInfo: {},
             showeditModal: false,
             showChangePassModal: false,
             showchangepicModal: false,
            userchangepass: {
                oldpass: '',
                password: '',
                password_confirmation: '',
            },
            errormsg: [],
            imgUrl: this.$store.state.imgUrl
       }
    },
    methods:{
        closemodal: function(){
            this.showeditModal = false
            this.showchangepicModal = false
        },
        edit: function(index){
            this.editInfo = this.user
            this.editInfo.index = index
            this.showeditModal = true
        },
        refreshData: function(){
               this.getUserinfo(this.userlogin.id)
        },
        ...mapActions('user',[
            'getUserinfo'
        ]),
             changepass: function(){
           this.$store.dispatch("user/changepass",this.userchangepass)
            .then((res)=>{
                console.log(this.userchangepass)
                        if(res.data.errors){
                                this.errormsg = res.data.errors
                                this.$refs.errormessage2.classList.add("show")
                            }else{
                                 this.$swal.fire(
                                    'Your password has been changed!',
                                    '',
                                    'success'
                                  )
                                this.showChangePassModal = false
                                this.userchangepass = {
                                        oldpass: '',
                                        password: '',
                                        password_confirmation: '',
                                }
                            }
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data.msg){
                                this.errormsg = err.response.data.msg
                                this.$refs.errormessage2.classList.add("show")
                        }
                    }) 
        },
    },
    computed: {
       
        ...mapState({
            user: state=> state.user.userinfo,
            userlogin: state => JSON.parse(state.userinfo)
        }),
        bday: {
          get: function(){
              return formatBdayDate(this.user.bday)
          }
        },
        doneTransaction: {
            get: function(){
                  //  let donetransact = this.user.Transactions.filter((transact)=>{
                  //       if(transact.status == 2) return transact
                  //  })

                  //  return donetransact[0] == null ?  "None" : donetransact.length
                  return this.user.Transactions.length
            }
        },
        followupTransaction: {
              get: function(){
                   let followuptransact = this.user.Transactions.filter((transact)=>{
                        if(transact.status == 1) return transact
                   })

                   return followuptransact[0] == null ? "None" : followuptransact.length
            }
        },
        pendingReservation: {
          get: function(){
            let pendingreservation = this.user.Reservations.filter((reservation)=>{
              if(reservation.status == 0) return reservation
            })

            return pendingreservation[0] == null ?  "None" : pendingreservation.length
          }
        },
        appointmentToday: {
          get: function(){
            let datetoday = formatDate(new Date())
            let appointReserve = this.user.Reservations.filter((reservation)=>{
              if((reservation.status == 1 || reservation.status == 4) && (String(datetoday) == String(reservation.date))) return reservation
            })

            return appointReserve[0] == null ?  "None" : appointReserve.length
          }
        }
    },
    mounted(){
       this.getUserinfo(this.userlogin.id)
       this.$store.dispatch("activenav","dashboardnav")
    },
    components: {
        editModal,
        picModal
    }
}
</script>

<style scoped>
    .ditem {
        position:relative;
    }
  
  .dashboard-item {
        margin-left: 20px;
        font-weight: bold;
        font-size: 24pt;
        position: absolute;
        top: 15pt;
    }

    .dashboard-item-count {
        position: absolute;
        top: 20px;
        right: 15px;
        font-weight: bold;
        font-size: 24pt;
    }

    tbody tr td {
        font-size: 20pt;
        font-weight: bold;
    }
</style>