<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-file-alt"></span> Transaction No {{transactionInfo.transactionNo}}</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                          
                            <table class="table table-condensed">
                                    <thead>
                                        <tr>
                                          
                                            <th>Treatment</th>
                                            <th style="width:20%;">Estimated Price</th>
                                            <th style="width:20%;position:relative;">Actual Price
                                                <button ref="editbtn" @click="editactualprice()" v-if="transactionInfo.status != 2 && transactionInfo.Billings.length == 0" style="position:absolute;right:0;">
                                                    <span :class="editpen"></span>
                                                 </button>

                                                     <button ref="confirmbtn" @click="confirmactualprice()" v-if="transactionInfo.status != 2" class="hidden" style="position:absolute;right:0;">
                                                    <span :class="check"></span>
                                                 </button>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="(treatment,index) in transactionInfo.Treatments" :key="index">
                                        
                                            <td>{{treatment.service}}</td>
                                            <td>{{$helper.roundToDecimal(treatment.amount,2)}}</td>
                                            <td>
                                                <span v-if="!editprice">{{$helper.roundToDecimal(treatment.actualAmount,2)}}</span>
                                                <input v-else @change="changeactualamount(index)" type="number" class="form-control actualamount" v-model="treatment.actualAmount"/>
                                            </td>
                                        </tr>
                                          <tr style="padding:0px;font-size:18pt;font-weight:bold;">
                                            <td colspan="2" style="text-align:right;padding:0px;">Net of Vat:</td>
                                            <td style="text-align:right;padding:0px;">{{ $helper.roundToDecimal((totalrawAmount/(1+(transactionInfo.Branch.vat/100))),2)}}</td>
                                        </tr>
                                          <tr style="padding:0px;font-size:18pt;font-weight:bold;">
                                            <td colspan="2" style="text-align:right;padding:0px;">Vat ({{transactionInfo.Branch.vat}} %):</td>
                                            <td style="text-align:right;padding:0px;">{{$helper.roundToDecimal((totalrawAmount/(1+(transactionInfo.Branch.vat/100))) * (transactionInfo.Branch.vat/100),2)}}</td>
                                        </tr>
                                            <tr style="padding:0px;font-size:18pt;font-weight:bold;">
                                            <td colspan="2" style="text-align:right;padding:0px;">Gross Amount:</td>
                                            <td style="text-align:right;padding:0px;">{{$helper.roundToDecimal(totalrawAmount,2)}}</td>
                                        </tr>
                                         <tr style="padding:0px;font-size:18pt;font-weight:bold;">
                                            <td colspan="2" style="text-align:right;padding:0px;">Discount Amount:</td>
                                            <td style="text-align:right;padding:0px;">{{$helper.roundToDecimal(transactionInfo.discount,2)}}</td>
                                        </tr>
                                        <tr style="padding:0px;font-size:18pt;font-weight:bold;">
                                            <td colspan="2" style="text-align:right;padding:0px;">Grand Total Amount:</td>
                                            <td style="text-align:right;padding:0px;">{{$helper.roundToDecimal(totalAmountFinal,2)}}</td>
                                        </tr>
                                    </tbody>

                            </table>

                            <hr/>
                            <!-- KUNG NEED NG DISCOUNT -->
                            <div class="row">
                                <div class="col-md-12">
                                           <div class="input-group mb-6">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Discount</span>
                                      </div>
                                          <input :readonly="transactionInfo.Billings.length>0" @change="addDiscount()" type="number" class="form-control" v-model="transactionInfo.discount"/>
                                      </div>
                                </div>
                            </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                    <div class="card">
                                            <div class="card-header bg-default"></div>
                                            <div class="card-body">
                                                <span style="font-size:18pt;font-weight:bold;color:dimgray;">Amount Paid : {{$helper.roundToDecimal(totalAmountPaid,2)}}</span>
                                            </div>
                                    </div>
                                    </div>

                                       <div class="col-md-6">
                                    <div class="card">
                                            <div class="card-header bg-default"></div>
                                            <div class="card-body">
                                                <span style="font-size:18pt;font-weight:bold;color:dimgray;">Balance : {{$helper.roundToDecimal(totalAmountBalance,2)}}</span>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                                

                                  <div class="card">
                                        <div class="card-header" style="background:#343A40;color:white;"><span class="card-title"><button @click="showbillpaymentModal=true" class="float-left btn btn-default text-white"><span class="fa fa-plus"></span> Create Payment</button></span></div>
                                        <div class="card-body">
                                                <table class="table table-condensed">
                                                    <thead>
                                                        <tr>
                                                            <th>Referrence No</th>
                                                            <th>Type</th>
                                                            <th>Payment</th>
                                                            <th>Date</th>
                                                            
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr v-for="(bill,index) in transactionInfo.Billings" :key="index">
                                                            <td><a :href="`../bill/${bill.id}`" target="_blank">{{bill.billrefNo}}</a></td>
                                                            <td>
                                                                <span v-if="bill.type == 0">Cash</span>
                                                                <span v-else>HealthCard</span>
                                                            </td>
                                                            <td>{{$helper.roundToDecimal(bill.payment,2)}}</td>
                                                            <td>{{bill.date}} {{dHour(bill.createdAt)}}</td>
                                                          
                                                        </tr>
                                                    </tbody>
                                                </table>
                                        </div>
                                    </div> 
                        
                             <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <span v-for="(error,index) in errormsg" :key="index">
                                   <span v-for="(msg,index2) in error" :key="index2">{{msg}}<br v-if="msg.length > 1"/></span>
                            </span>
                           
                            </div>



                </div>

                </div>
            </div>

            <billPaymentModal v-if="showbillpaymentModal" :totalAmountBalance="totalAmountBalance" :transactionInfo="this.transactionInfo" @closemodal="closemodal" @init="totalAmount"/>
            </div>
</template>

<script>
import billPaymentModal from "@/components/backend/transaction/billPaymentModal"
import {format12Hour} from "@/helper/helper"
export default {
    components: {
        billPaymentModal
    },
    props: {
        transactionInfo: {
            type: Object,
            required: true,
        }
    },
    watch: {
        'transactionInfo.Billings': function(){
            this.totalAmount()
        }
    },
    data: function(){
        return {
             errormsg: [],
             totalrawAmount: 0,
             totalAmountFinal: 0,
             totalAmountPaid: 0,
             totalAmountBalance: 0,
             payment: {
                 method: ''
             },
             editpen: "fa fa-pen",
             check: "fa fa-check",
             showbillpaymentModal: false,
             editprice: false,

        }
    },
    methods: {
        dHour: function(date){
            return format12Hour(date)
        },
        addDiscount: function(){
            // update sa database ung discount price tapos tawagin tong function na this.totalAmount()
            this.$store.dispatch("transaction/addDiscount",{discount: this.transactionInfo.discount, id: this.transactionInfo.id})
                .then(()=> this.totalAmount())
                .catch(err=>console.log(err))
           
        },
        confirmactualprice: function(){
            this.editprice = false
            this.$refs.confirmbtn.classList.add("hidden")
            this.$refs.editbtn.classList.remove("hidden")
            // const actualamount = document.getElementsByClassName('actualamount')
            // actualamount.forEach((a)=>{
            //     a.setAttribute("readonly",true)
            // })
        },
        editactualprice: function(){
            this.editprice = true
            this.$refs.editbtn.classList.add("hidden")
            this.$refs.confirmbtn.classList.remove("hidden")
            // const actualamount = document.getElementsByClassName('actualamount')
            // actualamount.forEach((a)=>{
            //     a.removeAttribute("readonly")
            // })
        },
        totalAmount: function(){
             let totalamount = 0
             this.transactionInfo.Treatments.forEach((treatment)=>{
                    totalamount = totalamount + parseFloat(treatment.actualAmount)
             })
             this.totalrawAmount = totalamount

             this.totalAmountFinal = totalamount - this.transactionInfo.discount

            if(this.transactionInfo.Billings.length == 0) {
                this.totalAmountPaid = 0
            }else{
                let total = 0
                this.transactionInfo.Billings.forEach((bill)=>{
                    total = total + parseFloat(bill.payment)
                })
                this.totalAmountPaid = total
                 console.log(this.totalAmountPaid)
            }

            this.totalAmountBalance = (parseFloat(this.totalAmountFinal) - parseFloat(this.totalAmountPaid))

        },
        changeactualamount: function(index){
            let amount = this.transactionInfo.Treatments[index].actualAmount
            let idno = this.transactionInfo.Treatments[index].id
            this.$store.dispatch('transaction/updateActualTreatmentAmount',{amount: parseFloat(amount),id:idno,transactID: this.transactionInfo.id})
                .then(()=> this.totalAmount())
                .catch(err=>console.log(err))
           
        },
        closemodal: function(){
            this.showbillpaymentModal = false
        },
        closethis: function(){
            this.$emit("closemodal")
        },

    },
    computed: {

    },
    mounted(){
        this.totalAmount()
    }
}
</script>