<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-download"></i> {{branch.branch}} Stocks In</span>
                  <button @click="showaddstockModal = true" class="btn btn-primary float-right"><span class="fa fa-plus"></span> Add Stocks</button>
                    <hr/>

                      <div class="card">


                            <div class="card-body">
                                           <div class="row">
                            <div class="col-md-3">
                                 <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Start Date</span>
                                      </div>
                                      <input type="date" class="form-control" v-model="search.start"/>
                            </div>
                            </div>

                               <div class="col-md-3">
                                 <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">End Date</span>
                                      </div>
                                      <input type="date" class="form-control" v-model="search.end"/>
                            </div>
                            </div>

                               <div class="col-md-3">
                                    <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Reference No</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="search.reference"/>
                            </div>
                            </div>

                               <div class="col-md-3">
                                    <button @click="init()" class="form-control btn btn-primary"><span class="fa fa-search"></span> Search</button>
                            </div>


                               <!-- <div class="col-md-3">
                                     <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Item</span>
                                      </div>
                                          <Select2 :settings="{multiple: true}" class="form-control" style="width:100%; !important;"
                                        :placeholder="ph"
                                         v-model="myValue" 
                                        :options="serviceOptions"
                                        />
                            </div>
                        </div> -->
                                </div>

                                  <table class="table table-condensede table-striped">
                            <thead>
                                <tr>
                                    <th>Stock Ref No</th>
                                    <th>Date</th>
                                    <th>Supplier</th>
                                    <th>Invoice Ref No</th>
                                    <th>Items</th>
                                    <th></th>
                                </tr>

                            </thead>

                            <tbody>
                                <tr v-for="(stock,index) in stocksin" :key="index">
                                    <td style="width:10%;">{{stock.refno}}</td>
                                    <td style="width:10%;">{{stock.date}}</td>
                                    <td  style="width:25%;">{{stock.manufacturer}}</td>
                                    <td  style="width:10%;">{{stock.invoiceRefno}}</td>
                                    <td style="width:35%;">
                                        <ul>
                                            <li v-for="(item,index2) in stock.Stockinitems" :key="index2">{{`${item.medicine} ${item.qty} ${item.uom}`}}</li>
                                        </ul>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>

                        </table>
                        </div>
                    

                      </div>

        </div>

        <addstockModal :branch="branch" v-if="showaddstockModal" @closemodal="closemodal" @init="init"/>
  
    </div>
</template>

<script>
// import Select2 from 'v-select2-component'
import { mapState } from 'vuex'
import { formatDate } from "@/helper/helper"
import addstockModal from "@/components/setting/medicine/addstockModal"
export default {
        components: {
         //   Select2,
         addstockModal
        },
        data: function(){
            return {
                search: {
                    start: '',
                    end: '',
                    reference: '',
                    item: '',
                    branch: '',
                    isPharmacy: 0,
                },
                myValue: [],
                ph: "Select Item name From Inventory",
                showaddstockModal: false,
            }
        },
        computed: {
            ...mapState({
                branch: state=> state.branch.branch,
                stocksin: state=> state.medicine.stocksin
            }),
            serviceOptions: {
                get: function(){
                    let x = -1
                    return  this.branch.Medicines.map((med)=>{
                        x++
                        return {id: x , text: `${med.medicine}`} 
                    
                    })

                }
            },
        },
        methods: {
            closemodal: function(){
                this.showaddstockModal = false
            },
            init: function(){
                 console.log(this.search)
                 this.$store.dispatch("medicine/getStocksin",this.search)
            },
        },
        mounted(){
               this.$store.dispatch("activenav","settingnav")  
            this.$store.dispatch('branch/getInfo',this.$route.params.branch)
                .then(()=>{
                    const datenow = new Date()
                    this.search.start =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth(), 1))
                    this.search.end =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth()+1, 0))
                    this.search.branch = this.$route.params.branch
                    this.init()
                })
                .catch(err=>console.log(err))
        }
}
</script>