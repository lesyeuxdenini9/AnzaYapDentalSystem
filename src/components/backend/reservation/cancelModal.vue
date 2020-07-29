<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-exclamation-triangle"></span> Cancel Reservation</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                                       <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <span v-for="(error,index) in errormsg" :key="index">
                                   <span v-for="(msg,index2) in error" :key="index2">{{msg}}<br v-if="msg.length > 1"/></span>
                            </span>
                           
                            </div>

                            <div class="form-group">
                                <label>Remarks</label>
                                <textarea class="form-control" v-model="remarks"/>
                            </div>

                </div>

                <div class="modal-footer">
                    <button class="btn btn-primary" @click="proceed()"><span class="fa fa-check"></span> Cancel</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>
// import { formatHour } from "@/helper/helper"
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
        }
    },
    computed: {

    },
    methods: {

        closethis: function(){
            this.$emit("closemodal")
        },

        proceed: function(){
             this.reservationInfo.remarks = this.remarks
             this.$store.dispatch("reservation/cancelReservation",this.reservationInfo)
                .then(()=>{
                    this.$mysocket.emit('updatePatientNotification',{privateID: `patient_${this.reservationInfo.User.id}`})
                    this.$swal("Reservation has been cancelled","","success")
                    this.closethis()
                    this.$emit("init")
                })
                .catch(err=>console.log(err))
        }
  
    },

    mounted(){
       
    },
 
}
</script>

<style scoped>
 
</style>