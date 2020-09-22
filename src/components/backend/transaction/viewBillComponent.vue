<template>
    <div> 
         <!-- Begin Page Content -->
          <div style="padding: 10px 0%;"  class="printdiv">
                  <span class="pageheader noprint"><i class="fa fa-file-alt"></i> Bill Reference No: {{billinfo.billrefNo}}</span>
                   <button type="button" @click="print()" class="noprint float-right"><span class="fa fa-print"></span>Print</button>
                    <hr class="noprint"/>

                    <div class="card" style="border:none;box-shadow:none !important;">
                        <div class="card-body">
                                   <div style="text-align:center;margin-bottom: 50px;position:relative;">
                                    
                                            <span style="text-align:center;font-size:28pt; font-weight:bold;"><span style="color:#4167D6">Anza</span>-<span style="color:orange;">Yap</span> <span style="color:#083D55">Dental Clinic</span>
                                            <span style="font-weight:bold;font-size:22pt;"> - {{billinfo.Branch.branch}}</span>
                                            </span>
                                            <br/>
                                <small>{{billinfo.Branch.address}} ( Contact No: {{billinfo.Branch.contact}} Email Address: {{billinfo.Branch.email}} )</small>
                                <br/>
                                <small>VAT Reg. TIN: {{billinfo.Branch.tin}}</small>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div style="text-align:center;margin-bottom:10px;font-size: 14pt;"><span style="font-size: 1.5em;font-weight:bold;">PAYMENT RECEIPT</span></div>
                                        <table class="table table-bordered table-condensed billtable">
                                            <tr>
                                                <td rowspan="5" style="width:50%;">
                                                    <span style="font-weight:bold;font-size:1.5em;">{{billinfo.customerName.toUpperCase()}}</span><br/>
                                                    <span>{{billinfo.User.address.toUpperCase()}}</span><br/>
                                                    <span>{{billinfo.User.email}}</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td style="width:25%;" class="itemtitle">Billing Reference No</td>
                                                <td class="itemtitle">Date</td>
                                            </tr>

                                            <tr>
                                                <td>{{billinfo.billrefNo}}</td>
                                                <td>{{billdate}}</td>
                                            </tr>

                                            <tr>
                                                <td class="itemtitle">Transaction Reference No</td>
                                               <td class="itemtitle">Type</td>
                                            </tr>

                                            <tr>
                                                <td>{{billinfo.Transaction.transactionNo}}</td>
                                                <td>{{billtype}}</td>
                                            </tr>



                                        </table>
                                    </div>
                                </div>

                                <div class="row">
                                          <div class="col-md-6">
                                                <table class="table table-bordered billtable" style="width:101%">
                                                    <tr>
                                                        <td style="width:25%;vertical-align:middle;text-align:center;" rowspan="2" class="itemtitle">AMOUNT TO BE PAID</td>
                                                        <td colspan="2" style="text-align:center;" class="itemtitle">PAYMENT</td>
                                                        <td style="width:25%;vertical-align:middle;text-align:center;" rowspan="2" class="itemtitle">BALANCE</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width:25%;text-align:center;" class="itemtitle">CASH</td>
                                                        <td style="width:25%;text-align:center;" class="itemtitle">HEALTHCARD</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="itemvalue">{{$helper.roundToDecimal(billinfo.totalAmount,2)}}</td>
                                                        <td class="itemvalue"><span v-if="billinfo.type == 0">{{$helper.roundToDecimal(billinfo.payment,2)}}</span></td>
                                                        <td class="itemvalue"><span v-if="billinfo.type == 1">{{$helper.roundToDecimal(billinfo.payment,2)}}</span></td>
                                                        <td class="itemvalue">{{$helper.roundToDecimal((billinfo.totalAmount - billinfo.payment),2)}}</td>
                                                    </tr>
                                                </table>
                                                
                                          </div>

                                              <div class="col-md-6">
                                                <table class="table table-bordered billtable" style="width:100%">
                                                    <tr>
                                                        <td style="width:50%;" class="itemtitle">HEALTHCARD NAME</td>
                                                        <td class="itemtitle">HEALTHCARD NO</td>
                                                    </tr>
                                                     <tr>
                                                        <td>
                                                            <span v-if="billinfo.type == 0">-</span>
                                                            <span v-else>{{billinfo.Healthcard.healthcardname}}</span>
                                                        </td>
                                                        <td>
                                                            <span v-if="billinfo.type == 0">-</span>
                                                             <span v-else>{{billinfo.Healthcard.healthcardno}}</span>
                                                        </td>
                                                    </tr>
                                                     <tr>
                                                        <td style="width:50%;" class="itemtitle">ACCOUNT NAME</td>
                                                        <td class="itemtitle">ACCOUNT NO</td>
                                                    </tr>
                                                     <tr>
                                                        <td>
                                                            <span v-if="billinfo.type == 0">-</span>
                                                            <span v-else>{{billinfo.Healthcard.accountname}}</span>
                                                        </td>
                                                        <td>
                                                            <span v-if="billinfo.type == 0">-</span>
                                                            <span v-else>{{billinfo.Healthcard.accountNo}}</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                                
                                          </div>
                                </div>

                       

                                <div class="row">
                                    <div class="col-md-12">
                                        <span style="margin-left:5px;font-size:16pt;font-style:italic;">Transaction Treatments</span>
                                        <table class="border">
                                     
                                                 <tr style="background: #343A40;color:white;">
                                                    <td style="width:10%;">#</td>
                                                    <td>Treatment</td>
                                                    <td>Price</td>
                                                    <td></td>
                                                </tr>
                                        
                                                <tr v-for="(treatment,index) in billinfo.Transaction.Treatments" :key="index">
                                                    <td>{{index+1}}</td>
                                                    <td>{{treatment.service}}</td>
                                                    <td>{{$helper.roundToDecimal(treatment.actualAmount,2)}}</td>
                                                    <td style="width:10%;"><span v-if="treatment.paymentmethod=='healthcard'">{{treatment.paymentmethod}}</span></td>
                                                </tr>
                                                 <tr>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;text-align:right;font-weight:bold;font-size:16pt;">Net of Vat: </td>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;font-weight:bold;font-size:16pt;background:#F8F7DA;">{{ $helper.roundToDecimal((totalAmount/(1+(billinfo.Branch.vat/100))),2)}}</td>
                                                </tr>
                                                 <tr>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;text-align:right;font-weight:bold;font-size:16pt;">Vat ({{billinfo.Branch.vat}} %): </td>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;font-weight:bold;font-size:16pt;background:#F8F7DA;">{{$helper.roundToDecimal((totalAmount/(1+(billinfo.Branch.vat/100))) * (billinfo.Branch.vat/100),2)}}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;text-align:right;font-weight:bold;font-size:16pt;">Gross Transaction Amount: </td>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;font-weight:bold;font-size:16pt;background:#F8F7DA;">{{$helper.roundToDecimal(totalAmount,2)}}</td>
                                                </tr>
                                                 <tr>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;text-align:right;font-weight:bold;font-size:16pt;">Discount: </td>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;font-weight:bold;font-size:16pt;background:#F8F7DA;">{{$helper.roundToDecimal(billinfo.Transaction.discount,2)}}</td>
                                                </tr>
                                                  <tr>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;text-align:right;font-weight:bold;font-size:16pt;">Grand Total Amount: </td>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;font-weight:bold;font-size:16pt;background:#F8F7DA;">{{$helper.roundToDecimal(totalAmount - billinfo.Transaction.discount,2)}}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4"></td>
                                                </tr>
                                                  <tr>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;text-align:right;font-weight:bold;font-size:16pt;">Amount Received: </td>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;font-weight:bold;font-size:16pt;background:#F8F7DA;">{{$helper.roundToDecimal(billinfo.payment+billinfo.change,2)}}</td>
                                                </tr>
                                                  <tr>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;text-align:right;font-weight:bold;font-size:16pt;">Change: </td>
                                                    <td colspan="2" style="padding-top:0;padding-bottom:0;font-weight:bold;font-size:16pt;background:#F8F7DA;">{{$helper.roundToDecimal(billinfo.change,2)}}</td>
                                                </tr>
                                         

                                        </table>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                         <span style="margin-left:5px;font-size:16pt;font-style:italic;">Previous Payments</span>
                                         <table class="border billtable">
                               
                                               
                                                 <tr style="background: #343A40;color:white;">
                                                     <td style="width:10%;">#</td>
                                                     <td>Reference No</td>
                                                     <td>Date</td>
                                                     <td>Payment</td>
                                                     <td>Type</td>
                                                     <td>Balance</td>
                                                 </tr>
                                      
                                                 <tr v-for="(payment,index) in this.previousPayments" :key="index">
                                                    <td>{{index+1}}</td>
                                                    <td>{{payment.billrefNo}}</td>
                                                    <td>{{dDatetime(payment.createdAt)}}</td>
                                                    <td>{{$helper.roundToDecimal(payment.payment,2)}}</td>
                                                    <td>
                                                        <span v-if="payment.type == 0">Cash</span>
                                                        <span v-else>Healthcard</span>
                                                    </td>
                                                    <td>{{$helper.roundToDecimal(payment.totalAmount - payment.payment,2)}}</td>
                                                 </tr>
                                                 <tr>
                                                    <td>-</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                 </tr>
                                            
                                         </table>
                                    </div>
                                </div>

                                
                                  <div>
                                         <barcode v-bind:value="billinfo.billrefNo" :width="4" :height="70" :lineColor="'dimgray'">
                                            Show this if the rendering fails.
                                        </barcode>
                                    </div>
                         
                        </div>
                    </div>
        </div>
  
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatBdayDate , format12Hour} from "@/helper/helper"
import VueBarcode from 'vue-barcode'
export default {
        components: {
       'barcode': VueBarcode
    },
    computed: {
        previousPayments: {
            get: function(){
                let previous =  this.billinfo.Transaction.Billings.filter((bill)=>{
                    if(bill.id < this.billinfo.id) return bill
                })
                // previous.sort((a,b)=>{
                //     let comparison = 0
                //     if(a.id > b.id) comparison = 1
                //     if(a.id < b.id) comparison = -1
                //     comparison = -1
                //     return comparison
                // })
                return previous
            }
        },
        ...mapState({
            billinfo: state=>state.transaction.billinfo
        }),
        billdate: {
            get: function(){
                return `${formatBdayDate(this.billinfo.createdAt)} ${format12Hour(this.billinfo.createdAt)}`
            }
        },
        billtype: {
            get: function(){
                return this.billinfo.type == 0 ? "CASH" : "HEALTHCARD"
            }
        },
        totalAmount: {
            get: function(){
                let totalamount = 0
                this.billinfo.Transaction.Treatments.forEach((treatment)=>{
                        totalamount = totalamount + parseFloat(treatment.actualAmount)
                })
                return totalamount
            }
        },
        AlreadyPaidAmount: {
            get: function(){
                let amount = 0
                this.billinfo.Transaction.Billings.forEach((bill)=>{
                    amount = amount + +bill.payment
                })
                return amount
            }
        },
        AmountToBePaid: {
            get: function(){
                let amount = 0
                let totaltransactionamount = this.totalAmount
                amount = totaltransactionamount - this.AlreadyPaidAmount
                return amount
            }
        }
    },
    methods: {
        dDatetime: function(date){
             return `${formatBdayDate(date)} ${format12Hour(date)}`
        },
        print: function(){
            window.print()
        }
    },
    mounted(){
        this.$store.dispatch("activenav","patientnav")
        this.$store.dispatch("transaction/viewBill",this.$route.params.idno)
    }
}
</script>

<style>

table.border td, td {
border: 1px solid black;
height: 20px;
}

table.border {
border-collapse: collapse;
width: 100%;
}

table.noborder td, td {
border: 0;
}
tr.top td {
border-top: tdin solid black;
}

tr.bottom td {
border-bottom: tdin solid black;
}

.itemtitle {
    text-align:left;
    font-weight:bold;
}
.billtable > tr > td , .billtable > thead tr th , .billtable > tbody tr td {
    padding: 5px !important;
}
.itemvalue {
    text-align: center;
}

    small {
        font-size:12pt;
    }

</style>

