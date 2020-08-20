<template>
    <div style="padding: 10px 5%;"  class="printdiv">
        
        <div style="text-align:center;margin-bottom: 50px;position:relative;">
               <button type="button" @click="print()" class="noprint float-left"><span class="fa fa-print"></span>Print</button>
                    <span style="text-align:center;font-size:28pt; font-weight:bold;"><span style="color:#4167D6">Anza</span>-<span style="color:orange;">Yap</span> <span style="color:#083D55">Dental Clinic</span>
                    <span style="font-weight:bold;font-size:22pt;"> - {{prescriptInfo.Transaction.Branch.branch}}</span>
                    </span>
                     <br/>
           <small>{{prescriptInfo.Transaction.Branch.address}} ( Contact No: {{prescriptInfo.Transaction.Branch.contact}} Email Address: {{prescriptInfo.Transaction.Branch.email}} )</small>
           <img src="@/assets/rx.png" style="height:70px;width:70px;position:absolute;right:0;top:0;"/>
        </div>

         <table width="100%" class="noborder">


                <tr style="background:#FFFFFF;">
                    <td class="itemtitle">Prescription No</td>
                    <td class="itemvalue">{{prescriptInfo.prescriptionNo}}</td>
                    <td class="itemtitle">Transaction No</td>
                    <td class="itemvalue">{{prescriptInfo.Transaction.transactionNo}}</td>
                </tr>

                <tr>

                    <td class="itemtitle">Patient Name</td>
                    <td class="itemvalue">{{prescriptInfo.Transaction.User.fullname}}</td>
                    <td class="itemtitle">Date</td>
                    <td class="itemvalue">{{ddate}}</td>
                </tr>

                  <tr style="background:#FFFFFF;">
                    <td class="itemtitle">Patient Age</td>
                    <td class="itemvalue">{{Age}}</td>
                    <td class="itemtitle">Dentist</td>
                    <td class="itemvalue">{{prescriptInfo.Transaction.dentist}}</td>
                </tr>
         </table>

         <table width="100%" class="border" style="margin: 50px 0px">
             <tr style="background: #343A40;color:white;">
                <td>Medicine</td>
                <td>Qty</td>
                <td>Dosage</td>
                <td>Days</td>
                <td>Other Remarks</td>
             </tr>

              <tr v-for="(item,index) in prescriptInfo.Prescriptitems" :key="index">
                <td>{{item.medicine}}</td>
                <td>{{item.qty}}</td>
                <td>{{item.dosage}}</td>
                <td>{{item.days}}</td>
                <td>{{item.remarks}}</td>
             </tr>
             
             <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
             </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
             </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
             </tr>
         </table>

         
        <div class="row">
            <div class="col-md-3">
                <table  class="border" style="margin:0px;width:100%">
                <tr style="background: #343A40;color:white;">
                    <td colspan="2">Clinic Schedules</td>
                </tr>
                <tr v-for="(sched,index) in prescriptInfo.Transaction.Branch.Schedules" :key="index">
                    <td style="width:20%">{{sched.day}}</td>
                    <td>
                        <span v-if="sched.active == 1">{{dDate(sched.start)}} to {{dDate(sched.end)}}</span>
                        <span v-else>No Operation</span>
                    </td>
                </tr>

              </table>
            </div>

            <div class="col-md-9" style="text-align:left;position:relative;">
                <div style="position:absolute;right:20px;bottom:20px;font-size:14pt;font-weight:bold;">
                    <hr/>
                <span>Dentist: <span style="font-weight:normal">{{space(70,prescriptInfo.Transaction.dentist)}}</span></span><hr/>
                    <span>Licence No: <span style="font-weight:normal">{{space(66,prescriptInfo.Transaction.Dentist.licence)}}</span></span><hr/>
                     <span>PTR No: <span style="font-weight:normal">{{space(71,prescriptInfo.Transaction.Dentist.ptr)}}</span></span><hr/> 
                  
                </div>
            </div>
        </div>

        
              
         <!-- <table style="margin: 50px 0px;">
             <tr>
                <td style="border-top:1px solid black !important;" class="itemvalue"> Authorized Signature </td>
                <td></td>
             </tr>
         </table> -->
        
    </div>
</template>

<script>
import {formatBdayDate , calculateAge , formatraw12Hour , maskspace} from "@/helper/helper"
import { mapState } from 'vuex' 
export default {
    computed: {
        ...mapState({
            prescriptInfo: state => state.transaction.prescriptInfo,
        }),
        ddate: {
            get: function(){
                return formatBdayDate(this.prescriptInfo.date)
            }
        },
        Age: {
            get: function(){
                return calculateAge(this.prescriptInfo.Transaction.User.bday)
            }
        }
    },
    methods: {
        space: function(masknum,string){
            return maskspace(masknum,string)
        },
        dDate: function(date){
            return formatraw12Hour(date)
        },
        print: function(){
            window.print()
        }
    },
    async mounted(){
       this.$store.dispatch("activenav","patientnav")
       await this.$store.dispatch("transaction/getPrescriptInfo",this.$route.params.idno)
        //   window.print()
    }
}
</script>


<style scoped>
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
    font-size: 18pt;
    padding:2px;
}

.itemvalue {
    font-size: 14pt;
    text-align: left;
    padding:2px;
}

    small {
        font-size:12pt;
    }

/* @page {
	size: 35.7cm 25cm;
    margin: 0 5mm 0 5mm;
} */

</style>