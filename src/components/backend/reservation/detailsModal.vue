<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-file-alt"></span> Reservation No {{reservationInfo.reservationNo}}</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
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
                                        <th>Price</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(treatment,index) in reservationInfo.Treatments" :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{treatment.service}}</td>
                                        <td>{{$helper.roundToDecimal(treatment.amount,2)}}</td>
                                    </tr>

                                        <tr>
                                            <td colspan="2" style="text-align:right;font-weight:bold;">Total Amount</td>
                                            <td style="background:white;">{{$helper.roundToDecimal(totalamount,2)}}</td>
                                        </tr>
                                
                                </tbody>

                            </table>



                </div>

              
                </div>
            </div>
            </div>
</template>

<script>
import {calculateAge } from "@/helper/helper"
export default {
    props: {
        reservationInfo: {
            type: Object,
            required: true,
        }
    },

    data: function(){
        return {
             errormsg: [],
             remarks: '',
             imgUrl: this.$store.state.imgUrl,
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
         dHour: function(date){
            return this.$helper.formatraw12Hour(date)
        },
        closethis: function(){
            this.$emit("closemodal")
        },


    },

    mounted(){
       
    },
 
}
</script>

<style scoped>
 
</style>