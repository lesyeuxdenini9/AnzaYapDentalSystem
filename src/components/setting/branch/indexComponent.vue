<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-map-marker-alt"></i> Branch List</span>
                    <button class="float-right btn btn-primary" @click="showaddModal=true"><span class="fa fa-plus"></span> New</button>
                    <hr/>

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
                      <input v-model="search" type="text" class="form-control" placeholder="Branch name..."/>
                  </div>
                  <div class="col-md-2">
                      <button @click="searchBranch()" class="form-control"><span class="fa fa-search"></span> Search</button>
                  </div>
                  <div class="col-md-4" style="text-align:right;">
                      <!-- <button @click="searchService()" style="margin-right:10px;" class="btn btn-success"><span class="fa fa-file-excel"></span> Excel</button> -->
                      <button @click="printPDF()" class="btn btn-xs btn-danger"><span class="fa fa-file-pdf"></span> PDF</button>
                  </div>
                  </div>

                    <table class="table table-bordered" ref="testdata" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr style="background:#083D55;color:white;">
                                <th>#</th>
                                <th>Branch</th>
                                <th>Address</th>
                                <th>Contact</th>
                                <th>Email Address</th>
                                <th>TIN</th>
                                <th>VAT</th>
                                <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(branch,index) in branches" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{branch.branch}}</td>
                                    <td>{{branch.address}}</td>
                                    <td>{{branch.contact}}</td>
                                    <td>{{branch.email}}</td>
                                    <td>{{branch.tin}}</td>
                                    <td>{{branch.vat}} %</td>
                                    <td v-if="branch.archive == 0">              
                                        <button @click="edit(index)" style="margin-right:10px;color:green;" title="Update Informations"><span class="fa fa-pen"></span> </button>
                                        <button @click="remove(index)" style="color:maroon;" title="Remove from the list"><span class="fa fa-times"></span> </button>
                                    </td>
                                       <td v-else>
                                        <a href="javascript:void(0)" @click="retrieve(index)" style="color:green;">Retrieve</a>
                                    </td>
                                </tr>
                            </tbody>

                    </table>

        </div>

        <addModal :type="0" v-if="showaddModal" @closemodal="closemodal()"/>
         <editModal :editInfo="editInfo" v-if="showeditModal" @closemodal="closemodal()"/>
    </div>
</template>

<script>
import addModal from "@/components/setting/branch/addModal"
import editModal from "@/components/setting/branch/editModal"
import { mapState } from "vuex"
export default {
    components: {
        addModal,
        editModal,
    },
    data: function(){
        return {
            showaddModal: false,
            showeditModal: false,
            search: '',
            archiveStatus: true,
        }
    },
    computed: {
        ...mapState({
            branches: state=> state.branch.branches
        })
    },
    methods: {
           changearchive: function(){
             this.$store.dispatch("branch/getListByArchive",this.archiveStatus)
           },
           printPDF: function(){
            

          let branchlist = this.branches.map((branch)=>{
            return [branch.branch, branch.address , branch.contact, branch.email, branch.tin, `${branch.vat} %`]
          }) 
          branchlist.sort()
          branchlist.unshift(['BRANCH','ADDRESS','CONTACT NO','EMAIL ADDRESS','TIN','VAT'])
           
            var docDefinition = {  

                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'landscape',
               content: [
                 {
                   text: `Branch List`, alignment: 'center', margin: [0,0,0,20]
                 },
               {
                 table: {
                   widths: ['*','*','auto','auto','auto','auto'],
                   body: branchlist
                 }
               }
              ]
              
            }
            this.$pdfMake.createPdf(docDefinition).open();
        },
        searchBranch: function(){
            if(this.search == ""){
                this.$store.dispatch("branch/getListByArchive",this.archiveStatus)
            }else{
                this.$store.dispatch("branch/search",this.search)
            }
        },
        closemodal: function(){
            this.showaddModal = false
            this.showeditModal = false
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
                    const branch = this.branches[index]
                    branch.index = index
                    branch.archive = 1
                    this.$store.dispatch("branch/archivelist",branch)
                    this.$store.dispatch("branch/getListByArchive",this.archiveStatus)
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
                    const branch = this.branches[index]
                    branch.index = index
                    branch.archive = 0
                    this.$store.dispatch("branch/archivelist",branch)
                    this.$store.dispatch("branch/getListByArchive",this.archiveStatus)
                }
              })
         
        },
        edit: function(index){
            this.editInfo = this.branches[index]
            this.editInfo.index = index
            this.showeditModal = true
        }
    },
    mounted(){
           this.$store.dispatch("activenav","settingnav")  
           this.$store.dispatch("branch/getListByArchive",this.archiveStatus)
    }

}
</script>
