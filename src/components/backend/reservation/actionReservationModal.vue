<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-file-alt"></span> Reservation No: {{reservationInfo.reservationNo}}</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                <div class="modal-body">
                            
                      <button @click="shownotifModal = true" type="button" class="float-left" style="padding:10px;border-radius:10px;box-shadow: 2px 2px 1px black">
                                <span class="fa fa-envelope"></span> Send Notification Message
                      </button>

                        <button @click="showchangedateModal = true" type="button" class="float-left" style="margin-left:50px;padding:10px;border-radius:10px;box-shadow: 2px 2px 1px black">
                                <span class="fa fa-calendar"></span> Change Schedule
                      </button>
                      <img style="max-height:100px;max-width:100px;margin-bottom:10px;" v-if="reservationInfo.User.img == null || reservationInfo.User.img == ''" class="float-right" src="@/assets/default.png"/>
                      <img style="max-height:100px;max-width:100px;margin-bottom:10px;"  class="float-right" :src="`${imgUrl}/${reservationInfo.User.img}`"/>
                     
                            <table class="table table-condensed">
                                <tbody>
                                    <tr style="background:lightgray;">
                                        <td><span class="itemtitle">PATIENT NAME</span></td>
                                        <td>{{reservationInfo.User.fullname}}</td>
                                        <td><span class="itemtitle">DATE</span></td>
                                        <td>{{reservationInfo.date}}</td>
                                    </tr>

                                           <tr>
                                        <td><span class="itemtitle">EMAIl ADDRESS</span></td>
                                        <td>{{reservationInfo.User.email}}</td>
                                        <td><span class="itemtitle">START TIME</span></td>
                                        <td>{{dHour(reservationInfo.Start)}}</td>
                                    </tr>

                                            <tr style="background:lightgray;">
                                        <td><span class="itemtitle">CONTACT NO</span></td>
                                        <td>{{reservationInfo.User.contact}}</td>
                                        <td><span class="itemtitle">END TIME</span></td>
                                        <td>{{dHour(reservationInfo.End)}}</td>
                                    </tr>

                                     <tr>
                                        <td><span class="itemtitle">BIRTHDAY</span></td>
                                        <td>{{reservationInfo.User.bday}}</td>
                                        <td><span class="itemtitle">TYPE</span></td>
                                        <td>{{type}}</td>

                                    </tr>

                                    <tr>
                                        <td><span class="itemtitle">AGE</span></td>
                                        <td>{{Age}}</td>
                                        <td><span class="itemtitle">DENTIST</span></td>
                                        <td>{{reservationInfo.Dentist.fullname}}</td>
                                    </tr>

                                        <tr>
                                        <td><span class="itemtitle">STATUS</span></td>
                                        <td>{{status}}</td>
                                        <td><span v-if="reservationInfo.type == 1" class="itemtitle">TRANSACTION NO</span></td>
                                        <td><span v-if="reservationInfo.type == 1">{{reservationInfo.Transaction.transactionNo}}</span></td>

                                    </tr>
                                    
                                </tbody>
                            </table>

                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th style="width:10%">#</th>
                                        <th>Treatment</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(treatment,index) in reservationInfo.Treatments" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{treatment.Service.service}}</td>
                                        <td>{{treatment.Service.description}}</td>
                                        <td>{{$helper.roundToDecimal(treatment.amount,2)}}</td>
                                    </tr>

                                        <tr>
                                            <td colspan="3" style="text-align:right;font-weight:bold;">Total Amount</td>
                                            <td style="background:white;">{{$helper.roundToDecimal(totalamount,2)}}</td>
                                        </tr>
                                
                                </tbody>

                            </table>

                            <!-- {{reservationInfo}} -->

              
                </div>

                <hr/>
                    <div class="row" v-if="reservationInfo.status == 1">
                    <div class="col col-md-3  float-left">
                             <button class="btn btn-primary form-control" @click="proceed()"><span class="fa fa-check"></span> Proceed</button>
                    </div>

                    <div class="col col-md-6">

                    </div>

                      <div class="col col-md-3  float-right">
                             <button class="btn btn-warning form-control" @click="showcancelModal = true"><span class="fa fa-times"></span> Cancel</button>
                    </div>

                    </div>
              
                </div>
            </div>
            <changeReserveModal :dentists="dentists" v-if="showchangedateModal" :transaction="reservationchangedata" @closemodal="closemodal" @init="init"/>
            <cancelModal :reservationInfo="reservationInfo" v-if="showcancelModal" @closemodal="closemodal" @init="init"/>
            <notifModal :reservationInfo="reservationInfo" v-if="shownotifModal" @closemodal="closemodal"/>
            </div>
</template>

<script>
import cancelModal from "@/components/backend/reservation/cancelModal"
import notifModal from "@/components/backend/reservation/notifModal"
import { calculateAge} from "@/helper/helper"
import changeReserveModal from "@/components/backend/reservation/changeDateModal"
export default {
    props: {
        reservationInfo: {
            type: Object,
            required: true,
        },
        dentists: {
            type: Array,
            required: true,
        }
    },

    data: function(){
        return {
             errormsg: [],
             showcancelModal: false,
             shownotifModal: false,
             imgUrl: this.$store.state.imgUrl,
             reservationchangedata: {},
            showchangedateModal: false,
        }
    },
    computed: {
        Age: {
            get: function(){
                return calculateAge(this.reservationInfo.User.bday)
            }
        },
        status: {
            get: function(){
                let status = this.reservationInfo.status
                let des = ""
                switch (status) {
                    case 1:
                        des= "Waiting/Pending"
                        break
                    case 3:
                        des= "Cancelled"
                        break
                    case 4:
                        des= "Check In/On-going"
                        break
                    default:
                        break
                }
                return des
            }

        },
        totalamount:{
            get: function(){
                let amount = 0
                this.reservationInfo.Treatments.forEach((treatment)=>{
                    amount = amount + parseFloat(treatment.amount)
                })

                return amount
            }
        },
        type: {
            get: function(){
                  let type = this.reservationInfo.type
             let des
             switch(type){
               case 0:
                 des = "New Transaction"
                 break
               case 1:
                 des = "Followup Transaction"
                 break
              default:
                break
             }

             return des 
            }
        }
    },
    methods: {
        init: function(){
            this.$emit("init")
            this.closethis()
        },
        dHour: function(date){
            return this.$helper.formatraw12Hour(date)
        },
        closethis: function(){
            this.$emit("closemodal")
        },
        closemodal: function(){
            this.showcancelModal = false
            this.shownotifModal = false
            this.showchangedateModal = false
        },

        proceed: function(){
            // let proceed = 0

            let titledes = this.reservationInfo.type == 0 ? 'Create new Transaction ?' :  `Proceed to Transaction No:  ${this.reservationInfo.Transaction.transactionNo}?`
                 this.$swal({
                        title: titledes,
                        text: "",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes!'
                    }).then((result) => {
                        if (result.value) {
                            this.$store.dispatch("reservation/proceedTransaction",this.reservationInfo)
                                    .then(()=>{
                                        this.closethis()
                                        this.$emit("init")
                                        this.$swal("Transaction Successful","","success")
                                    })
                                    .catch(err=>console.log(err))  
                        }
                    })

         
        }
  
    },
    mounted(){
            this.reservationchangedata = {
                dentistId: this.reservationInfo.dentistId,
                branchId: this.reservationInfo.branchId,
                userId: this.reservationInfo.userId,
                date: this.reservationInfo.date,
                info: this.reservationInfo,
            }
    },
    components: {
        cancelModal,
        notifModal,
        changeReserveModal
    }
 
}
</script>

<style scoped>
    .itemtitle {
        font-weight: bold;
    }
</style>
