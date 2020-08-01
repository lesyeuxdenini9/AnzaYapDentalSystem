<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-times"></span> Deny Request</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
        
                            <div class="form-group">
                                <label>Remarks</label>
                                <textarea class="form-control" v-model="remarks"/>
                            </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-primary" @click="proceed()"><span class="fa fa-check"></span> Proceed</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>
export default {
    props: {
        denyInfo: {
            type: Object,
            required: true,
        }
    },
    data: function(){
        return {
             errormsg: [],
             remarks: "",
        }
    },

    methods: {

        closethis: function(){
            this.$emit("closemodal")
        },

        proceed: function(){
            this.$store.dispatch("reservation/denyReservation",{
                branchid: this.denyInfo.branchid,
                branch: this.denyInfo.branch,
                date: this.denyInfo.date,
                start: this.denyInfo.start,
                end: this.denyInfo.end,
                patient: this.denyInfo.patient,
                dentistname: this.denyInfo.dentistname,
                treatments: this.denyInfo.treatments,
                id: this.denyInfo.id,
                remarks: this.remarks,
                reserveNo: this.denyInfo.no,
                userID: this.denyInfo.userId})
                .then(()=>{
                    this.$mysocket.emit('updatePatientNotification',{privateID: `patient_${this.denyInfo.userId}`})
                    this.$store.dispatch("reservation/getPending")
                    this.closethis()
                    this.$emit("init")
                })
                .catch(err=>console.log(err))
        }
  
    },
    computed: {
       
    },
    mounted(){
       
    },
 
}
</script>

<style scoped>
 
</style>