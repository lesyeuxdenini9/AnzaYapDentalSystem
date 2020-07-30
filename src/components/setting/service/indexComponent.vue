<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-wrench"></i> Service List</span>
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
                      <input v-model="search" type="text" class="form-control" placeholder="Service..."/>
                  </div>
                  <div class="col-md-2">
                      <button @click="searchService()" class="form-control"><span class="fa fa-search"></span> Search</button>
                  </div>
                  </div>
            <table class="table table-bordered" ref="testdata" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr style="background:#083D55;color:white;">
                      <th>Service</th>
                      <th>Description</th>
                      <th style="width:10%;">Estimated Price</th>
                      <th style="width:10%;"></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(service,index) in branches[activebranchIndex].Services" :key="index">
                  
                     <td>{{service.service}}</td>
                     <td>{{service.description}}</td>
                     <td>{{service.regularPrice}}</td>
                      <td>

                            <button @click="edit(index)" style="margin-right:10px;color:green;" title="Update Informations"><span class="fa fa-pen"></span> </button>
                            <button @click="remove(index)" style="color:maroon;" title="Remove from the list"><span class="fa fa-times"></span> </button>

                      </td>
                    </tr>
      
                  </tbody>
                </table>

  
        </div>

        <addModal :activebranchIndex="activebranchIndex" :type="0" v-if="showaddModal" @closemodal="closemodal()"  @refreshlist="refreshlist"/>
        <editModal :activebranchIndex="activebranchIndex" :editInfo="editInfo" v-if="showeditModal" @closemodal="closemodal()"  @refreshlist="refreshlist"/>
    </div>
</template>

<script>

import addModal from "@/components/setting/service/addModal"
import editModal from "@/components/setting/service/editModal"

import { mapActions, mapState } from 'vuex'
export default {
    data: function(){
        return {
            showaddModal: false,
            editInfo: {},
            showeditModal: false,
            activebranchIndex: 0,
            search: '',
        }
    },
    methods: {
        ...mapActions('service',[
          'getList',
          'removeList',
        ]),
        refreshlist: function(index){
             this.$store.dispatch("branch/getListService")
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
             this.$store.dispatch("branch/getListService")
        },

        closemodal: function(){
             this.showaddModal = false
             this.showeditModal = false
             this.showpassModal = false
         },

        edit: function(index){
            this.editInfo = this.branches[this.activebranchIndex].Services[index]
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
                    const service = this.branches[this.activebranchIndex].Services[index]
                    service.index = index
                    this.removeList(service)
                    this.refreshlist(this.activebranchIndex)
                }
              })
         
        },
        searchService: function(){
          let data = {
            search: this.search,
            branch: this.branches[this.activebranchIndex].id,
            branchindex: this.activebranchIndex
          }     

          if(this.search == ""){
            this.$store.dispatch("branch/getListService")
          } else{
            this.$store.dispatch("service/search",data)
          } 
        }
    },
    computed: {
        ...mapState({
          services: state => state.service.services,
          branches: state => state.branch.branches
        })
    },
    mounted(){
       this.$store.dispatch("activenav","settingnav")  
      // this.getList()
       this.$store.dispatch("branch/getListService")
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