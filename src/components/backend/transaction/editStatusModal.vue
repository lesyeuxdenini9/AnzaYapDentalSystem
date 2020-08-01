<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-pen"></span> Edit Status</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                            <div class="form-group">
                                <label>Status</label>
                                <select class="form-control" v-model="transaction.status">
                                    <option value="0">On-Going / Pending</option>
                                    <option value="1">For Followup</option>
                                    <option value="2">Done</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Remarks</label>
                                <input type="text" class="form-control" v-model="transaction.remarks" />
                            </div>

                            <div class="form-group" v-show="transaction.status == '1'">
                                <label>Next Appointment(s)</label>
                                <button @click="showReservationModal = true" class="btn btn-primary form-control"><span class="fa fa-plus"></span> Create Reservation for followup</button>
                            </div>

                            <table class="table table-condensed" v-show="transaction.status == '1'">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Rervation No</th>
                                            <th>Date</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(reservation,index) in reservationFollowups" :key="index">
                                            <td>{{index+1}}</td>
                                            <td>{{reservation.reservationNo}}</td>
                                            <td>{{reservation.date}}</td>
                                            <td>{{dHour(reservation.Start)}}</td>
                                            <td>{{dHour(reservation.End)}}</td>
                                            <td><button @click="deleteReservation(reservation.id)" class="btn btn-danger"><span class="fa fa-trash"></span> Delete</button></td>
                                        </tr>
                                    </tbody>
                            </table>
                        
                </div>
                
                <div class="modal-footer">
                    <button class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Update</button>
                </div>
                </div>
            </div>

            <reservationModal :transaction="transactionInfo" v-if="showReservationModal" @closemodal="closemodal" @init="init"/>
        </div>  
</template>

<script>
import { mapState } from 'vuex'
import reservationModal from "@/components/backend/transaction/reservationModal"
export default {
        props: {
            editstatus: {
                type: Object,
                required: true,
            },
            transactionInfo: {
                type: Object,
                required: true,
            }
        },
        data: function(){
            return {
                errormsg: [],
                transaction: JSON.parse(JSON.stringify(this.editstatus)),
                showReservationModal: false,
            }
        },
         methods: {
             dHour: function(date){
                 return this.$helper.formatraw12Hour(date)
             },
            closemodal: function(){
                 this.showReservationModal = false
            },
            closethis: function(){
                this.$emit("closemodal")
            },
            save: function(){
                    this.transaction.status = parseInt(this.transaction.status)
                    this.$store.dispatch("transaction/editStatus",this.transaction)
                        .then((res)=>{
                               if(res.data.errors){
                                    this.errormsg = res.data.errors
                                    this.$refs.errormessage.classList.add("show")
                                }else{
                                    this.closethis()
                                    this.$swal("Transaction has been updated","","success")
                                    this.$mysocket.emit("updatedentistTransaction")
                                }
                        })
                        .catch(err=>console.log(err))
            },
            init: function(){
                this.$store.dispatch('reservation/getReservationFollowup',this.transactionInfo.id)
            },
            deleteReservation: function(idno){
                if(confirm("Are you sure you want to delete this reservation?")){
                    this.$store.dispatch('reservation/deleteReservation',idno)
                        .then(()=>this.init())
                        .catch(err=>console.log(err))
                }
              
            }
         },
         computed:{
             ...mapState('reservation',[
                 "reservationFollowups",
             ])
         },
         mounted(){
             this.init()
         },
         components: {
             reservationModal
         }
}
</script>
