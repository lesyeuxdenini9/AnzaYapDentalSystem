<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-user-lock"></i> SuperAdmin List</span>
                    <button class="float-right btn btn-primary" @click="showaddModal=true"><span class="fa fa-plus"></span> New</button>
                    <hr/>
    
                   
                  <div class="row">
                    <div class="col-md-4">
                      <input v-model="search" type="text" class="form-control" placeholder="Fullname..."/>
                  </div>
                  <div class="col-md-2">
                      <button @click="searchsuperAdmin()" class="form-control"><span class="fa fa-search"></span> Search</button>
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
                    <tr v-for="(user,index) in users" :key="index">
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
                            <button v-if="userinfo.id != user.id" @click="remove(index)" style="color:maroon;" title="Remove from the list"><span class="fa fa-times"></span> </button>

                      </td>
                    </tr>
      
                  </tbody>
                </table>
  

        </div>
        <addModal v-if="showaddModal" @closemodal="closemodal()" @refreshlist="refreshlist"/>
        <editModal :editInfo="editInfo" v-if="showeditModal" @closemodal="closemodal()" @refreshlist="refreshlist"/>
        <changepassModal :changepassData="changepassData" v-if="showpassModal" @closemodal="closemodal()"/>
    </div>
</template>

<script>
import { mapState , mapActions } from 'vuex'
import editModal from "@/components/setting/superadmin/editModal"
import addModal from "@/components/setting/superadmin/addModal"
import changepassModal from "@/components/setting/staff/changepassModal"
import {formatBdayDate} from "@/helper/helper"
export default {
    components: {
        editModal,
        changepassModal,
        addModal,
    },
    data: function(){
        return {
            editInfo: {},
            showeditModal: false,
            showaddModal: false,
            showpassModal: false,
            changepassData: {},
        }
    },
    methods: {
          searchsuperAdmin: function(){
            let data = {
                search: this.search,
                branch: null,
                type: 3,
              }     

              if(this.search == ""){
                this.getUsers({usertype: 3})
              } else{
                this.$store.dispatch("user/searchSuperadmin",data)
              } 

        },
         bdayformat: function(date){
           return formatBdayDate(date)
         },
        edit: function(index){
            this.editInfo = this.users[index]
            this.editInfo.index = index
            this.showeditModal = true
        },
         changePass: function(index){
            this.showpassModal = true,
            this.changepassData = this.users[index]
        },
        refreshlist: function(){
              this.getUsers({usertype: 3})
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
                    const user = this.users[index]
                    user.index = index
                    this.removeUser(user)
                    this.refreshlist()
                }
              })
         
        },
         closemodal: function(){
             this.showaddModal = false
             this.showeditModal = false
             this.showpassModal = false
         },
           ...mapActions('user',[
          'getUsers',
          'removeUser'
        ]),
    },
    computed: {
        ...mapState({
            users: state=> state.user.users,
        }),
         userinfo: function(){
            return JSON.parse(this.$store.state.userinfo)
        },
    },
    mounted(){
         this.$store.dispatch("activenav","settingnav")  
         this.getUsers({usertype: 3})
    }

}
</script>