<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-handshake"></i> Appointment List</span>
                    <hr/>
                    <div class="card">
                        <div class="card-body">
                            <!-- <button @click="toggleWeekends">toggle weekends</button> -->
                               <FullCalendar ref="fullCalendar"  :options="calendarOptions"/>
                               <!-- <pre>
                               {{getApprovedAppointments}}
                               </pre> -->
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
// import { INITIAL_EVENTS } from '@/event-utils'

import { mapActions, mapState, mapGetters } from 'vuex'
import { formatHour } from "@/helper/helper"
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin // needed for dateClick
        ],
        // headerToolbar: {
        //   left: 'prev,next today',
        //   center: 'title',
        //   right: 'dayGridMonth,timeGridWeek,timeGridDay'
        // },
        headerToolbar: {
          left: 'title',
          right: 'prev,next',
        },
        footerToolbar: {
            left: 'today dayGridMonth,timeGridDay,listWeek',
        },
        contentHeight: "auto",
        height: "auto",
        navLinks: true,
        allDaySlot: false,
        slotMinTime: "00:00:00",
        slotMaxTime: "00:00:00",
        initialView: 'timeGridDay', // timeGridDay // timeGridWeek
        // initialEvents: this.getApprovedAppointments,
        editable: false,
        selectable: false,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        hiddenDays: [],
        eventOverlap: false,
        slotEventOverlap: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventContent: this.eventRender,
        eventAfterAllRender: this.eventAfterAllRender
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      //  customButtons: {
      //    custom1: {
      //      text: 'custom1',
      //      click: function() {
      //               this.init()
      //               }
      //    }
      //  }
      },
      currentEvents: []
    }
  },
  methods: {
    ...mapActions([
      "getSchedules",
    ]),
    formatDHour: function(date){
      return formatHour(date)
    },
    eventRender: function(info){
         let display = ''
         let bg = "#1CC88A"
         let color = "white"

         display = `<div style="background: ${bg};color:${color};height:100%;width:100%;position: relative;padding:10px;"><span style="font-weight:bold">${info.event.title}</span>
            <br/>
            <small>${this.formatDHour(info.event.start)} - ${this.formatDHour(info.event.end)}  Dentist: ${info.event.extendedProps.dentist}  Patient: ${info.event.extendedProps.patient.fullname}</small>
            <br/>
            <small></small></div>` 
         return {
             html: display
         }
    },
    handleWeekendsToggle: function() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo) {
      console.log(selectInfo)
     
    },
    handleEventClick: function(clickInfo) {
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }
      console.log(clickInfo.event)
    },
    handleEvents: async function(events){
      this.currentEvents = events
      this.getTimeschedule()
      let calendarApi = this.$refs.fullCalendar.getApi()
      this.$store.dispatch("reservation/getAppointments",{start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd})
        .then(()=>{
          calendarApi.refetchEvents()
           this.calendarOptions.events = this.getApprovedAppointments
        })
     
    },
    getTimeschedule: function(){
       let calendarApi = this.$refs.fullCalendar.getApi()
        this.getSchedules()
            .then(()=>{
                  this.calendarOptions.hiddenDays = this.InactiveSchedules // remove or comment this line if it is not necessary to hide off / no operation days
                  let selectedDate = new Date(calendarApi.getDate())
                  selectedDate = selectedDate.getDay()
                  this.calendarOptions.slotMinTime = `${this.schedules[selectedDate].start}:00`
                  this.calendarOptions.slotMaxTime = `${this.schedules[selectedDate].end}:00`
            })
            .catch(err=>console.log(err ))
    },
    refreshEvents: function(){
        let calendarApi = this.$refs.fullCalendar.getApi()
          calendarApi.addEventSource(this.getApprovedAppointments)
    },
    init: async function(){
        let calendarApi = this.$refs.fullCalendar.getApi()
        this.getTimeschedule()
        await this.$store.dispatch("reservation/getAppointments",{start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd})
        // this.calendarOptions.events = this.getApprovedAppointments
        // console.log(this.getApprovedAppointments)
       // calendarApi.addEventSource(this.getApprovedAppointments)
    }
  },
  computed: {
    ...mapState({
      schedules: state=> state.schedules,
    }),
    ...mapGetters("reservation",[
      "getApprovedAppointments",
    ]),
        InactiveSchedules: {
      get: function(){
        let inactivesched = []
        this.schedules.filter((sched)=>{
          if(sched.active == 0){
           inactivesched.push(sched.index)
          }
        })
        return inactivesched
      }
    }
  },
  mounted(){
    this.$store.dispatch("activenav","reservenav")
    this.init()
  }
}
</script>