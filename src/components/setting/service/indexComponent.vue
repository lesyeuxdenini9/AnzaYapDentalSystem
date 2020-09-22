<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-wrench"></i> Service & Treatment List</span>
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
                  <div class="col-md-2">
                       <toggle-button style="margin-top: 5px;" @change="changearchive()" v-model="archiveStatus" :sync="true"
                                    :labels="{checked: 'Active List', unchecked: 'Inactive List'}"
                                    :width="200"
                                    :font-size="18"
                                    :height="30"
                          />
                  </div>
                    <div class="col-md-4">
                      <input v-model="search" type="text" class="form-control" placeholder="Service..."/>
                  </div>
                  <div class="col-md-2">
                      <button @click="searchService()" class="form-control"><span class="fa fa-search"></span> Search</button>
                  </div>
                  <div class="col-md-4" style="text-align:right;">
                      <!-- <button @click="searchService()" style="margin-right:10px;" class="btn btn-success"><span class="fa fa-file-excel"></span> Excel</button> -->
                      <button @click="printPDF()" class="btn btn-xs btn-danger"><span class="fa fa-file-pdf"></span> PDF</button>
                  </div>
                  </div>
            <table class="table table-bordered" ref="testdata" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr style="background:#083D55;color:white;">
                      <th>Category</th>
                      <th>Service & Treatment</th>
                      <th>Description</th>
                      <th style="width:10%;">Estimated Price</th>
                      <th style="width:10%;"></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(service,index) in branches[activebranchIndex].Services" :key="index">
                     <td>{{service.category}}</td>
                     <td>{{service.service}}</td>
                     <td>{{service.description}}</td>
                     <td>{{$helper.roundToDecimal(service.regularPrice,2)}}</td>
                    <td v-if="service.archive == 0">

                            <button @click="edit(index)" style="margin-right:10px;color:green;" title="Update Informations"><span class="fa fa-pen"></span> </button>
                            <button @click="remove(index)" style="color:maroon;" title="Remove from the list"><span class="fa fa-times"></span> </button>
                            
                      </td>
                      <td v-else>
                           <a href="javascript:void(0)" @click="retrieve(index)" style="color:green;" title="Retrieve from the list">Retrieve</a>
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
            archiveStatus: true,
        }
    },
    methods: {
        ...mapActions('service',[
          'getList',
          'archiveList',
        ]),
        printPDF: function(){
          let listtitle = this.archiveStatus ? "Active" : "Inactive"

          let servicelist = this.branches[this.activebranchIndex].Services.map((service)=>{
            return [service.category,service.service,service.description,this.$helper.roundToDecimal(service.regularPrice,2)]
          }) 
          servicelist.sort()
          servicelist.unshift(['CATEGORY','SERVICE & TREATMENT','DESCRIPTION','ESTIMATED PRICE'])
           
            var docDefinition = {  
              
                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                    watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                    footer: function(currentPage, pageCount) { 
                      return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                      },
                     pageOrientation: 'landscape',
               content: [
                 {
                   text: `${this.branches[this.activebranchIndex].branch} Service & Treatment ${listtitle} List`, alignment: 'center', margin: [0,0,0,20]
                 },
               {
                 table: {
                   widths: ['*','*','*',100],
                   body: servicelist
                 }
               }
              ]
              
            }
            this.$pdfMake.createPdf(docDefinition).open();
        },
        refreshlist: function(index){
             this.$store.dispatch("branch/getListServiceByArchive",{archive: this.archiveStatus})
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
             this.$store.dispatch("branch/getListServiceByArchive",{archive: this.archiveStatus})
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
                    service.archivestatus = 1
                    service.index = index
                    this.archiveList(service)
                    this.refreshlist(this.activebranchIndex)
                }
              })
         
        },
        retrieve: function(index){
                     this.$swal({
                    title: 'Retrieve from List?',
                    text: "",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                  }).then((result) => {
                    if (result.value) {
                        const service = this.branches[this.activebranchIndex].Services[index]
                        service.archivestatus = 0
                        service.index = index
                        this.archiveList(service)
                        this.refreshlist(this.activebranchIndex)
                    }
                  })
        },
        changearchive: function(){
         this.$store.dispatch("branch/getListServiceByArchive",{archive: this.archiveStatus})
        },
        searchService: function(){
          let data = {
            search: this.search,
            branch: this.branches[this.activebranchIndex].id,
            branchindex: this.activebranchIndex
          }     

          if(this.search == ""){
            this.$store.dispatch("branch/getListServiceByArchive",{archive: this.archiveStatus})
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
       this.$store.dispatch("branch/getListServiceByArchive",{archive: this.archiveStatus})
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