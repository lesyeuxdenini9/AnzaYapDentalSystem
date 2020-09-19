<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-check"></span> Confirm Request</h5>
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

                            <span style="color:dimgray;font-weight:bold;font-size:12pt;">Date: {{datesched}} Opening: {{opening}} Closing: {{closing}}</span>

                            <div class="form-group">
                                <label>Dentist  <span style="color:maroon;">*</span></label>
                                <select class="form-control" v-model="confirmInfo.dentist">
                                    <option v-for="(dentist,index) in dentists" :key="index" :value="dentist.id">{{dentist.fullname}}</option>
                                </select>

                            </div>

                            <div class="form-group">
                                <label>Start Time  <span style="color:maroon;">*</span></label>
                                <input type="time" class="form-control" v-model="starttime"/>
                            </div>

                             <div class="form-group">
                                <label>End Time  <span style="color:maroon;">*</span></label>
                                <input type="time" class="form-control" v-model="endtime"/>
                            </div>
        
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
import { formatraw12Hour , formatBdayDate } from "@/helper/helper"
export default {
    props: {
        confirmInfo: {
            type: Object,
            required: true,
        },
        dentists: {
            type: Array,
            required:true
        }
    },

    data: function(){
        return {
             errormsg: [],
             remarks: "",
             starttime: "",
             endtime: "",
        }
    },
    computed: {
        start: {
            get: function(){
                return this.confirmInfo.start
            },
            set: function(newval){
                this.start = newval
            }
        },
        end: {
            get: function(){
                return this.confirmInfo.end
            },
            set: function(newval){
                this.end = newval
            }
        },
        opening: {
            get: function(){
                return formatraw12Hour(this.confirmInfo.minTime)
            }
        },
        closing: {
            get: function(){
                return formatraw12Hour(this.confirmInfo.maxTime)
            }
        }, 
        datesched: {
            get: function(){
                return formatBdayDate(this.confirmInfo.date)
            }
        }
    },
    methods: {

        closethis: function(){
            this.$emit("closemodal")
        },

        proceed: function(){
            this.$store.dispatch("reservation/approvedReservation",{
                branchid: this.confirmInfo.branchid,
                branch: this.confirmInfo.branch,
                minTime: this.confirmInfo.minTime,
                maxTime: this.confirmInfo.maxTime,
                patient: this.confirmInfo.patient,
                dentistname: this.confirmInfo.dentistname,
                treatments: this.confirmInfo.treatments, 
                dentist:this.confirmInfo.dentist,
                date: this.confirmInfo.date,
                id: this.confirmInfo.id,
                remarks: this.remarks,
                reserveNo: this.confirmInfo.no,
                userID: this.confirmInfo.userId,
                start: this.starttime,
                end:this.endtime})
                .then((res)=>{
                    if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                        this.$mysocket.emit('updatePatientNotification',{privateID: `patient_${this.confirmInfo.userId}`})
                        this.$store.dispatch("reservation/getPending")
                        this.closethis()
                        this.$emit("init")
                    }
                  
                })
                .catch(err=>console.log(err))
        }
  
    },

    mounted(){
        this.starttime = this.start
        this.endtime = this.end
    },
 
}
</script>

<style scoped>
 
</style>