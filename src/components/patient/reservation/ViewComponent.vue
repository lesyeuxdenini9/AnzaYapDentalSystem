<template>
    <div style="padding: 10px 5%;position:relative;"  class="printdiv">

      
        
        <div style="text-align:center;position:relative;margin-bottom:50px;">
            <button type="button" @click="close()" class="noprint float-left"><span class="fa fa-times"></span>Close</button>
            <button type="button" @click="print()" class="noprint float-right"><span class="fa fa-print"></span>Print</button>
            <span style="text-align:center;font-size:28pt; font-weight:bold;"><span style="color:#4167D6">Anza</span>-<span style="color:orange;">Yap</span>
             <span style="color:#083D55">Dental Clinic</span>
              <span style="font-weight:bold;font-size:22pt;"> - {{reservationInfo.Branch.branch}}</span>
             </span>
           <!-- <img src="@/assets/rx.png" style="height:70px;width:70px;position:absolute;right:0;top:0;"/> -->
          <br/>
           <small>{{reservationInfo.Branch.address}} ( Contact No: {{reservationInfo.Branch.contact}} Email Address: {{reservationInfo.Branch.email}} )</small>
        </div>

           
        <div style="text-align:center;margin-bottom:10px;position:relative;">
            <span style="text-align:center;font-size:28pt; font-weight:bold;">RESERVATION FORM</span>
           <!-- <img src="@/assets/rx.png" style="height:70px;width:70px;position:absolute;right:0;top:0;"/> -->
        </div>
            <!-- <pre>
                {{reservationInfo}}
                </pre> -->

            <table width="100%" class="noborder">
                <tr style="background:#FFFFFF;">
                    <td class="itemtitle" style="width:20%;">RESERVATION NO</td>
                    <td class="itemvalue">{{reservationInfo.reservationNo}}</td>
                      <td class="itemtitle" style="width:20%;">DATE</td>
                    <td class="itemvalue">{{reservationInfo.date}}</td>
                </tr>

                <tr>
                    <td class="itemtitle">START TIME</td>
                    <td class="itemvalue">{{start}}</td>
                    <td class="itemtitle">END TIME</td>
                    <td class="itemvalue">{{end}}</td>
                </tr>

                 <tr style="background:#FFFFFF;">
                    <td class="itemtitle">PATIENT NAME</td>
                    <td class="itemvalue">{{reservationInfo.User.fullname}}</td>
                     <td class="itemtitle">EMAIL</td>
                    <td class="itemvalue">{{reservationInfo.User.email}}</td>
                </tr>

                
                <tr>
                    <td class="itemtitle">CONTACT</td>
                    <td class="itemvalue">{{reservationInfo.User.contact}}</td>
                     <td class="itemtitle">AGE</td>
                    <td class="itemvalue">{{Age}}</td>
                </tr>

                
               <tr style="background:#FFFFFF;">
                    <td class="itemtitle">STATUS</td>
                    <td class="itemvalue">{{status}}</td>
                    <td class="itemtitle">DENTIST</td>
                    <td class="itemvalue">{{reservationInfo.Dentist.fullname}}</td>
                </tr>
            </table>

             <table width="100%" class="border" style="margin: 50px 0px">
                <tr style="background: #343A40;color:white;">
                    <td style="width:10%">#</td>
                    <td>Treatment</td>
                    <td style="width:20%;">Estimated Price</td>
                </tr>

                <tr v-for="(treatment,index) in reservationInfo.Treatments" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{treatment.service}}</td>
                    <td>{{$helper.roundToDecimal(treatment.amount,2)}}</td>
                </tr>

                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

                   <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

                   <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

                 <tr>
                     <td colspan="2" style="text-align:right;font-weight:bold;">Estimated Total Amount</td>
                     <td style="background:white;">{{$helper.roundToDecimal(totalAmount,2)}}</td>
                 </tr>
             </table>

        <div class="row">
            <div class="col-md-4">
              <table  class="border" style="margin:0px;width:100%">
                <tr style="background: #343A40;color:white;">
                    <td colspan="2">Clinic Schedules</td>
                </tr>
                <tr v-for="(sched,index) in reservationInfo.Branch.Schedules" :key="index">
                    <td style="width:20%">{{sched.day}}</td>
                    <td>
                        <span v-if="sched.active == 1">{{dDate(sched.start)}} to {{dDate(sched.end)}}</span>
                        <span v-else>No Operation</span>
                    </td>
                </tr>

              </table>
            </div>
            <div class="col-md-8" style="text-align:center;">
              
                <barcode v-bind:value="reservationInfo.reservationNo"  :width="4" :height="70" :lineColor="'dimgray'">
                    Show this if the rendering fails.
                </barcode>
              
            </div>

        </div>
              

             <br/>
             <div class="alert alert-danger noprint" role="alert" style="padding-bottom: 0;">
                     <ul>
                       <li>After 24 hours, your appointment cannot be cancelled</li>
                      </ul>
                      
                    </div>
             <div class="col-md-4 noprint" v-if="reservationInfo.status == 0 && Expiration < 86400000">
             <button @click="deletereservation" class="btn btn-danger form-control float-left"><span class="fa fa-times"></span> Cancel / Delete</button>
             </div>

    </div>
</template>

<script>
import { mapState , mapActions} from 'vuex'
import { calculateAge, formatraw12Hour } from '@/helper/helper' 
import VueBarcode from 'vue-barcode'
export default {
    components: {
       'barcode': VueBarcode
    },
    computed: {
        ...mapState({
            reservationInfo: state=> state.reservation.reservationInfo
        }),
        Expiration: {
            get: function(){
                let datenow = new Date()
                let diff = datenow - new Date(this.reservationInfo.createdAt)
                return diff
            }
        },
        Age: {
            get: function(){
                return calculateAge(this.reservationInfo.User.bday)
            }
        },
        totalAmount: {
            get: function(){
                let amount = 0
                this.reservationInfo.Treatments.forEach((treatment)=>{
                    amount = amount + parseFloat(treatment.amount)
                })

                return amount
            }
        },
        start: {
            get: function(){
                return this.$helper.formatraw12Hour(this.reservationInfo.Start)
            }
        },
        end: {
            get: function(){
                return this.$helper.formatraw12Hour(this.reservationInfo.End)
            }
        },
        status: {
            get: function(){
                  let status = this.reservationInfo.status
             let des
             switch(status){
               case 0:
                 des = "Pending"
                 break
               case 1:
                 des = "Approved"
                 break
              case 2:
                des = "Denied"
                break
              case 3:
                des = "Cancelled"
                break
              default:
                des = "Confirmed"
                break
             }

             return des 
            }
        }
    },
    methods: {
        dDate: function(date){
            return formatraw12Hour(date)
        },
        print: function(){
            window.print()
        },
        close: function(){
            this.$router.go(-1)
        },
          ...mapActions('notification',[
            'markasReadpatient'
        ]),
        deletereservation: function(){
             this.$swal({
                title: 'Are you sure you want to delete this reservation?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No',
              }).then((result) => {
                if (result.value) {
                  this.$store.dispatch('reservation/deleteReservation',this.$route.params.idno)
                        .then(()=>this.$router.push({name: 'patientReservation'}))
                        .catch(err=>console.log(err))
                }
              })
        }
    },
    async mounted(){
         this.$store.dispatch("activenav","reservationnav")
         await this.$store.dispatch("reservation/getReservationInfo",this.$route.params.idno)
         await this.markasReadpatient(this.$route.params.idno)

 
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
    font-size: 16pt;
    padding:2px;
}

.itemvalue {
    font-size: 12pt;
    text-align: left;
    padding:2px;
}

button {
    cursor:pointer;
    padding:10px;
    border-radius:10px;
}

    small {
        font-size:12pt;
    }

/* @page {
	size: 35.7cm 25cm;
    margin: 0 5mm 0 5mm;
} */

</style>
