<template>
    <div> 
         <!-- Begin Page Content -->
         <div style="padding: 10px 0%;"  class="printdiv">
                  <span class="pageheader noprint"><i class="fa fa-file-alt"></i> Transaction No: {{transactionInfo.transactionNo}}</span>
                   <button type="button" @click="print()" class="noprint float-right"><span class="fa fa-print"></span>Print</button>
                    <hr class="noprint"/>

                       <div class="card" style="border:none;box-shadow:none !important;">
                        <div class="card-body">

                              <div style="text-align:center;margin-bottom: 50px;position:relative;">
                                    
                                            <span style="text-align:center;font-size:28pt; font-weight:bold;"><span style="color:#4167D6">Anza</span>-<span style="color:orange;">Yap</span> <span style="color:#083D55">Dental Clinic</span>
                                            <span style="font-weight:bold;font-size:22pt;"> - {{transactionInfo.Branch.branch}}</span>
                                            </span>
                                            <br/>
                                <small>{{transactionInfo.Branch.address}} ( Contact No: {{transactionInfo.Branch.contact}} Email Address: {{transactionInfo.Branch.email}} )</small>
                                <br/>
                                <small>VAT Reg. TIN: {{transactionInfo.Branch.tin}}</small>
                                </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div style="text-align:center;margin-bottom:10px;font-size: 14pt;"><span style="font-size: 1.5em;font-weight:bold;">TRANSACTION FORM</span></div>

                                            <table class="border">
                                                <tr style="background:#343A40;color:white;">
                                                    <td class="itemtitle" colspan="6">PATIENT INFORMATIONS</td>
                                                </tr>
                                                <tr>
                                                    <td class="itemtitle">FULLNAME</td>
                                                    <td class="itemvalue">{{transactionInfo.User.fullname}}</td>
                                                    <td class="itemtitle">EMAIL ADDRESS</td>
                                                    <td class="itemvalue">{{transactionInfo.User.email}}</td>
                                                    <td class="itemtitle">CONTACT NO</td>
                                                    <td class="itemvalue">{{transactionInfo.User.contact}}</td>

                                                </tr>

                                                 <tr>
                                                    <td class="itemtitle">BIRTHDAY</td>
                                                    <td class="itemvalue">{{bday}}</td>
                                                    <td class="itemtitle">AGE</td>
                                                    <td class="itemvalue">{{age}}</td>
                                                    <td class="itemtitle">GENDER</td>
                                                    <td class="itemvalue">{{transactionInfo.User.gender}}</td>

                                                </tr>

                                                <tr>
                                                    <td class="itemtitle">ADDRESS</td>
                                                    <td colspan="5" class="itemvalue">{{transactionInfo.User.address}}</td>
                                                </tr>

                                                
                                                <tr>
                                                    <td class="itemtitle">MEDICAL HISTORY</td>
                                                    <td colspan="5" class="itemvalue">{{transactionInfo.User.history}}</td>
                                                </tr>


                                            </table>

                                              <table class="border" style="margin-top: 20px;">
                                                <tr style="background:#343A40;color:white;">
                                                    <td class="itemtitle" colspan="6">TRANSACTION INFORMATIONS</td>
                                                </tr>

                                                
                                                 <tr>
                                                    <td class="itemtitle" style="width:15%;">TRANSACTION NO</td>
                                                    <td class="itemvalue" style="width:15%;">{{transactionInfo.transactionNo}}</td>
                                                    <td class="itemtitle" style="width:15%;">TRANSACTION DATE</td>
                                                    <td class="itemvalue" style="width:15%;">{{tdate}}</td>
                                                    <td class="itemtitle" style="width:15%;">DENTIST</td>
                                                    <td class="itemvalue">{{transactionInfo.Dentist.fullname}}</td>

                                                </tr>

                                              </table>

                                              <hr/>
                                            <span style="font-size: 16pt;">TREATMENTS</span>

                                              <table class="table table-condensed table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width:20%;">Treatment</th>
                                                <th>Action Taken</th>
                                            </tr>
                                 
                                        </thead>
                                        <tbody>
                                            <tr v-for="(treatment,index) in transactionInfo.Treatments" :key="index">
                                                <td>{{treatment.service}}
                                                    <br/>Price: P {{$helper.roundToDecimal(treatment.actualAmount,2)}}
                                                </td>
                                                <td>
                                                    <table class="table table-condensed">
                                            
                                                            <tr style="background:silver;">
                                                                <td>Date</td>
                                                                <td style="width:20px;">StartTime</td>
                                                                <td style="width:20px;">EndTime</td>
                                                                <td>Diagnosis</td>
                                                                <td>Action</td>
                                                                <td style="text-align:center;">Tooth No</td>
                                                            </tr>

                                                            <tr v-for="(action,index2) in treatment.Actions" :key="index2">
                                                                <td>{{action.date}}</td>
                                                                <td>{{hour(action.starttime)}}</td>
                                                                <td>{{hour(action.endtime)}}</td>
                                                                <td v-html="action.diagnosis"></td>
                                                                <td>{{action.actiontaken}}</td>
                                                                <td style="text-align:center;">
                                                                   <span v-for="(tooth,index3) in action.teeths" :key="index3"><span v-if="tooth.flag == 0">{{tooth.orderNo}} </span></span>
                                                                     <hr/> 
                                                                    <span v-for="(tooth,index3) in action.teeths" :key="index3"><span v-if="tooth.flag == 1">{{tooth.orderNo}} </span></span>
                                                                </td>
  
                                                            </tr>
                                                  
                                                    </table>
                                                </td>

                                            </tr>
                                            <tr>
                                               <td colspan="2" style="font-size:16pt;">
                                                    Net of Vat: P {{ $helper.roundToDecimal((getTotalAmount/(1+(transactionInfo.Branch.vat/100))),2)}}
                                                    <br/>Vat ({{transactionInfo.Branch.vat}} %): P {{$helper.roundToDecimal((getTotalAmount/(1+(transactionInfo.Branch.vat/100))) * (transactionInfo.Branch.vat/100),2)}}
                                                    <br/>Gross Amount: P {{$helper.roundToDecimal(getTotalAmount,2)}}
                                                    <br/>Discount Amount: P {{$helper.roundToDecimal(transactionInfo.discount,2)}}
                                                    <br/>Grand Total Amount: P {{$helper.roundToDecimal((getTotalAmount - transactionInfo.discount),2)}}
                                                    
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>

                                        <hr/>
                                            <span style="font-size: 16pt;">PAYMENTS</span>
                                               <table class="table table-condensed">
                                                    <thead>
                                                        <tr>
                                                            <th>Referrence No</th>
                                                            <th>Date</th>
                                                            <th>Type</th>
                                                            <th>Payment</th>
                                                          
                                                            
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr v-for="(bill,index) in transactionInfo.Billings" :key="index">
                                                            <td><a :href="`../bill/${bill.id}`" target="_blank">{{bill.billrefNo}}</a></td>
                                                             <td>{{bill.date}} {{hour(bill.createdAt)}}</td>
                                                            <td>
                                                                <span v-if="bill.type == 0">Cash</span>
                                                                <span v-else>HealthCard</span>
                                                            </td>
                                                            <td>{{$helper.roundToDecimal(bill.payment,2)}}</td>
                                                           
                                                          
                                                        </tr>
                                                        <tr>
                                                            <td colspan="3" style="text-align:right">Total:</td>
                                                            <td>{{paymentTotal}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>


                                        </div>
                                    </div>

                                    <div>
                                         <barcode v-bind:value="transactionInfo.transactionNo" :width="4" :height="70" :lineColor="'dimgray'">
                                            Show this if the rendering fails.
                                        </barcode>
                                    </div>

                                     

                        </div>
                       </div>

                   
                    <!-- <pre>
                    {{transactionInfo}}
                    </pre> -->

        </div>
  
    </div>
</template>

<script>
import {mapState} from 'vuex'
import VueBarcode from 'vue-barcode'
export default {
    components: {
       'barcode': VueBarcode
    },
    methods: {
        print: function(){
            window.print()
        },
        hour: function(date){
            return this.$helper.formatHour(date)
        }
    },
    computed: {
        ...mapState({
            transactionInfo: state=> state.transaction.transactionInfo
        }),
        age: {
            get: function(){
                return this.$helper.calculateAge(this.transactionInfo.User.bday)
            }
        },
        bday: {
            get: function(){
                return this.$helper.formatBdayDate(this.transactionInfo.User.bday)
            }
        },
        tdate: {
            get: function(){
                return this.$helper.formatBdayDate(this.transactionInfo.transactionDate)
            }
        },
        getTotalAmount: {
              get: function(){
                  let amount = 0
                  this.transactionInfo.Treatments.forEach((treatment)=>{
                      amount = amount + parseFloat(treatment.actualAmount)
                  })

                  return amount
              }
          },
          paymentTotal: {
              get: function(){
                  let amount = 0
                  this.transactionInfo.Billings.forEach((bill)=>{
                      amount = amount + parseFloat(bill.payment)
                  })
                  return amount
              }
          }
    },
    async mounted(){
    this.$store.dispatch("activenav","recordnav")
    this.$store.dispatch('transaction/getTransaction',this.$route.params.idno)

    
        

    },
}
</script>