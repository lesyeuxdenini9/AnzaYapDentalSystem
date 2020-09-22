<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <!-- <span class="pageheader noprint"><i class="fa fa-file-alt"></i> Receipt Ref No 
                    <router-link :to="{name: 'pharmacySale'}"><button class="float-right"><span class="fa fa-times"></span></button></router-link>
                  </span> -->
                            <button type="button" @click="back()" class="noprint float-left"><span class="fa fa-arrow-left"></span> Back</button>
                      <button type="button" @click="print()" class="noprint float-right"><span class="fa fa-print"></span> Print</button>                  
                    <hr/>

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
                                  <div style="text-align:center;margin-bottom:10px;font-size: 14pt;"><span style="font-size: 1.5em;font-weight:bold;">PURCHASE RECEIPT</span></div>

                                  <table style="width:100%;" class="">
                                      <tbody>
                                          <tr>
                                              <td>Reference No:</td>
                                              <td>{{billinfo.billrefNo}}</td>
                                              <td>Date:</td>
                                              <td>{{dDate(billinfo.createdAt)}}</td>
                                          </tr>

                                             <tr>
                                              <td>Branch:</td>
                                              <td>{{billinfo.Branch.branch}}</td>
                                              <td>Address:</td>
                                              <td>{{billinfo.Branch.address}}</td>
                                          </tr>
                                          <tr>
                                              <td>Staff:</td>
                                              <td>{{billinfo.modifiedBy}}</td>
                                              <td></td>
                                              <td></td>
                                          </tr>

                                      </tbody>
                                  </table>
                                  <br/>

                                  <table class="table table-condensed">
                                      <thead>
                                          <tr>
                                              <th>#</th>
                                              <th>Item</th>
                                              <th>Quantity</th>
                                              <th style="width:20%;">Price</th>
                                              <th style="width:20%;">Amount</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr v-for="(item,index) in billinfo.Billitems" :key="index"> 
                                            <td>{{index+1}}</td>
                                            <td>{{item.item}}</td>
                                            <td>{{$helper.roundToDecimal(item.qty,2)}}</td>
                                            <td>{{$helper.roundToDecimal(item.price,2)}}</td>
                                            <td>{{$helper.roundToDecimal(item.amount,2)}}</td>
                                          </tr>
                                          <tr>
                                              <td colspan="3"></td>
                                              <td>Subtotal Amount:</td>
                                              <td>{{$helper.roundToDecimal(totalRawAmount,2)}}</td>
                                          </tr>
                                           <tr>
                                             <td colspan="3" style="border:none;"></td>
                                              <td style="border:none;padding-top: 0;">Discount:</td>
                                              <td style="border: none;padding-top: 0;">{{$helper.roundToDecimal(billinfo.discount,2)}}</td>
                                          </tr>
                                            <tr>
                                            <td colspan="3" style="border:none;"></td>
                                              <td style="border:none;padding-top: 0;">Total Amount:</td>
                                              <td style="border: none;padding-top: 0;">{{$helper.roundToDecimal(totalRawAmount - billinfo.discount,2)}}</td>
                                          </tr>
                                          <tr>
                                              <td colspan="3" style="border:none;"></td>
                                              <td colspan="2"></td>
                                          </tr>
                                           <tr>
                                              <td colspan="3" style="border:none;"></td>
                                              <td style="border:none;padding-top: 0;">Amount Received:</td>
                                              <td style="border: none;padding-top: 0;">{{$helper.roundToDecimal(billinfo.payment + billinfo.change,2)}}</td>
                                          </tr>
                                            <tr>
                                              <td colspan="3" style="border:none;"></td>
                                              <td style="border:none;padding-top: 0;">Changed:</td>
                                              <td style="border: none;padding-top: 0;">{{$helper.roundToDecimal(billinfo.change,2)}}</td>
                                          </tr>
                                      </tbody>

                                  </table>

                                <div style="text-align:left">
                                  <barcode v-bind:value="billinfo.billrefNo" :width="4" :height="70" :lineColor="'dimgray'">
                                            Show this if the rendering fails.
                                     </barcode>
                                </div>
                        </div>
                      </div>

                   <!-- <pre>
                        {{billinfo}}
                    </pre>  -->

        </div>
  
    </div>
</template>

<script>
import { mapState } from 'vuex'
import VueBarcode from 'vue-barcode'
export default {
           components: {
       'barcode': VueBarcode
    },
    methods: {
        dDate: function(date){
            return this.$helper.formatBdayDate(date)
        },
        back: function(){
        //   this.$router.push({name: 'pharmacySale'})
        this.$router.go(-1)
        },
        print: function(){
            window.print()
        }
    },
    computed: {
        ...mapState({
            billinfo: state => state.transaction.billinfo
        }),
        totalRawAmount: {
            get: function(){
                let amount = 0
                this.billinfo.Billitems.forEach((item)=>{
                    amount = amount + parseFloat(item.amount)
                })

                return amount
            }
        }
    },
    mounted(){
        this.$store.dispatch("activenav","pharmacynav")
        this.$store.dispatch("transaction/viewBill",this.$route.params.idno)
 
    }
}
</script>

<style>
table > tbody > tr > td {
    font-size: 14pt;
}
</style>