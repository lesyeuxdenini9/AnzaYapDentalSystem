<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-users"></i> Staff List</span>
                  <button class="float-right btn btn-primary" @click="showaddModal=true"><span class="fa fa-plus"></span> New</button>
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
            
               
                  <div class="row">
                    <div class="col-md-4">
                      <input v-model="search" type="text" class="form-control" placeholder="Fullname..."/>
                  </div>
                  <div class="col-md-2">
                      <button @click="searchStaff()" class="form-control"><span class="fa fa-search"></span> Search</button>
                  </div>
                  </div>
            <table class="table table-bordered" ref="testdata" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr style="background:#083D55;color:white;">
                      <th>Employee No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Birthday</th>
                      <th>Gender</th>
                      <th>Contact No</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(user,index) in branches[activebranchIndex].Users" :key="index">
                      <td>{{user.employeeNo}}</td>
                      <td>{{user.fullname}}</td>
                      <td>{{user.email}}</td>
                      <td>{{user.address}}</td>
                      <td>{{bdayformat(user.bday)}}</td>
                      <td>{{user.gender}}</td>
                      <td>{{user.contact}}</td>
                      <td>

                            <button @click="edit(index)" style="margin-right:10px;color:green;" title="Update Informations"><span class="fa fa-pen"></span> </button>
                            <button @click="changePass(index)" style="margin-right:10px;color: blue;" title="Change Password"><span class="fa fa-key"></span> </button>
                            <button @click="remove(index)" style="color:maroon;" title="Remove from the list"><span class="fa fa-times"></span> </button>

                      </td>
                    </tr>
      
                  </tbody>
                </table>
  
        </div>

        <addModal :activebranchIndex="activebranchIndex" :type="1" v-if="showaddModal" @closemodal="closemodal()" @refreshlist="refreshlist"/>
        <editModal :activebranchIndex="activebranchIndex" :type="1" :editInfo="editInfo" v-if="showeditModal" @closemodal="closemodal()" @refreshlist="refreshlist"/>
        <changepassModal :changepassData="changepassData" v-if="showpassModal" @closemodal="closemodal()"/>
    </div>
</template>

<script>
import {formatBdayDate} from "@/helper/helper"
import addModal from "@/components/setting/staff/addModal"
import editModal from "@/components/setting/staff/editModal"
import changepassModal from "@/components/setting/staff/changepassModal"
import { mapActions, mapState } from 'vuex'
export default {
    data: function(){
        return {
            showaddModal: false,
            editInfo: {},
            showeditModal: false,
            showpassModal: false,
            changepassData: {},
            activebranchIndex: 0,
            search: '',
        }
    },
    methods: {
        //  ...mapActions('user/staff',[
        //     'getStaffList',
        // ])

        searchStaff: function(){
          let data = {
              search: this.search,
              branch: this.branches[this.activebranchIndex].id,
              branchindex: this.activebranchIndex,
              type: 1,
            }     

            if(this.search == ""){
             this.$store.dispatch("branch/getListUser",1)
            } else{
              this.$store.dispatch("user/search",data)
            } 

        },

        ...mapActions('user',[
          'getUsers',
          'removeUser'
        ]),
        refreshlist: function(data){
             this.$store.dispatch("branch/getListUser",1)
                .then(()=>{
                    this.changeFilterbranch(data.index)
                })
                .catch(err=>console.log(err))
        },
        closemodal: function(){
             this.showaddModal = false
             this.showeditModal = false
             this.showpassModal = false
         },
         bdayformat: function(date){
           return formatBdayDate(date)
         },
        edit: function(index){
            this.editInfo = this.branches[this.activebranchIndex].Users[index]
            this.editInfo.index = index
            this.showeditModal = true
        },
        changePass: function(index){
            this.showpassModal = true,
            this.changepassData = this.branches[this.activebranchIndex].Users[index]
        },
        remove: function(index){
  
             this.$swal({
                title: 'Remove from active List?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.value) {
                  const user = this.branches[this.activebranchIndex].Users[index]
                  user.index = index
                  this.removeUser(user)
                  this.refreshlist({index: this.activebranchIndex})
                }
              })
         
        },
         changeFilterbranch: function(index){
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            this.activebranchIndex = index
             this.$store.dispatch("branch/getListUser",1)
        },
    },
    computed: {
        ...mapState({
          users: state => state.user.users,
          branches: state => state.branch.branches
        })
    },
    mounted(){
       this.$store.dispatch("activenav","settingnav")  
      //  this.getUsers({usertype: 1})
      this.$store.dispatch("branch/getListUser",1)
        .then(()=>{
            this.changeFilterbranch(0)
        })
        .catch(err=>console.log(err))
    },
    components: {
      addModal,
      editModal,
      changepassModal
    }

}
</script>