<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-user-md"></i> Dentist List</span>
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
                  <div class="col col-md-2">
                      <button class="form-control" placeholder="Search">Search Filter</button>
                  </div>
                  </div>
            <table class="table table-bordered" ref="testdata" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr style="background:#083D55;color:white;">
                      <th>Fullname</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Gender</th>
                      <th>Licence</th>
                      <th>PTR</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(dentist,index) in branches[activebranchIndex].Dentists" :key="index">
                  
                     <td>{{dentist.fullname}}</td>
                     <td>{{dentist.email}}</td>
                     <td>{{dentist.address}}</td>
                     <td>{{dentist.contact}}</td>
                     <td>{{dentist.gender}}</td>
                     <td>{{dentist.licence}}</td>
                     <td>{{dentist.ptr}}</td>
                      <td>

                            <button @click="edit(index)" style="margin-right:10px;color:green;" title="Update Informations"><span class="fa fa-pen"></span> </button>
                            <button @click="remove(index)" style="color:maroon;" title="Remove from the list"><span class="fa fa-times"></span> </button>

                      </td>
                    </tr>
      
                  </tbody>
                </table>
  
        </div>

        <addModal :activebranchIndex="activebranchIndex" :type="0" v-if="showaddModal" @closemodal="closemodal()" @refreshlist="refreshlist"/>
        <editModal :activebranchIndex="activebranchIndex" :editInfo="editInfo" v-if="showeditModal" @closemodal="closemodal()" @refreshlist="refreshlist"/>
    </div>
</template>

<script>

import addModal from "@/components/setting/dentist/addModal"
import editModal from "@/components/setting/dentist/editModal"

import { mapActions, mapState } from 'vuex'
export default {
    data: function(){
        return {
            showaddModal: false,
            editInfo: {},
            showeditModal: false,
            activebranchIndex: 0,
        }
    },
    methods: {
        ...mapActions('dentist',[
          'getList',
          'removeList',
        ]),
         refreshlist: function(index){
             this.$store.dispatch("branch/getListDentist")
                .then(()=>{
                    this.changeFilterbranch(index)
                })
                .catch(err=>console.log(err))
        },
        changeFilterbranch: function(index){
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            this.activebranchIndex = index
        },

        closemodal: function(){
             this.showaddModal = false
             this.showeditModal = false
             this.showpassModal = false
         },

        edit: function(index){
            this.editInfo = this.branches[this.activebranchIndex].Dentists[index]
            this.editInfo.index = index
            this.showeditModal = true
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
                     const dentist = this.branches[this.activebranchIndex].Dentists[index]
                    dentist.index = index
                    this.removeList(dentist)
                    this.refreshlist(this.activebranchIndex)
                }
              })
         
        },
    },
    computed: {
        ...mapState({
          dentists: state => state.dentist.dentists,
          branches: state => state.branch.branches
        })
    },
    mounted(){
       this.$store.dispatch("activenav","settingnav")  
      //  this.getList()
       this.$store.dispatch("branch/getListDentist")
          .then(()=>{
              this.changeFilterbranch(0)
          })
          .catch(err=>console.log(err))

    },
    components: {
      addModal,
      editModal,
    }

}
</script>