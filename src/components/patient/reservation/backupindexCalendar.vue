<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-calendar"></i> Reservation</span>
                  <span class="float-right" style="font-size:16pt;font-weight:bold;color:dimgray;">Check dates from {{formatDdate(startDate)}} to {{formatDdate(endDate)}}</span>
                    <hr/>
                    <div class="card">
                        <div class="card-body">
                            <!-- <button @click="toggleWeekends">toggle weekends</button> -->
                               <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                        </div>
                    </div>
                    <hr/>

                    <div class="card">
                      <div class="card-header card-default" style="background:#343A40;color:white;">Table List
                            
                            </div>
                        <div class="card-body">
                          <div class="col col-md-3">
                              <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Start Date</span>
                                      </div>
                                      <input type="date" class="form-control" />
                            </div>
                          </div>

                          <div class="col col-md-3">
                              <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">End Date</span>
                                      </div>
                                      <input type="date" class="form-control" />
                            </div>
                          </div>

                          <div class="col col-md-4">
                              <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Reservation No</span>
                                      </div>
                                      <input type="text" class="form-control" />
                            </div>
                          </div>

                          <div class="col-md-2">
                            <button type="button" class="form-control btn btn-primary"><span class="fa fa-search"></span> Filter</button>
                          </div>
                          <table class="table table-condensed">
                            <thead>
                              <tr style="background:silver;">
                                <th style="width:10%;">ReservationNo</th>
                                <th style="width:10%;">Date</th>
                                <th style="width:20px;">Start</th>
                                <th style="width:20px;">End</th>
                                <th style="width:10%;">Status</th>
                                <th style="width:15%;">Dentist</th>
                                <th></th>
                                <th style="width:10%;"></th>
                              </tr>
                            </thead>  

                            <tbody>
                              <tr v-for="(reserve,index) in reservationsList" :key="index">
                                <td>{{reserve.reservationNo}}</td>
                                <td>{{reserve.date}}</td>
                                <td>{{formatDHour(reserve.starttime)}}</td>
                                <td>{{formatDHour(reserve.endtime)}}</td>
                                <td>{{getStatus(reserve.status)}}</td>
                                <td>{{reserve.Dentist.fullname}}</td>
                                <td><ul>
                                  <li v-for="treatment in reserve.Treatments" :key="treatment.id"> {{treatment.service}}</li>
                                  </ul>
                                </td>
                                <td><router-link :to="{name: 'patientViewReservation', params: {idno: reserve.id}}">View Reservation</router-link></td>
                              </tr>
                            </tbody>
                          </table>

                        </div>
                    </div>
                  

        </div>

          <addModal :schedules="schedules" :selectedDate="selectedDate" v-if="showAddModal" @closemodal="closemodal" @init="init"/>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
// import { formatDate } from '@fullcalendar/vue';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
// import { INITIAL_EVENTS, createEventId } from '@/event-utils'
import { formatBdayDate,formatDate,formatHour } from "@/helper/helper"
import { mapActions, mapState, mapGetters } from 'vuex'
import addModal from "@/components/patient/reservation/addModalComponent"

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    addModal,
  },
  data: function() {
    return {
      startDate: '',
      endDate: '',
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin
        ],
        headerToolbar: {
        left: 'title',
        right: 'prev,next',
        },
        footerToolbar: {
            // left: 'today dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            left: 'today dayGridMonth,timeGridDay,listWeek',
        },
        contentHeight: "auto",
        height: "auto",
        navLinks: true,
        allDaySlot: false,
        // slotDuration: "01:00:00",
        slotMinTime: "00:00:00",
        slotMaxTime: "00:00:00",
        initialView: 'dayGridMonth', 
        events: this.getReservationEvents, // alternatively, use the `events` setting to fetch from a feed
        editable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventContent: this.eventRender,
        datesSet: this.rendernewDates,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
        eventRemove: this.removeEvent,
        selectConstraint: {
            start: new Date(), // just add days if needed for restriction
            end: new Date().setDate(new Date().getDate()+8), // comment if no restriction of date onwards
        },
        hiddenDays: [],
        customButtons: {
                custom1: {
                    text: 'custom 1',
                    click: function() {
                        alert('clicked custom button 1!');
                    }
             },
        },
      },
      currentEvents: [],
      calendarApi: null,
      showAddModal: false,
      changeeventwatcher: '',
      changeNum: 0,
    }
  },    
  watch: {
    "changeeventwatcher": async function(){
      console.log("gg")
       let calendarApi = this.$refs.fullCalendar.getApi()  
      await this.getPatientReservations({start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd})
       this.calendarOptions.events = this.getReservationEvents
    }
  },
  methods: {

    rendernewDates: async function(info){
      console.log(info)
      await this.getPatientReservations({start: info.start,end: info.end})
      this.calendarOptions.events = this.getReservationEvents
    },
    eventRender: function(info){
         let display = ''
         let bg
         let color

         if(info.event.extendedProps.status == 0){
           bg = "#36B9CC"
           color = "white"
         }else if(info.event.extendedProps.status == 1){
           bg = "#1CC88A"
           color = "white"
         }else if(info.event.extendedProps.status == 2){
           bg = "maroon"
           color = "white"
         }
        

         display = `<div style="background: ${bg};color:${color};height:100%;width:100%;position: relative;padding:10px;"><span style="font-weight:bold">${info.event.title}</span>
            <br/>
            <small>${this.formatDHour(info.event.start)} - ${this.formatDHour(info.event.end)}  Dentist: ${info.event.extendedProps.dentist}</small>
            <br/>
            <small></small></div>` 
         return {
             html: display
         }
    },
    changEvent: function(){
      console.log("changed")
    },
    addEvent: function(){
      console.log("add")
    },
    removeEvent: function(){
      console.log("removed")
    },
    handleWeekendsToggle:function() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect: function(selectInfo) {
        let check = new Date(selectInfo.start)
        let datetoday = new Date() // just add days if needed
        let date_aweek =  new Date().setDate(datetoday.getDate()+7) // just remove if need date onwards
        date_aweek = new Date(date_aweek)
   
        if(check > date_aweek || check <= datetoday){
          alert("bawal lumabas")
        }else{
          this.showAddModal = true
          this.selectedDate = selectInfo.startStr
        }
    },
    handleEventClick: function(clickInfo) {
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}' ${clickInfo.event.extendedProps.department}`)) {
      //   clickInfo.event.remove()
      // }

      console.log(clickInfo.event)
      this.$router.push({name: 'patientViewReservation', params: { idno: clickInfo.event.id} })
    },
    handleEvents: async function(events) {
      this.currentEvents = events
      let calendarApi = this.$refs.fullCalendar.getApi()  

         this.getSchedules()
          .then(()=>{
                let selectedDate = new Date(calendarApi.getDate())
                selectedDate = selectedDate.getDay()
                this.calendarOptions.slotMinTime = `${this.schedules[selectedDate].start}:00`
                this.calendarOptions.slotMaxTime = `${this.schedules[selectedDate].end}:00`
          })
    },
    formatDHour: function(date){
      return formatHour(date)
    },
    formatDdate: function(date){
        return formatBdayDate(date)
    },
    ...mapActions([
      "getSchedules",
    ]),
    ...mapActions('reservation',[
      'getPatientReservations'
    ]),
    closemodal: function(){
      this.showAddModal = false
    },
    getStatus: function(status){
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
        break
      }

      return des
    },
    init: async function(){
          let calendarApi = this.$refs.fullCalendar.getApi()
          let datetoday = new Date()
          let date_lweek =  new Date().setDate(datetoday.getDate()+7)
          let date_fweek = new Date().setDate(datetoday.getDate()+1) 
          date_lweek = new Date(date_lweek)
          date_fweek = new Date(date_fweek)

          this.startDate = date_fweek
          this.endDate = date_lweek
          this.getSchedules()
            .then(()=>{
                  this.calendarOptions.hiddenDays = this.InactiveSchedules // remove or comment this line if it is not necessary to hide off / no operation days
                  let selectedDate = new Date(calendarApi.getDate())
                  selectedDate = selectedDate.getDay()
                  this.calendarOptions.slotMinTime = `${this.schedules[selectedDate].start}:00`
                  this.calendarOptions.slotMaxTime = `${this.schedules[selectedDate].end}:00`
            })
            .catch(err=>console.log(err ))

          this.calendarOptions.selectConstraint.start = new Date(`${formatDate(new Date())} 23:59:00`)

          await this.getPatientReservations({start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd})
          this.calendarOptions.events = this.getReservationEvents
    }
  },
  computed: {
       userinfo: function(){
            return JSON.parse(this.$store.state.userinfo)
        },
    ...mapState({
      schedules: state=> state.schedules,
      reservations: state=> state.reservation.reservations,
      reservationsList: state => state.reservation.reservationsList,
    }),
    ...mapGetters('reservation',[
      'getReservationEvents'
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
    this.$store.dispatch("activenav","reservationnav")
    this.init()
    let calendarApi = this.$refs.fullCalendar.getApi()
    this.$mysocket.emit("listenPrivate",`patient_${this.userinfo.id}`)
    this.$mysocket.on('updatePatientNotification',async ()=>{
      await this.getPatientReservations({start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd})
        this.calendarOptions.events = this.getReservationEvents
    })

  },

}
</script>