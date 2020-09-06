<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid" style="position:relative;">
              <div class="row">
                  <div class="col-md-6">
                     <span class="pageheader"><i class="fa fa-handshake"></i> Appointment List
                  </span>
                  </div>
                  <div class="col-md-6">
                      <ul class="legends">
                    <li><button disabled style="height:20px;width:20px;background: #1CC88A"></button> Waiting</li>
                    <li><button disabled style="height:20px;width:20px;background: #9F29E0"></button> Reschedule</li>
                    <li><button disabled style="height:20px;width:20px;background: dimgray"></button> Cancelled</li>
                    <li><button disabled style="height:20px;width:20px;background: #385ECE"></button> Confirmed</li>
                 
                  </ul>

                  </div>

              </div>
                 

                
                    <hr/>
                          <div class="row">
                            <div class="col col-md-10">
                              <ul class="nav nav-tabs">
            
                                <li class="nav-item" v-for="(branch,index) in branches" :key="index">
                                    <a v-if="index==0" @click="changeFilterbranch(branch.id,index)" class="active navbranch nav-link" href="javascript:void(0)">
                                             {{branch.branch}}
                                    </a>
                                    <a v-else @click="changeFilterbranch(branch.id,index)" class="navbranch nav-link" href="javascript:void(0)">
                                             {{branch.branch}}
                                    </a>
                                    
                                </li>
                             
                            </ul>   
                            </div>
                            <div class="col col-md-2">
                                <button @click="walkinReserve()" class="form-control btn btn-primary"><span class="fa fa-plus"></span> Walk In</button>
                            </div>
                          </div>

                          <div class="row">
                             <div class="col col-md-4">
                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Dentist</span>
                                      </div>
                                      <select @change="changefilterdentist" v-model="filterDentist" class="form-control">
                                        <option value="0">ALL</option>
                                        <option v-for="(dentist,index) in branches[activebranchIndex].Dentists" :key="index" :value="dentist.id">{{dentist.fullname}}</option>
                                      </select>
                                  </div>
                  </div>

                          </div>
                    <div class="card">
                        <div class="card-body">
             
                                <div class="col col-md-12" style="position:relative;">
                                            <div style="position:absolute;right:150px;top:-10px">
                                                <button id="editbtn" v-if="showEditReserve" @click="beginedit"><span class="fa fa-pen"></span> Edit</button> 
                                                <div v-if="showeditbtn">
                                                       <button  v-if="EventEditData.length > 0" @click="saveupdate()" style="margin-right:50px;margin-top:10px;"><span class="fa fa-check"></span> Save</button> 
                                                      <button @click="canceledit()"><span class="fa fa-times"></span> Cancel</button> 
                                                </div>
                                            </div>
                                      <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                                 </div>

                        </div>
                    </div>

                      <br/>
                      
                      <div class="card">
                        <div class="card-header"><span class="card-title">On-Going Transactions - {{this.branches[this.activebranchIndex].branch}}</span></div>
                        <div class="card-body">
                              <table class="table table-condensed table-striped">
                                <thead>
                                    <tr>

                                      <th>DENTIST</th>
                                      <th>TRANSACTION NO</th>
                                      <th>PATIENT</th>
                                      <th>START TIME</th>
                                      <th>ESTIMATED END TIME</th>
                                      <th></th>

                                    </tr>
                                </thead>

                                <tbody>
                                  <tr v-for="(dentist,index) in dentistTransactions" :key="index">
                                    <td>{{dentist.fullname}}</td>
                                    <td>
                                      <span v-if="dentist.Transactions.length == 0"> - </span>
                                      <ul v-else style="margin:0;padding:0;">
                                        <li v-for="transaction in dentist.Transactions" :key="transaction.id">{{transaction.transactionNo}}</li>
                                      </ul>
                                    </td>
                                      <td>
                                      <span v-if="dentist.Transactions.length == 0"> - </span>
                                         <ul v-else style="margin:0;padding:0;">
                                        <li v-for="transaction in dentist.Transactions" :key="transaction.id">{{transaction.User.fullname}}</li>
                                      </ul>
                                    </td>
                                     <td>
                                      <span v-if="dentist.Transactions.length == 0"> - </span>
                                      <ul v-else style="margin:0;padding:0;">
                                        <li v-for="transaction in dentist.Transactions" :key="transaction.id">{{dHour(transaction.Start)}}</li>
                                      </ul>
                                    </td>
                                       <td>
                                      <span v-if="dentist.Transactions.length == 0"> - </span>
                                      <ul v-else style="margin:0;padding:0;">
                                        <li v-for="transaction in dentist.Transactions" :key="transaction.id">{{dHour(transaction.End)}}</li>
                                      </ul>
                                    </td>

                                    <td>
                                      <span v-if="dentist.Transactions.length == 0"> - </span>
                                      <ul v-else style="margin:0;padding:0;">
                                        <li v-for="transaction in dentist.Transactions" :key="transaction.id"><router-link :to="{name: 'transactioninfo',params: {idno: transaction.id}}">View Transaction</router-link></li>
                                      </ul>
                                    </td>
                                  </tr> 
                                </tbody>
                              </table>
                        </div>
                      </div>
                

        </div>

        <actionReservationModal :dentists="branches[activebranchIndex].Dentists" v-if="showActionReservationModal" :reservationInfo="reservationInfo" @closemodal="closemodal" @init="init"/>
        <walkinModal v-if="showwalkinmodal" :transaction="walkinReservation" @closemodal="closemodal" @init="init"/>
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
import { format12Hour , formatHour , formatDate } from "@/helper/helper"

import actionReservationModal from "@/components/backend/reservation/actionReservationModal"
import walkinModal from "@/components/backend/reservation/walkinModal"
export default {
  components: {
    actionReservationModal,
    walkinModal,
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      dentistTransactions: [],
      filterDentist: 0,
      walkinReservation: {},
      showwalkinmodal: false,
      activebranchIndex: 0,
      showEditReserve: false,
      showeditbtn: false,
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
        slotDuration: "00:10:00",
        allDaySlot: false,
        slotMinTime: "00:00:00",
        slotMaxTime: "00:00:00",
        initialView: 'timeGridDay', // timeGridDay // timeGridWeek
        // events: this.getApprovedAppointments,
        editable: false,
        selectable: false,
        selectMirror: true,
        dayMaxEvents: true,
        datesSet: this.rendernewDates,
        weekends: true,
        hiddenDays: [],
        eventOverlap: false,
        slotEventOverlap: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventContent: this.eventRender,
        eventAfterAllRender: this.eventAfterAllRender,
        eventChange: this.eventChange, 
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
      currentEvents: [],
      reservationInfo: {},
      showActionReservationModal: false,
      EventEditData: [],
    }
  },
  methods: {
    ...mapActions([
      "getSchedules",
    ]),
    changefilterdentist: function(){

        this.changeFilterbranch(this.branches[this.activebranchIndex].id,this.activebranchIndex)
    },
    walkinReserve: function(){
      this.showwalkinmodal = true
      this.walkinReservation = {
              dentistId: 0,
              branchId: this.branches[this.activebranchIndex].id,
              userId: 0,
              date: new Date(),
          }
    },
    eventChange: function(event){
      let oldrecord = this.getApprovedAppointments.filter((e)=>{
        if(parseInt(e.id) === parseInt(event.event.id)) return e
      })
      let status = event.event.extendedProps.status
      let oldstart = formatHour(new Date(oldrecord[0].start))
      let oldend = formatHour(new Date(oldrecord[0].end))
      let newstart = formatHour(event.event.start)
      let newend = formatHour(event.event.end)

      if(((oldstart != newstart) || (oldend != newend)) && (status == 1)){
          if(this.EventEditData.length == 0 ) {
             this.EventEditData.push({
              id: event.event.id,
              start: `${formatDate(event.event.start)} ${newstart}:00`,
              end: `${formatDate(event.event.start)} ${newend}:00`,
            })
          }else{
             let findevent = this.EventEditData.filter((e)=>{
               if(parseInt(e.id) == parseInt(event.event.id)) return e
            })
            

            if(findevent.length == 0){
                 this.EventEditData.push({
                  id: event.event.id,
                  start: `${formatDate(event.event.start)} ${newstart}:00`,
                  end: `${formatDate(event.event.start)} ${newend}:00`,
                })
            }else{
              let indexevent = this.EventEditData.indexOf(findevent[0])
              this.EventEditData[indexevent] = {
                 id: event.event.id,
                  start: `${formatDate(event.event.start)} ${newstart}:00`,
                  end: `${formatDate(event.event.start)} ${newend}:00`,
              }
            }

          }
      }else{
    
         let findevent = this.EventEditData.filter((e)=>{
           if(parseInt(e.id) == parseInt(event.event.id)) return e
         })

         let indexevent = this.EventEditData.indexOf(findevent[0])

        
         this.EventEditData.splice(indexevent,1)
      }

    },
    beginedit: function(){
      this.showeditbtn = true
      this.showEditReserve = false
      this.calendarOptions.editable = true
      this.calendarOptions.slotEventOverlap = true
      this.calendarOptions.eventOverlap = true
    },
       saveupdate: function(){
     this.$store.dispatch("reservation/changeTimeReservation",this.EventEditData)
      .then(async (userids)=>{
        
        userids.forEach((id)=>{
           this.$mysocket.emit('updatePatientNotification',{privateID: `patient_${id}`})
        })
        
        await this.init()
        this.canceledit()
        this.EventEditData = []
      })
      .catch(err=>console.log(err))
   },
   canceledit: function(){
    //  this.init().then(()=>{
    //   this.showeditbtn = false
    //   this.calendarOptions.editable = false
    //   this.calendarOptions.slotEventOverlap = false
    //   this.calendarOptions.eventOverlap = false
    //  })

              let calendarApi = this.$refs.fullCalendar.getApi()
              
                this.$store.dispatch("reservation/getAppointments",{start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd,branch: this.branches[this.activebranchIndex].id, dentist: this.filterDentist})
                .then(()=>{
                    // calendarApi.refetchEvents()
                      this.calendarOptions.events = this.getApprovedAppointments
                       this.showeditbtn = false
                      this.calendarOptions.editable = false
                      this.calendarOptions.slotEventOverlap = false
                      this.calendarOptions.eventOverlap = false
                })
      
   },
     changeFilterbranch: function(branch,index){
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            this.activebranchIndex = index
           this.getTimeschedule()
          let calendarApi = this.$refs.fullCalendar.getApi()
          this.$store.dispatch("reservation/getAppointments",{start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd,branch: this.branches[this.activebranchIndex].id, dentist: this.filterDentist})
            .then(()=>{
              calendarApi.refetchEvents()
              this.calendarOptions.events = this.getApprovedAppointments
            })
            

            let findindex = this.branches[this.activebranchIndex].Dentists.filter((dentist)=>{
              if(dentist.id == this.filterDentist) return dentist
            })

            if(findindex.length == 0) this.filterDentist = 0

            this.$store.dispatch("dashboard/dentistTransaction",this.branches[this.activebranchIndex].id).then((data)=>{
             this.dentistTransactions = data
           })

          

        },
        dHour: function(date){
          return this.$helper.formatraw12Hour(date)
        },
    formatDHour: function(date){
      return format12Hour(date)
    },
    eventRender: function(info){
         let display = ''
         let bg = "#1CC88A"
         let color = "white"

         if(info.event.extendedProps.status == 3) bg = "dimgray"
         if(info.event.extendedProps.status == 4) bg = "#385ECE"
         if(info.event.extendedProps.isResched == 1 && info.event.extendedProps.status == 1) bg = "#9F29E0"

         console.log(info.event.extendedProps)

        //  display = `<div style="background: ${bg};color:${color};height:100%;width:100%;position: relative;padding:10px;"><span style="font-weight:bold">${info.event.title}</span>
        //     <br/>
        //     <small>${this.formatDHour(info.event.start)} - ${this.formatDHour(info.event.end)}  Dentist: ${info.event.extendedProps.dentist}  Patient: ${info.event.extendedProps.patient.fullname}</small>
        //     <br/>
        //     <small></small></div>`
            
             display = `<div style="background: ${bg};color:${color};height:100%;width:100%;position: relative;padding:10px;"><span style="font-weight:bold">${info.event.title}</span>
            <br/>
            <span>${this.formatDHour(info.event.start)} - ${this.formatDHour(info.event.end)}</span>
            <br/>
            <span>Patient: ${info.event.extendedProps.patient.fullname}</span>
            <br/>
            <span>Dentist: ${info.event.extendedProps.dentist}</span>
            <br/>
            <span>Branch: ${info.event.extendedProps.branch}</span></div>` 
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
      if(clickInfo.event.extendedProps.reservationInfo.status == 4) {
        this.$router.push({name: 'transactioninfo',params: {idno: clickInfo.event.extendedProps.reservationInfo.TransactionId}})
      }else{
        this.reservationInfo = clickInfo.event.extendedProps.reservationInfo
        this.showActionReservationModal = true
      }
      
    },
     rendernewDates: async function(info){
      console.log(info)

    },
    refetchEventsCalendar: async function(events){
       this.currentEvents = events
      this.getTimeschedule()
      let calendarApi = this.$refs.fullCalendar.getApi()
      if(calendarApi.view.type == "timeGridDay"){
        this.showEditReserve = true
      }else{
        await this.init()
        this.showEditReserve = false
        this.showeditbtn = false          
      }

      if(!this.showeditbtn && this.showEditReserve){
         this.$store.dispatch("reservation/getAppointments",{start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd,branch: this.branches[this.activebranchIndex].id, dentist: this.filterDentist})
        .then(()=>{
          // calendarApi.refetchEvents()
          // calendarApi.rerenderEvents()
           this.calendarOptions.events = this.getApprovedAppointments
        })
      }
    },
    handleEvents: function(events){
     //  this.refetchEventsCalendar(events)
      // if(events.length == 0){
      //    this.refetchEventsCalendar(events)
      //    return
      // }else{
      //      for(let x = 0 ; x < events.length; x++){
      //        if(x == 0 ){
      //           this.refetchEventsCalendar(events)
      //           return
      //        }
      //      }
      // } 
      this.refetchEventsCalendar(events)
    },
    closemodal: function(){
      this.showActionReservationModal = false
      this.showwalkinmodal = false
    },
    getTimeschedule: function(){
      return new Promise((resolve,reject)=>{
           let calendarApi = this.$refs.fullCalendar.getApi()
          this.getSchedules(this.branches[this.activebranchIndex].id)
              .then(()=>{
                    this.calendarOptions.hiddenDays = this.InactiveSchedules // remove or comment this line if it is not necessary to hide off / no operation days
                    let selectedDate = new Date(calendarApi.getDate())
                    selectedDate = selectedDate.getDay()
                    this.calendarOptions.slotMinTime = `${this.schedules[selectedDate].start}:00`
                    this.calendarOptions.slotMaxTime = `${this.schedules[selectedDate].end}:00`
                    resolve()
              })
              .catch(err=>reject(err ))
      })
     
    },
    refreshEvents: function(){
        let calendarApi = this.$refs.fullCalendar.getApi()
          calendarApi.addEventSource(this.getApprovedAppointments)
    },
    init: async function(){
      return new Promise((resolve,reject)=>{
          try{
                let calendarApi = this.$refs.fullCalendar.getApi()
              
                this.$store.dispatch("reservation/getAppointments",{start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd,branch: this.branches[this.activebranchIndex].id, dentist: this.filterDentist})
                .then(()=>{
                    // calendarApi.refetchEvents()
                   
                    this.getTimeschedule().then(()=>{
                       this.calendarOptions.events = this.getApprovedAppointments
                    })
                })
                // console.log(this.getApprovedAppointments)
              // calendarApi.addEventSource(this.getApprovedAppointments)

                this.$store.dispatch("dashboard/dentistTransaction",this.branches[this.activebranchIndex].id).then((data)=>{
                      this.dentistTransactions = data
                  })  
              resolve()
          }catch(err){
            reject(err)
          }

      })
 
    }
  },
  computed: {
    ...mapState({
      schedules: state=> state.schedules,
      branches: state=> state.branch.branches,
    }),
    ...mapGetters("reservation",[
      "getApprovedAppointments",
    ]),
        InactiveSchedules: {
      get: function(){
        let inactivesched = []
        this.schedules.filter((sched)=>{
          if(sched.active == 0){
          // inactivesched.push(sched.index)
          }
        })
        return inactivesched
      }
    }
  },
 mounted(){
    this.$store.dispatch("activenav","reservenav")
    this.$store.dispatch("branch/getListAllInfo")
      .then(async ()=>{
          this.changeFilterbranch(this.branches[this.activebranchIndex].id,0)
          await this.init()
          
      }).catch(err=>console.log(err))


     this.$mysocket.on('dentistTransaction',()=>{
           this.$store.dispatch("dashboard/dentistTransaction",this.branches[this.activebranchIndex].id).then((data)=>{
               this.dentistTransactions = data
           })
      })
    
  }
}
</script>

<style lang="css" scoped>
  .legends {
    position:absolute;
    right:0;
    top:0;
    display:inline-block;
    list-style-type:none;
    margin:0;
    padding:0;  
    overflow: hidden;
  }

  .legends li {
    display:block;
    float:left;
    margin:0px 10px;
    font-size: 14pt;
    font-weight: bold;
    color:dimgray;
  }
</style>