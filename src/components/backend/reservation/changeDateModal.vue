<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-calendar"></span> Change Schedule</h5>
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

                            <div class="row">

                                <div class="col col-md-12" v-if="transaction.info.status == 1 && transaction.info.type == 0">
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3" >Change Dentist</span>
                                        </div>
                                            <select class="form-control" v-model="filterData.dentist">
                                                <option v-for="(dentist,index) in dentists" :key="index" :value="dentist.id">{{dentist.fullname}}</option>
                                            </select>
                                         </div>

                                </div>

                                <div class="col col-md-4">
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3" >Date  <span style="color:maroon;">*</span></span>
                                        </div>
                                        <input type="date" class="form-control" v-model="filterData.date"/>
                                         </div>

                                </div>

                                 <div class="col col-md-4">
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">StartTime  <span style="color:maroon;">*</span></span>
                                        </div>
                                        <input type="time" class="form-control" v-model="filterData.start"/>
                                         </div>

                                </div>

                                 <div class="col col-md-4">
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">EndTime  <span style="color:maroon;">*</span></span>
                                        </div>
                                        <input type="time" class="form-control" v-model="filterData.end"/>
                                         </div>

                                </div>

                            </div>

                            <div class="row">
                                   <div class="col col-md-12">
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">Remarks</span>
                                        </div>
                                        <input type="text" class="form-control" v-model="filterData.remarks"/>
                                         </div>

                                </div>

                            </div>

                              <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                 
                            <h4 style="color:dimgray;" v-if="dateactive == 0">NO OPERATION / CLOSED</h4>
                            <h4 style="color:dimgray;" v-else>Opening: {{opening}} Closing: {{closing}}</h4>

                  
                </div>

                <div class="modal-footer">
                    <button :disabled="dateactive == 0" class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Change</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
// import { formatDate } from '@fullcalendar/vue';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { formatDate , format12Hour } from "@/helper/helper"
import { mapActions , mapState , mapGetters } from "vuex"
export default {
    props: {
        transaction: {
            type: Object,
            required: true,
        },
        dentists: {
            type: Array,
            required: true,
        }
    },
    watch: {
        'filterData.date': async function(newval){
            let calendarApi = this.$refs.fullCalendar.getApi()
            let scheduledate = new Date(newval)
            calendarApi.gotoDate(scheduledate)
            let selectedDate = scheduledate.getDay()
            this.calendarOptions.slotMinTime = `${this.branch.Schedules[selectedDate].start}:00`
            this.calendarOptions.slotMaxTime = `${this.branch.Schedules[selectedDate].end}:00`
            this.filterData.minTime = `${this.branch.Schedules[selectedDate].start}`
            this.filterData.maxTime = `${this.branch.Schedules[selectedDate].end}`
            this.filterData.branch = this.branch.id
            this.dateactive = this.branch.Schedules[selectedDate].active


             await this.getApprovedListDay(this.filterData)
             this.calendarOptions.events = this.getActiveEvents
        },
        'filterData.dentist': async function(){
            await this.getApprovedListDay(this.filterData)
             this.calendarOptions.events = this.getActiveEvents
        }
    },
    data: function(){
        return {
            dateactive: 0,
            activeIndexBranch: 0,
             errormsg: [],
             filterData: {
                 date: formatDate(new Date()),
                 dentist: this.transaction.dentistId,
                 start: "",
                 end: "",
                 curdate: formatDate(new Date()),
                 minTime: "",
                 maxTime: "",
                 remarks: "",
                 refno: this.transaction.info.id,
             },
         calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          //left: 'prev,next today',
          left: 'title',
        //   right: 'prev,next custom1',
          right: 'today prev,next',
        },
        footerToolbar: {
            // left: 'today dayGridMonth,timeGridDay,listWeek',
            left: "",
        },
        contentHeight: "auto",
        height: "auto",
        allDaySlot: false,
        // navLinks: true,
        // slotDuration: "00:10:00",
        slotMinTime: "00:00:00",
        slotMaxTime: "00:00:00",
        initialView: 'timeGridDay', // timeGridDay // timeGridWeek
        events: [], // alternatively, use the `events` setting to fetch from a feed
        editable: false,
        selectable: false,
        // slotEventOverlap: false, //default true
        // eventOverlap: false, //default true
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
         eventContent: this.eventRender,
        // eventContent: this.eventRender,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
       eventRemove: this.removeEvent,
        // selectConstraint: {
        //     start: new Date(),
        //     end: new Date().setDate(new Date().getDate()+8),
        // },
        // hiddenDays: [0, 1, 3, 5 ],
        customButtons: {
                custom1: {
                    text: 'custom 1',
                    click: function() {
                        alert('clicked custom button 1!');
                    }
             },
        },
      },
        }
    },

    methods: {
        formatDHour: function(date){
            return format12Hour(date)
        },
        eventRender: function(info){
            let display = ''
            let bg = "#1CC88A"
            let color = "white"

        if(info.event.extendedProps.status == 4) bg = "#385ECE"

        if(info.event.id == this.transaction.info.id){
            bg = "#DDFFDD"
            color = "black"
        }
 
         display = `<div style="background: ${bg};color:${color};height:100%;width:100%;position: relative;padding:5px;">
            <span style="font-weight:bold">${info.event.title}</span><br/><span>Start: ${this.formatDHour(info.event.start)} End: ${this.formatDHour(info.event.end)}</span>
           </div>` 
         return {
             html: display
         }
        },
        handleDateSelect: function(selectInfo){
            let calendarApi = this.$refs.fullCalendar.getApi()
            calendarApi.gotoDate(selectInfo.start)
            calendarApi.changeView("timeGridDay")
            this.filterData.date = formatDate(selectInfo.start)
        },
        handleEventClick: function(clickInfo){
            console.log(clickInfo)
        },
        handleEvents: function(events){
             console.log(events)
            let calendarApi = this.$refs.fullCalendar.getApi()
             this.filterData.date = formatDate(calendarApi.getDate())
        },
        removeEvent: function(){

        },
        ...mapActions([
          "getSchedules",
        ]),
        ...mapActions("reservation",[
            'getApprovedListDay',
            'changeReservationDate'
        ]),
        closethis: function(){
            this.$emit("closemodal")
        },
        init: async function(){
              this.$store.dispatch("branch/getInfo",{idno: this.transaction.branchId , type: 0}).then(async ()=>{
                  this.filterData.date = this.transaction.date
                let calendarApi = this.$refs.fullCalendar.getApi()
               let scheduledate = new Date(this.filterData.date)
               calendarApi.gotoDate(scheduledate)

                let selectedDate = scheduledate.getDay()
                this.filterData.start = this.transaction.info.Start
                this.filterData.end = this.transaction.info.End
                this.calendarOptions.slotMinTime = `${this.branch.Schedules[selectedDate].start}:00`
                this.calendarOptions.slotMaxTime = `${this.branch.Schedules[selectedDate].end}:00`
                this.filterData.minTime = `${this.branch.Schedules[selectedDate].start}`
                this.filterData.maxTime = `${this.branch.Schedules[selectedDate].end}`
                this.filterData.branch = this.branch.id
                this.dateactive = this.branch.Schedules[selectedDate].active
                await this.getApprovedListDay(this.filterData)
                this.calendarOptions.events = this.getActiveEvents
              })
               
        }, 
        save: function(){
                this.filterData.info = this.transaction.info     
                this.changeReservationDate(this.filterData)
                       .then((res)=>{
                         if(res.data.errors){
                            this.errormsg = res.data.errors
                            this.$refs.errormessage.classList.add("show")
                        }else{
                        // this.$store.dispatch('staff/getStaffList',{usertype: 1})
                            this.$mysocket.emit('updatePatientNotification',{privateID: `patient_${this.transaction.info.userId}`})
                            // this.closethis()
                            this.$swal("Reservation Schedule has been changed","","success")
                            this.$emit("init")
                            this.init()
                            this.$refs.errormessage.classList.remove("show")
                            this.errormsg = []
                        }
                    })
                    .catch(err=>console.log(err))

         
        }
    },
    computed: {
        ...mapState({
             schedules: state=> state.schedules,
             branch: state=> state.branch.branch
         }),
        ...mapGetters('reservation',[
           'getActiveEvents',
         ]),
         opening: {
             get: function(){
                let mintime =  this.calendarOptions.slotMinTime.slice(0,-3)
                mintime = mintime.split(":")
                let mint = new Date()
                mint.setHours(mintime[0])
                mint.setMinutes(mintime[1])
                return format12Hour(mint)
             }
         },
         closing: {
            get: function(){
                let maxtime =  this.calendarOptions.slotMaxTime.slice(0,-3)
                maxtime = maxtime.split(":")
                let maxt = new Date()
                maxt.setHours(maxtime[0])
                maxt.setMinutes(maxtime[1])
                return format12Hour(maxt)
             }
         }
    },
    mounted(){
        this.init()
    },
    components: {
      FullCalendar
    }
}
</script>

<style scoped>
 
</style>