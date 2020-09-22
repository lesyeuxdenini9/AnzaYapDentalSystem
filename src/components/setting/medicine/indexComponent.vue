<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-medkit"></i> {{typedes}} Inventory</span>
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
                  <div class="col-md-2">
                      <button @click="showstockin()" class="form-control"><span class="fa fa-download"></span> Stocks In</button>
                  </div>
                    <div class="col-md-2">
                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Stocks Status</span>
                                      </div>
                                      <select @change="setMedicinelist()" v-model="stockstatus" class="form-control">
                                        <option>ALL</option>
                                        <option>GOOD</option>
                                        <option>LOW</option>
                                        <option>NO STOCKS</option>
                                      </select>
                                  </div>
                  </div>

                    
              
                    <div class="col-md-4">
                      <input v-model="search" type="text" class="form-control" placeholder="Item or Code..."/>
                  </div>
                  <div class="col-md-1">
                      <button @click="searchItem()" class="form-control"><span class="fa fa-search"></span> Search</button>
                  </div>
                   <div class="col-md-1" style="text-align:right;">
                      <!-- <button @click="searchService()" style="margin-right:10px;" class="btn btn-success"><span class="fa fa-file-excel"></span> Excel</button> -->
                      <button @click="printPDF()" class="btn btn-xs btn-danger"><span class="fa fa-file-pdf"></span> PDF</button>
                  </div>
       
                  </div>
            <table class="table table-bordered" ref="testdata" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr style="background:#083D55;color:white;">
                      <th>Item</th>
                      <th>Brand</th>
                      <th>Description</th>
                      <th>Code</th>
                      <th>Scientific Name</th>
                      <th>Remaining Stock</th>
                      <th>Unit</th>
                      <th>Price</th>
                      <th width="10%">Stock Status</th>
                      
                      <th width="10%"></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(med,index) in medicineLists" :key="index">
                  
                     <td>{{med.medicine}}</td>
                     <td>{{med.brand}}</td>
                     <td>{{med.description}}</td>
                     <td>{{med.code}}</td>
                     <td>{{med.scientificName}}</td>
                     <td style="width:10%;">{{$helper.roundToDecimal(med.stocks,2)}}</td>
                     <td style="width:10%;">{{med.uom}}</td>
                      <td>{{$helper.roundToDecimal(med.price,2)}}</td>
                     <td v-html="getStatus(med.stocks,med.limitMin)"></td>
                   
                      <td style="text-align:center;" v-if="med.archive==0">

                            <!-- <button @click="edit(index)" style="margin-right:10px;color:green;" title="Update Informations"><span class="fa fa-pen"></span> </button>
                            <button @click="remove(index)" style="color:maroon;" title="Remove from the list"><span class="fa fa-times"></span> </button> -->
                            <router-link :to="{name: 'viewItemDetails',params: {idno: med.id}}"><button style="font-size:10pt;" class="btn btn-primary"><span class="fa fa-search"></span> View More</button></router-link>

                      </td>
                       <td style="text-align:center;" v-else>
                          <a href="javascript:void(0)" @click="retrieve(med.id)" style="color:green;">Retrieve</a>
                      </td>
                    </tr>
      
                  </tbody>
                </table>
  
        </div>

        <addModal  :activebranchIndex="activebranchIndex"  :type="type" v-if="showaddModal" @closemodal="closemodal()" @refreshlist="refreshlist"/>
        <editModal :activebranchIndex="activebranchIndex"  :editInfo="editInfo" v-if="showeditModal" @closemodal="closemodal()" @refreshlist="refreshlist"/>
    </div>
</template>

<script>

import addModal from "@/components/setting/medicine/addModal"
import editModal from "@/components/setting/medicine/editModal"

import { mapActions, mapState } from 'vuex'
export default {
    data: function(){
        return {
            showaddModal: false,
            editInfo: {},
            showeditModal: false,
            activebranchIndex: 0,
            medicineLists: [],
            stockstatus: 'ALL',
            search: '',
            type: 0,
            typedes: '',
            archiveStatus: true,
        }
    },
    methods: {
      changearchive: function(){
       this.$store.dispatch("branch/getListMedicineByArchive",{type:this.type,archive: this.archiveStatus}).then(()=>{
                    this.setMedicinelist()
                })
      },
       printPDF: function(){

            let medicineLists = this.medicineLists.map((med)=>{
              return [med.medicine,med.brand,med.description,med.code,med.scientificName,this.$helper.roundToDecimal(med.stocks,2),med.uom,this.$helper.roundToDecimal(med.price,2),this.getStatus2(med.stocks,med.limitMin)]
            })

            medicineLists.sort()
            medicineLists.unshift(["ITEM","BRAND","DESCRIPTION","CODE","SCIENTIFIC NAME","REMAINING STOCKS","UOM","PRICE","STATUS"])
           
            var docDefinition = {  
              
                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                    watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                    footer: function(currentPage, pageCount) { 
                      return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                      },
                      pageOrientation: 'landscape',
               content: [
                 {
                   text: `${this.branches[this.activebranchIndex].branch} ${this.typedes} Inventory as of ${this.$helper.formatBdayDate(new Date())} ${this.$helper.format12Hour(new Date())}`, alignment: 'center', margin: [0,0,0,20]
                 },
               {
                 table: {
                   widths: ['*','*','*','auto','auto','auto','auto','auto',100],
                   body: medicineLists
                 }
               }
              ]
              
            }
            this.$pdfMake.createPdf(docDefinition).open();
        },
        searchItem: function(){
            let data = {
              search: this.search,
              branch: this.branches[this.activebranchIndex].id,
              branchindex: this.activebranchIndex,
              type: this.type,
            }

            if(this.search == ""){
                this.$store.dispatch("branch/getListMedicineByArchive",{type:this.type,archive: this.archiveStatus}).then(()=>{
                    this.setMedicinelist()
                })
            }else{
               this.$store.dispatch("medicine/search",data).then((res)=>{
                 console.log(res)
                 this.setMedicinelist()
               })
            }

        },
        setMedicinelist: function(){
          
            if(this.stockstatus == "ALL"){
              this.medicineLists = this.branches[this.activebranchIndex].Medicines
            }else if(this.stockstatus == "LOW"){
              this.medicineLists = this.branches[this.activebranchIndex].Medicines.filter((med)=>{
                if(med.stocks > 0 && med.stocks <= med.limitMin) return med
              })
            }else if(this.stockstatus == "GOOD"){
                 this.medicineLists = this.branches[this.activebranchIndex].Medicines.filter((med)=>{
                if(med.stocks > med.limitMin) return med
              })
            }else{
                  this.medicineLists = this.branches[this.activebranchIndex].Medicines.filter((med)=>{
                if(med.stocks == 0) return med
              })
            }
        },
        getStatus: function(stock,limit){
          let des = ''
          if(stock == 0) des = "<span style='color:white;background:maroon;padding:10px 20px;border-radius:10px'>NO STOCKS</span>"
          if(stock > limit) des = "<span style='color:white;background:green;padding:10px 20px;border-radius:10px'>GOOD</span>"
          if(stock > 0 && stock <= limit) des = "<span style='color:white;background:orange;padding:10px 20px;border-radius:10px'>LOW</span>"
          return des
        },
        getStatus2: function(stock,limit){
          let des = ''
          if(stock == 0) des = "NO STOCKS"
          if(stock > limit) des = "GOOD"
          if(stock > 0 && stock <= limit) des = "LOW"
          return des
        },
        ...mapActions('medicine',[
          'getList',
          'removeList',
          'retrieveList',
        ]),
        showstockin: function(){
          let branch = this.branches[this.activebranchIndex].id
          this.$router.push({name: 'stocksin',params: {branch: branch, type: `type=${this.type}`}})
        },
        refreshlist: function(index){
             this.$store.dispatch("branch/getListMedicineByArchive",{type:this.type,archive: this.archiveStatus})
                .then(()=>{
                    this.changeFilterbranch(index)
                })
                .catch(err=>console.log(err))
        },
             retrieve: function(id){
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
                      this.retrieveList(id)
                      this.refreshlist(this.activebranchIndex)
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

            if(this.stockstatus == "ALL"){
              this.medicineLists = this.branches[this.activebranchIndex].Medicines
            }else if(this.stockstatus == "LOW"){
              this.medicineLists = this.branches[this.activebranchIndex].Medicines.filter((med)=>{
                if(med.stocks > 0 && med.stocks <= med.limitMin) return med
              })
            }else if(this.stockstatus == "GOOD"){
                 this.medicineLists = this.branches[this.activebranchIndex].Medicines.filter((med)=>{
                if(med.stocks > med.limitMin) return med
              })
            }else{
                  this.medicineLists = this.branches[this.activebranchIndex].Medicines.filter((med)=>{
                if(med.stocks == 0) return med
              })
            }

          
        },

        closemodal: function(){
             this.showaddModal = false
             this.showeditModal = false
             this.showpassModal = false
         },

        edit: function(index){
            this.editInfo = this.branches[this.activebranchIndex].Medicines[index]
            this.editInfo.index = index
            this.showeditModal = true
        },

        remove: function(index){
            if(confirm("Remove from active List?")){
                const medicine = this.branches[this.activebranchIndex].Medicines[index]
                medicine.index = index
                this.removeList(medicine)
                this.refreshlist(this.activebranchIndex)
            }
         
        },
    },
    computed: {
        ...mapState({
          medicines: state => state.medicine.medicines,
          branches: state => state.branch.branches
        })
    },
    mounted(){
      this.type = this.$route.params.type
      if(this.$route.params.stock){
        let stock = this.$route.params.stock
        this.stockstatus = stock
      }
      this.typedes = this.$route.params.type == 0 ? "Dental Clinic Item" : "Pharmacy Medicine"
       this.$store.dispatch("activenav","settingnav")  
      // this.getList()
         this.$store.dispatch("branch/getListMedicineByArchive",{type:this.type,archive: this.archiveStatus})
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