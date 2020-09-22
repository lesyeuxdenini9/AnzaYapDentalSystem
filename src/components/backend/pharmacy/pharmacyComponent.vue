<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <!-- <span class="pageheader"><i class="fa fa fa-medkit"></i> Pharmacy Sale(s)</span>
                    <hr/> -->
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
                    <div class="card">
                        <div class="card-body" style="background:dimgray; padding: 0 10px;">
                      
                            <div class="row">
                                <div class="col col-md-4">
                                      <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Prescription No</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="patient.prescriptionNo"/>
                                      </div>
                                </div>


                                   <div class="col col-md-4">
                                         <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Patient Name</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="patient.name"/>
                                      </div>

                                </div>

                            </div>

                  
                        </div>
                    </div>
                             <div class="row">
                                   <div class="col col-md-12">
                                             <div class="card"  style="height:450px;">
                                                <div class="card-header" style="background:#343A40;padding:0;">
                                                    <table class="table table-condensed" style="margin:0;padding:0;">
                                                        <thead>
                                                            <tr style="color:white;">
                                                                <th style="width: 10%">Code</th>
                                                                <th style="width: 20%">Product</th>
                                                                <th style="width: 25%">Description</th>
                                                                <th style="width: 10%">Price</th>
                                                                <th style="width: 10%">Stocks</th>
                                                                <th style="width: 10%">Qty</th>
                                                                <th style="width: 10%">Amount</th>
                                                                <th style="width: 5%"></th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                                <div class="card-body" style="overflow-y:auto !important;padding: 0;overflow-x:hidden">
                                                    <table class="table table-bordered" style="padding: 0;margin: 0;">
                                                        <tbody>
                                                            <tr v-for="(item,index) in items" :key="index">
                                                                <td style="width: 10%">{{item.code}}</td>
                                                                <td style="width: 20%">{{item.medicine}} ( {{item.brand}} )</td>
                                                                <td style="width: 25%">{{item.description}}</td>
                                                                <td style="width: 10%">{{$helper.roundToDecimal(item.price,2)}}</td>
                                                                <td style="width: 10%">{{$helper.roundToDecimal(item.stocks,2)}}</td>
                                                                <td style="width: 10%"><input @change="updateQtyAmount(index)" v-model="item.quantity" type="number" class="form-control"/></td>
                                                                <td style="width: 10%">{{$helper.roundToDecimal(item.amountvalue,2)}}</td>
                                                                <td style="width: 5%"><button @click="remove(item)"><span class="fa fa-times"></span></button></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                       
                                          
                                     
                             </div>

                               <div class="card" style="background:black; color:lime">
                                    <div class="card-body">
                                            <span style="font-size:20pt;font-weight:bold;" class="float-right">TOTAL AMOUNT: P {{$helper.roundToDecimal(totalAmount,2)}}</span>
                                    </div>
                                </div>
                                <hr/>
                                <div class="row">
                                    <div class="col col-md-9">
                                          <div class="row">
                                                <div class="col col-md-4">
                                                    <button @click="showItemListModal = true" style="font-size:16pt;" class="form-control btn btn-primary">
                                                        <span class="fa fa-medkit"></span>
                                                        Item List
                                                    </button>
                                                </div>

                                                <div class="col col-md-4">
                                                    <button @click="clearTable()" style="font-size:16pt;" class="form-control btn btn-primary">
                                                        <span class="fa fa-recycle"></span>
                                                        Clear Table
                                                    </button>
                                                
                                                </div>

                                                <div class="col col-md-4">
                                                <button @click="showlistModal = true" style="font-size:16pt;" class="form-control btn btn-primary">
                                                        <span class="fa fa-scroll"></span>
                                                        View Past Transactions
                                                    </button>
                                                </div>

                                                 <!-- <div class="col col-md-4">
                                                    <button @click="showItemListModal = true" style="font-size:16pt;" class="form-control btn btn-primary">
                                                        <span class="fa fa-money-check-alt"></span>
                                                       End of Day
                                                    </button>
                                                </div> -->

                                                <div class="col col-md-4">
                                                    <button disabled style="font-size:16pt;" class="form-control btn btn-default">
                                                        <!-- <span class="fa fa-medkit"></span>
                                                        Item List -->
                                                    </button>
                                                </div>


                                                <div class="col col-md-4">
                                                    <button disabled style="font-size:16pt;" class="form-control btn btn-default">
                                                        <!-- <span class="fa fa-medkit"></span>
                                                        Item List -->
                                                    </button>
                                                </div>

                                                <div class="col col-md-4">
                                                    <button disabled style="font-size:16pt;" class="form-control btn btn-default">
                                                        <!-- <span class="fa fa-medkit"></span>
                                                        Item List -->
                                                    </button>
                                                </div>
                                          </div>
                                    </div>

                                        
                                      <div class="col col-md-3">
                                         <button @click="checkout()" style="font-size:16pt;height:100%;background:#3258CA;color:white;" class="form-control btn btn-default">
                                              <span class="fa fa-check"></span>
                                            Checkout
                                        </button>
                                    </div>
                                </div>

        </div>


        <itemListModal :branch="branches[activebranchIndex].id" v-if="showItemListModal" @closemodal="closemodal" @addtoCart="addtoCart"/>
        <checkoutModal :branch="branches[activebranchIndex].id"  v-if="showcheckoutModal" :totalAmount="totalAmount" :patient="patient" :items="items" @closemodal="closemodal"/>
        <listModal :branch="branches[activebranchIndex].id" v-if="showlistModal" @closemodal="closemodal"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import itemListModal from "@/components/backend/pharmacy/itemListModal"
import checkoutModal from "@/components/backend/pharmacy/checkoutModal"
import listModal from "@/components/backend/pharmacy/transactionlistModal"
export default {
    components: {
        itemListModal,
        checkoutModal,
        listModal,
    },
    data: function(){
        return {
            activebranchIndex: 0,
            items: [],
            showItemListModal: false,
            totalAmount: 0,
            patient: {
                name: null,
                id: null,
                prescriptionId: null,
                prescriptionNo: null,
            },
            doneTypingInterval: 1000,
            typingTimer: '',
            showcheckoutModal: false,
            showlistModal: false,

        }
    },
    watch: {
        'patient.prescriptionNo': function(newval){
            clearTimeout(this.typingTimer)
            if(newval.length > 0){
                this.typingTimer = setTimeout(()=>{
                    this.$store.dispatch("transaction/getPrescriptInfoByRef",this.patient.prescriptionNo)
                        .then(()=>{
                                this.patient.name = this.prescriptInfo.Transaction.User.fullname
                                this.patient.id = this.prescriptInfo.Transaction.userId
                                this.patient.prescriptionId = this.prescriptInfo.id
                        })
                    
                 
				},this.doneTypingInterval)
            }else{
                this.patient.id = null
                this.patient.prescriptionId = null
            }
        },
    },
    computed: {
        ...mapState({
            prescriptInfo: state=> state.transaction.prescriptInfo,
            branches: state=> state.branch.branches
        })
    },
    methods: {
        checkout: function(){
            if(this.items.length == 0 ){
                this.$swal("No items in the cart","empty cart","warning")
            }else{
                this.showcheckoutModal = true
            }
            
        },
        calculateTotal: function(){
            let total = 0
            this.items.forEach((item)=>{
                total = total + parseFloat(item.amountvalue)
            })

            return total
        },
        closemodal: function(){
            this.showItemListModal = false
            this.showcheckoutModal = false
            this.showlistModal = false
        },
        clearTable: function(){
            this.items = []
            this.totalAmount = this.calculateTotal()
        },
        refreshData: function(index){
            let price = this.items[index].price
            this.items[index].price = ""
            this.items[index].price = price
        },
        updateQtyAmount: function(index){
            if(this.items[index].quantity > this.items[index].stocks){
                this.$swal("Insufficient stocks","","warning")
                this.refreshData(index)
                this.items[index].quantity = 1
            }

            if(this.items[index].quantity < 1) this.items[index].quantity = 1
           
            this.items[index].amountvalue = (parseFloat(this.items[index].quantity) * parseFloat(this.items[index].price))
            this.refreshData(index)
            this.totalAmount = this.calculateTotal()
            

            
        },
        remove: function(item){
            let itemindex = this.items.indexOf(item)
            this.items.splice(itemindex,1)
            this.totalAmount = this.calculateTotal()
        },
        addtoCart: function(med){
            med.quantity = 1
            med.amountvalue = 1 * parseFloat(med.price)
            if(this.items.length == 0){
                 this.items.push(med)
            }else{

                let findduplicate = this.items.filter((item)=>{
                    if(med.id == item.id) return item
                })

                if(findduplicate.length == 0) this.items.push(med)
            }

            this.totalAmount = this.calculateTotal()
        },
         changeFilterbranch: function(index){
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            this.activebranchIndex = index
            this.clearTable()

        },
    },
    mounted(){
        this.$store.dispatch("activenav","pharmacynav")
        this.$store.dispatch("branch/getList")
    }

}
</script>
