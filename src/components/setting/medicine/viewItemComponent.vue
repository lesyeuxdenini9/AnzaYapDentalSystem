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

                                    
                                     <div class="col-md-4">
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
                                          <td>{{stock.qty}}</td>
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
                                          <td>{{stock.qty}}</td>
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
                                          <td>{{stock.qty}}</td>
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