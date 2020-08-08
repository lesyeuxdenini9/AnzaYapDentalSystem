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
                  <div class="col-md-2">
                      <button @click="searchItem()" class="form-control"><span class="fa fa-search"></span> Search</button>
                  </div>
       
                  </div>
            <table class="table table-bordered" ref="testdata" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr style="background:#083D55;color:white;">
                      <th>Item</th>
                      <th>Description</th>
                      <th>Code</th>
                      <th>Remaining Stock</th>
                      <th>Unit</th>
                      <th width="10%">Stock Status</th>
                      <!-- <th>Price</th> -->
                      <th width="10%"></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(med,index) in medicineLists" :key="index">
                  
                     <td>{{med.medicine}}</td>
                     <td>{{med.description}}</td>
                     <td>{{med.code}}</td>
                     <td style="width:10%;">{{med.stocks}}</td>
                     <td style="width:10%;">{{med.uom}}</td>
                     <td v-html="getStatus(med.stocks,med.limitMin)"></td>
                     <!-- <td>{{med.price}}</td> -->
                      <td style="text-align:center;">

                            <!-- <button @click="edit(index)" style="margin-right:10px;color:green;" title="Update Informations"><span class="fa fa-pen"></span> </button>
                            <button @click="remove(index)" style="color:maroon;" title="Remove from the list"><span class="fa fa-times"></span> </button> -->
                            <router-link :to="{name: 'viewItemDetails',params: {idno: med.id}}"><button style="font-size:10pt;" class="btn btn-primary"><span class="fa fa-search"></span> View More</button></router-link>

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
        }
    },
    methods: {
        searchItem: function(){
            let data = {
              search: this.search,
              branch: this.branches[this.activebranchIndex].id,
              branchindex: this.activebranchIndex,
              type: this.type,
            }

            if(this.search == ""){
                this.$store.dispatch("branch/getListMedicine",this.type).then(()=>{
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
        ...mapActions('medicine',[
          'getList',
          'removeList',
        ]),
        showstockin: function(){
          let branch = this.branches[this.activebranchIndex].id
          this.$router.push({name: 'stocksin',params: {branch: branch, type: `type=${this.type}`}})
        },
        refreshlist: function(index){
             this.$store.dispatch("branch/getListMedicine",this.type)
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
      this.typedes = this.$route.params.type == 0 ? "Dental Clinic Item" : "Pharmacy Medicine"
       this.$store.dispatch("activenav","settingnav")  
      // this.getList()
         this.$store.dispatch("branch/getListMedicine",this.type)
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