<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-cogs"></i> Settings</span><hr/>

                             <!-- Content Row -->
          <div class="row">
                <!-- Earnings (Monthly) Card Example -->
            <div v-if="userinfo.usertype == 3" @click="changesetting('superadminlist')" class="col-xl-3 col-md-6 mb-4 setting">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">Super Admin(s)</div>
                      <div class="row no-gutters align-items-center">
                        <div class="col-auto">
                          <!-- <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">1</div> -->
                        </div>
                        
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-user-plus fa-2x text-gray-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>



                <!-- Earnings (Monthly) Card Example -->
            <div v-if="userinfo.usertype == 3 || userinfo.usertype == 0" @click="changesetting('adminlist')" class="col-xl-3 col-md-6 mb-4 setting">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-success text-uppercase mb-1">Admin(s)</div>
                      <div class="row no-gutters align-items-center">
                        <div class="col-auto">
                          <!-- <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">1</div> -->
                        </div>
                        
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-user-plus fa-2x text-gray-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <!-- Earnings (Monthly) Card Example -->
            <div v-if="userinfo.usertype == 3 || userinfo.usertype == 0" @click="changesetting('stafflist')" class="col-xl-3 col-md-6 mb-4 setting">
              <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-info text-uppercase mb-1">Staff(s)</div>
                      <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">4</div> -->
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-2x text-gray-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        
         
            
            <!-- Pending Requests Card Example -->
            <div v-if="userinfo.usertype == 3 || userinfo.usertype == 0" @click="changesetting('servicelist')" class="col-xl-3 col-md-6 mb-4 setting">
              <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-warning text-uppercase mb-1">Services & Treatments</div>
                      <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">18</div> -->
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-wrench fa-2x text-gray-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>


                        <!-- Earnings (Monthly) Card Example -->
            <div v-if="userinfo.usertype == 3 || userinfo.usertype == 0" @click="changesetting('dentistlist')" class="col-xl-3 col-md-6 mb-4 setting">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">Dentist(s)</div>
                      <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">4</div> -->
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-user-md fa-2x text-gray-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>


                         <!-- Earnings (Monthly) Card Example -->
            <div v-if="userinfo.usertype == 3 || userinfo.usertype == 0" @click="changesetting('medicinelist', {type: 0})" class="col-xl-3 col-md-6 mb-4 setting">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-success text-uppercase mb-1">Dental Clinic Item(s)<br><small>Inventory</small></div>
                      <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">4</div> -->
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-medkit fa-2x text-gray-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>


                                 <!-- Earnings (Monthly) Card Example -->
             <div v-if="userinfo.usertype == 3 || userinfo.usertype == 0" @click="changesetting('medicinelist',{type: 1})" class="col-xl-3 col-md-6 mb-4 setting">
              <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-info text-uppercase mb-1">Pharmacy Medicine<br><small>Inventory</small></div>
                      <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">4</div> -->
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-file-prescription fa-2x text-gray-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>



                   <div class="modal" tabindex="-1" role="dialog" v-if="showChangePassModal">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"><span class="fa fa-lock"></span> Change Password</h5>
                            <button type="button" class="close" @click="showChangePassModal=false" aria-label="Close">
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
                                    <label>Old Password <span style="color:maroon;">*</span></label>
                                    <input type="password" class="form-control" v-model="user.oldpass"/>
                                </div>

                                <div class="form-group">
                                    <label>New Password <span style="color:maroon;">*</span></label>
                                    <input type="password" class="form-control" v-model="user.password"/>
                                </div>

                                <div class="form-group">
                                    <label>Confirm Password <span style="color:maroon;">*</span></label>
                                    <input type="password" class="form-control" v-model="user.password_confirmation"/>
                                </div>
                        </div>

                        <div class="modal-footer">
                            <button @click="changepass" class="btn btn-primary"><span class="fa fa-check"></span> Update</button>
                        </div>
                        </div>
                    </div>
                 </div>

            
          </div>

          <hr/>
        <div class="row" style="background:white;">

            
            <!-- Earnings (Monthly) Card Example -->
            <div @click="showChangePassModal=true" class="col-xl-3 col-md-6 mb-4 setting">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">Change Password</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800"></div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-lock fa-2x text-gray-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                  <div v-if="userinfo.usertype == 3" @click="changesetting('branchlist')" class="col-xl-3 col-md-6 mb-4 setting">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-success text-uppercase mb-1">Branche(s)</div>
                      <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">4</div> -->
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-map-marker-alt fa-2x text-gray-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>




               <div v-if="userinfo.usertype == 3 || userinfo.usertype == 0" @click="showChangeSchedModal=true" class="col-xl-3 col-md-6 mb-4 setting">
              <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-lg font-weight-bold text-info text-uppercase mb-1">Schedules</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800"></div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clock fa-2x text-gray-500"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            

                   <div class="modal" tabindex="-1" role="dialog" v-if="showChangeSchedModal">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"><span class="fa fa-clock"></span> Manage Clinic Schedules</h5>
                            <button type="button" class="close" @click="showChangeSchedModal=false" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                              <ul class="nav nav-tabs">
            
                                <li class="nav-item" v-for="(branch,index) in branches" :key="index">
                                    <a v-if="index==0" @click="changeFilterbranch(branch.id,index)" class="active navbranch nav-link" href="javascript:void(0)">
                                             {{branch.branch}}
                                    </a>
                                    <a v-else @click="changeFilterbranch(branch.id,index)" class="navbranch nav-link" href="javascript:void(0)">
                                             {{branch.branch}}
                                    </a>
                                    
                                </li>
                             
                            </ul>   
        
                              <table class="table table-condensed">
                                  <thead>
                                    <tr>
                                        <th>Day(s)</th>
                                        <th>Active</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th></th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                      <tr v-for="(schedule,index) in branches[activebranchIndex].Schedules" :key="index">
                                        <td>{{schedule.day}}</td>
                                        <td>
                                          <span v-if="schedule.active == 0">No Operation</span>
                                          <span v-else>Active</span>
                                        </td>
                                        <td>
                                          <span v-if="schedule.active == 1">{{schedule.start}}</span>
                                          <span v-else>--:-- </span>
                                        </td>
                                        <td>
                                           <span v-if="schedule.active == 1">{{schedule.end}}</span>
                                             <span v-else>--:-- </span>
                                        </td>
                                        <td>
                                          <button @click="editSched(index)" class="btn btn-default"><span class="fa fa-pen"></span></button>
                                        </td>
                                      </tr>
                                  </tbody>

                              </table>
                           
                        </div>

                      
                        </div>
                    </div>
                 </div>


              <editSchedModal :editSchedInfo="editSchedInfo" v-if="showeditSchedModal" @closemodal="closemodal" @refreshschedule="refreshschedule"/>


          </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import editSchedModal from "@/components/setting/editSchedModal"
export default {
    name: 'settingIndexComponent',
    data: function(){
      return {
         user: {
                oldpass: '',
                password: '',
                password_confirmation: '',
            },
         showChangePassModal: false,
         showChangeSchedModal: false,
         errormsg: [],
         editSchedInfo: {},
         showeditSchedModal: false,
         activebranchIndex: 0,
      }
    },
    computed: {
         userinfo: function(){
            return JSON.parse(this.$store.state.userinfo)
        },
        ...mapState({
          schedules: state=> state.schedules,
          branches: state=> state.branch.branches,
        })
    },
    methods: {
      changeFilterbranch: function(branch,index){
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            this.activebranchIndex = index
            // this.$store.dispatch("getSchedules",branch)

            // this.filterbank = bank
            // this.getList(this.filterbank)
            // this.errormsg = []
            // this.$refs.errormessage.classList.remove("show")

        },
      closemodal: function(){
        this.showeditSchedModal = false
      },
      editSched: function(index){
        this.editSchedInfo = this.branches[this.activebranchIndex].Schedules[index]
        this.editSchedInfo.activeindex = this.activebranchIndex
        this.editSchedInfo.activebranch = this.branches[this.activebranchIndex].id
        this.showeditSchedModal = true
      },
      refreshschedule: function(data){
          this.$store.dispatch("branch/getList")
            .then(()=>{
                this.changeFilterbranch(data.branch,data.index)
            })
            .catch(err=>console.log(err))
      },
      changesetting: function(routename,params={}){
          this.$router.push({name: routename, params: params})
      },
      changepass: function(){
           this.$store.dispatch("user/changepass",this.user)
            .then((res)=>{
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
                                this.user = {
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
    mounted(){
       this.$store.dispatch("activenav","settingnav")
      //  this.$store.dispatch("getSchedules")
       this.$store.dispatch("branch/getList")
        .then((res)=>{
            this.changeFilterbranch(res[0].id,0)
        })
        .catch(err=>console.log(err))
    },
    components: {
      editSchedModal,
    }
}
</script>

<style scoped>
  .setting {
    cursor: pointer;
  }
</style>