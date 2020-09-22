<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-download"></i> {{branch.branch}} {{typedes}} Stocks In</span>
                  <button @click="showaddstockModal = true" class="btn btn-primary float-right"><span class="fa fa-plus"></span> Add Stocks</button>
                    <button @click="printPDF" class="btn btn-danger float-right" style="margin-right:20px;"><span class="fa fa-file-pdf"></span> Pdf</button>
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
                                            <li v-for="(item,index2) in stock.Stockinitems" :key="index2">{{`${item.medicine} ${$helper.roundToDecimal(item.qty,2)} ${item.uom}`}} Expiration Date: {{item.ExpirationDate}}</li>
                                        </ul>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>

                        </table>
                        </div>
                    

                      </div>

        </div>

        <addstockModal :type="search.isPharmacy" :branch="branch" v-if="showaddstockModal" @closemodal="closemodal" @init="init"/>
  
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
                typedes: '',
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
                printPDF: function(){

                        let stocksin = this.stocksin.map((stock)=>{
                                    let items = ''
                                    stock.Stockinitems.forEach((item)=>{
                                        items = items + `* ${item.medicine} ${this.$helper.roundToDecimal(item.qty,2)} ${item.uom} Expiration Date: ${item.ExpirationDate}\n`
                                    })
                                return [stock.refno,stock.date,stock.manufacturer,stock.invoiceRefno,items]
                        })
                           
                        stocksin.sort()
                        stocksin.unshift(["STOCK REF NO","DATE","Supplier","INVOICE REF NO","ITEMS"])
                    
                        var docDefinition = {  
                        
                                // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                                footer: function(currentPage, pageCount) { 
                                return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                                },
                                pageOrientation: 'landscape',
                        content: [
                            {
                            text: `${this.branch.branch} ${this.typedes} Stocks In From ${this.$helper.formatBdayDate(this.search.start)} TO ${this.$helper.formatBdayDate(this.search.end)}`, alignment: 'center', margin: [0,0,0,20]
                            },
                            {
                                table: {
                                widths: ['auto','auto','auto','auto','*'],
                                body: stocksin
                                }
                            }
                        ]
                        
                        }
                        this.$pdfMake.createPdf(docDefinition).open();
                    },
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
            this.$store.dispatch('branch/getInfo', {idno: this.$route.params.branch, type: this.$route.params.type.split("=")[1]})
                .then(()=>{
                    const datenow = new Date()
                    this.search.start =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth(), 1))
                    this.search.end =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth()+1, 0))
                    this.search.branch = this.$route.params.branch
                    this.search.isPharmacy = this.$route.params.type.split("=")[1]
                    this.typedes = this.search.isPharmacy == 0 ? "Dental Clinic Item" : "Pharmacy Medicine"
                    this.init()
                })
                .catch(err=>console.log(err))
        }
}
</script>