<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-medkit"></i> Item Details</span>
                  <button @click="back()" class="float-right"><span class="fa fa-times"></span></button>
                    <hr/>

                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                    <div class="col-md-4">
                                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Item</span>
                                      </div>
                                      <input type="text" class="form-control" readonly style="background:white;" v-model="medicine.medicine"/>
                                  </div>

                                    </div>

                                       <div class="col-md-4">
                                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Brand</span>
                                      </div>
                                      <input type="text" class="form-control" readonly style="background:white;" v-model="medicine.brand"/>
                                  </div>

                                    </div>

                                     <div class="col-md-4">
                                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Description</span>
                                      </div>
                                      <input type="text" class="form-control" readonly style="background:white;" v-model="medicine.description"/>
                                  </div>

                                    </div>

                                           <div class="col-md-4">
                                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Scientific Name</span>
                                      </div>
                                      <input type="text" class="form-control" readonly style="background:white;" v-model="medicine.scientificName"/>
                                  </div>

                                    </div>


                                     <div class="col-md-4">
                                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Item Code</span>
                                      </div>
                                      <input type="text" class="form-control" readonly style="background:white;" v-model="medicine.code"/>
                                  </div>

                                    </div>

                                    
                                  
                                       
                                     <div class="col-md-4">
                                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Stock Status</span>
                                      </div>
                                      <input type="text" class="form-control" readonly style="background:white;" v-model="stockstatus"/>
                                  </div>

                                    </div>

                                    
                                

                                       <div class="col-md-4">
                                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Remaining Stocks</span>
                                      </div>
                                      <input type="text" class="form-control" readonly style="background:white;" v-model="medicine.stocks"/>
                                  </div>

                                    </div>

                                    
                                     <div class="col-md-4">
                                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Unit Measurement</span>
                                      </div>
                                      <input type="text" class="form-control" readonly style="background:white;" v-model="medicine.uom"/>
                                  </div>

                                    </div>

                                    
                                     <div class="col-md-2">
                                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Price</span>
                                      </div>
                                      <input type="text" class="form-control" readonly style="background:white;" v-model="medicine.price"/>
                                  </div>

                                    </div>

                                       <div class="col-md-2">
                                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Limit Stocks</span>
                                      </div>
                                      <input type="text" class="form-control" readonly style="background:white;" v-model="medicine.limitMin"/>
                                  </div>

                                    </div>



                                       <div class="col-md-2">
                                           <button @click="edit()" class="btn btn-success form-control"><span class="fa fa-pen"></span> Edit</button>

                                    </div>

                                       <div class="col-md-2">
                                          <button @click="remove()" class="btn btn-danger form-control"><span class="fa fa-times"></span> Remove</button>

                                    </div>
                            </div>

                            <hr/>

                              <ul class="nav nav-tabs">
            
                                      <li class="nav-item"><a @click="changeFilterstock('in',0)" class="active navfilterstock nav-link" href="javascript:void(0)">Stocks In</a></li>
                                      <li v-if="medicine.type == 0" class="nav-item"><a @click="changeFilterstock('out',1)" class="navfilterstock nav-link" href="javascript:void(0)">Stocks Out</a></li>
                                      <li v-else class="nav-item"><a @click="changeFilterstock('out2',1)" class="navfilterstock nav-link" href="javascript:void(0)">Stocks Out</a></li>
                              </ul>
                              <br/>

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
                                    <button @click="init()" class="form-control btn btn-primary"><span class="fa fa-search"></span> Search</button>
                            </div>
                            
                              <div class="col-md-3">
                                    <button @click="printStocksIN()" ref="stockin" class="btn btn-danger"><span class="fa fa-file-pdf"></span> PDF</button>
                                    <button @click="printStocksOUT(0)" ref="stockout" class="btn btn-danger" style="display:none;"><span class="fa fa-file-pdf"></span> PDF</button>
                                    <button @click="printStocksOUT(1)" ref="stockout2" class="btn btn-danger"  style="display:none;"><span class="fa fa-file-pdf"></span> PDF</button>
                            </div>

                              </div>

                              <table class="table table-condensed table-striped" v-if="filterstock == 'in'">
                                  <thead>
                                      <tr>
                                          <th>StockIn RefNo</th>
                                          <th>Date</th>
                                          <th>Supplier</th>
                                          <th>Invoice RefNo</th>
                                          <th>Quantity</th>
                                          <th>Unit of Measurement</th>
                                          <th>Expiration Date</th>
                                      </tr>
                                  </thead>

                                  <tbody>
                                      <tr v-for="(stock,index) in medicine.Stockinitems" :key="index">
                                          <td>{{stock.Stockin.refno}}</td>
                                          <td>{{stock.Stockin.date}}</td>
                                          <td>{{stock.Stockin.manufacturer}}</td>
                                          <td>{{stock.Stockin.invoiceRefno}}</td>
                                          <td>{{$helper.roundToDecimal(stock.qty,2)}}</td>
                                          <td>{{stock.uom}}</td>
                                          <td>{{stock.ExpirationDate}}</td>
                                      </tr>
                                  </tbody>

                              </table>

                              <table v-else-if="filterstock == 'out'" class="table table-condensed table-striped">
                                        <thead>
                                      <tr>
                                          <th>Transaction RefNo</th>
                                          <th>Date</th>
                                          <th>Dentist</th>
                                          <th>Treatment</th>
                                          <th>Quantity</th>
                                          <th>Unit of Measurement</th>
                                      </tr>
                                  </thead>

                                     <tbody>
                                      <tr v-for="(stock,index) in medicine.Stockouts" :key="index">
                                          <td>{{stock.Transaction.transactionNo}}</td>
                                          <td>{{dDate(stock.createdAt)}}</td>
                                          <td>{{stock.Transaction.Dentist.fullname}}</td>
                                          <td>
                                              <span>{{stock.Action.Treatment.service}}</span>
                                              <br/>
                                              <span style="font-size: 10pt">Date: {{stock.Action.date}}</span>
                                              
                                          </td>
                                          <td>{{$helper.roundToDecimal(stock.qty,2)}}</td>
                                          <td>{{stock.Medicine.uom}}</td>
                                      </tr>
                                  </tbody>

                              </table>

                                <table v-else class="table table-condensed table-striped">
                                        <thead>
                                      <tr>
                                          <th>Purchase RefNo</th>
                                          <th>Date</th>
                                          <th>Quantity</th>
                                          <th>Unit of Measurement</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="(stock,index) in medicine.Billitems" :key="index">
                                          <td>{{stock.Billing.billrefNo}}</td>
                                          <td>{{dDate(stock.Billing.createdAt)}}</td>
                                          <td>{{$helper.roundToDecimal(stock.qty,2)}}</td>
                                          <td>{{stock.Medicine.uom}}</td>
                                      </tr>
                                  </tbody>

                                </table>

                        </div>

                    </div>

                    <editModal :editInfo="editInfo" v-if="showeditModal" @closemodal="closemodal" @init="init"/>

                    <!-- <pre>

                        {{medicine}}

                    </pre>  -->

        </div>
  
    </div>
</template>

<script>
import { mapState } from 'vuex'
import editModal from "@/components/setting/medicine/editModal"
export default {
    data: function(){
        return {
            filterstock: "in",
            search: {
                start: '',
                end: '',
                id: this.$route.params.idno
            },
            showeditModal: false,
            editInfo: {},
        }
    },
    methods: {

        printStocksOUT: function(index){
 
            let stocksout
            let orientation


            if(index == 0 ){
                 stocksout = this.medicine.Stockouts.map((stock)=>{
                    return [stock.Transaction.transactionNo,this.dDate(stock.createdAt),stock.Transaction.Dentist.fullname,`${stock.Action.Treatment.service}\nDate: ${stock.Action.date}`,this.$helper.roundToDecimal(stock.qty,2),stock.Medicine.uom]
                })
                stocksout.sort()
                stocksout.unshift(["TRANSACTION REF NO","DATE","DENTIST","TREATMENT","QUANTITY","UOM"])
                orientation = "landscape"
            }else{
                stocksout = this.medicine.Billitems.map((stock)=>{
                    return [stock.Billing.billrefNo,this. dDate(stock.Billing.createdAt),this.$helper.roundToDecimal(stock.qty,2),stock.Medicine.uom ]
                })
                stocksout.sort()
                stocksout.unshift(["PURCHASE REF NO","DATE","QUANTITY","UOM"])
                orientation = "portrait"
            }
           
            let width = index == 0 ? ['auto','auto','auto','*','auto','auto'] : ['*','auto','auto','*']

            var docDefinition = {  
                        
                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                    watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                    footer: function(currentPage, pageCount) { 
                    return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                    },
                    pageOrientation:orientation,
                    content: [
                            {
                            text: `${this.medicine.medicine} ( ${this.medicine.brand} ) Stocks Out From ${this.$helper.formatBdayDate(this.search.start)} TO ${this.$helper.formatBdayDate(this.search.end)}`, alignment: 'center', margin: [0,0,0,20]
                            },
                            {
                                table: {
                                widths: width,
                                body: stocksout
                                }
                            }
                        ]
                        
                        }
                this.$pdfMake.createPdf(docDefinition).open();
        },
        printStocksIN: function(){
            let stocksin = this.medicine.Stockinitems.map((stock)=>{
                return [stock.Stockin.refno,stock.Stockin.date,stock.Stockin.manufacturer,stock.Stockin.invoiceRefno,this.$helper.roundToDecimal(stock.qty,2),stock.uom,stock.ExpirationDate]
            })

            stocksin.sort()
            stocksin.unshift(["STOCK REF NO","DATE","SUPPLIER","INVOICE REF NO","QUANTITY","UOM","EXPIRATION DATE"])

                         var docDefinition = {  
                        
                                // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                                footer: function(currentPage, pageCount) { 
                                return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                                },
                                pageOrientation: 'landscape',
                        content: [
                            {
                            text: `${this.medicine.medicine} ( ${this.medicine.brand} ) Stocks In From ${this.$helper.formatBdayDate(this.search.start)} TO ${this.$helper.formatBdayDate(this.search.end)}`, alignment: 'center', margin: [0,0,0,20]
                            },
                            {
                                table: {
                                widths: ['*','auto','*','auto','auto','auto','*'],
                                body: stocksin
                                }
                            }
                        ]
                        
                        }
                        this.$pdfMake.createPdf(docDefinition).open();

        },
        edit: function(){
            this.showeditModal = true
            this.editInfo = this.medicine
        },
        closemodal: function(){
            this.showeditModal = false
        },
        dDate: function(date){
            return this.$helper.formatDate(date)
        },
        changeFilterstock: function(filterstock,index){
             const navfilterstock = document.getElementsByClassName('navfilterstock')
            for(let x = 0 ; x < navfilterstock.length ; x++){
                 navfilterstock[x].classList.remove('active')
            }
            navfilterstock[index].classList.add('active')
            this.filterstock = filterstock
         
            if(filterstock=="in"){
                this.$refs.stockin.style.display = "block"
                this.$refs.stockout.style.display = "none"
                this.$refs.stockout2.style.display = "none"
            }else if(filterstock == "out"){
                this.$refs.stockin.style.display = "none"
                this.$refs.stockout.style.display = "block"
                this.$refs.stockout2.style.display = "none"
            }else{
                this.$refs.stockin.style.display = "none"
                this.$refs.stockout.style.display = "none"
                this.$refs.stockout2.style.display = "block"
            }
        },
        back: function(){
            this.$router.go(-1)
        },
        init: function(){
             this.$store.dispatch("medicine/getInfo",this.search)
        },
         remove: function(){

                this.$swal({
                title: 'Remove from List??',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
              }).then((result) => {
                if (result.value) {
                    this.$store.dispatch("medicine/removeList",{id: this.$route.params.idno})
                    .then(()=>{
                        this.$swal("Item has been removed","","success")
                        this.$router.push({name: 'medicinelist', params: {type: this.medicine.type}})
                    })
                    .catch(err=>console.log(err))
                }
              })
         
        },
    },
    computed: {
        ...mapState({
            medicine: state=> state.medicine.medicine
        }),
        stockstatus: {
            get: function(){
                 let des = ''
                if(this.medicine.stocks == 0) des = "NO STOCKS"
                if(this.medicine.stocks > this.medicine.limitMin) des = "GOOD"
                if(this.medicine.stocks > 0 && this.medicine.stocks <= this.medicine.limitMin) des = "LOW"
                return des
            }
        }
    },
    mounted(){
        this.$store.dispatch("activenav","settingnav")
        const datenow = new Date()
        this.search.start =  this.$helper.formatDate(new Date(datenow.getFullYear(), datenow.getMonth(), 1))
        this.search.end = this.$helper.formatDate(new Date(datenow.getFullYear(), datenow.getMonth()+1, 0))
        this.init()
        
    },
    components: {
        editModal
    }

}
</script>