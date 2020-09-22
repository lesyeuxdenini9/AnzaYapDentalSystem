<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-file-alt"></i> Reservation No {{reservationInfo.reservationNo}}</span>
                    <hr/>
                    <div class="card">
                            <div class="card-header card-default" style="background:#343A40;color:white;"><span class="card-title" style="color:white !important;">Details</span>
                              <button  @click="showchangedateModal = true" class="float-right"><span class="fa fa-calendar"></span> Change Schedule</button>
                            </div>
                        <div class="card-body">
                              <!-- {{reservationInfo}} -->
                            <div class="row">
                                <div class="col col-md-3">
                                      <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">Date</span>
                                                </div>
                                                <input type="text" readonly style="background:white" class="form-control" v-model="reservationInfo.date"/>
                                      </div>

                                </div>

                                    <div class="col col-md-3">
                                      <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">Start Time</span>
                                                </div>
                                                <input type="text" readonly style="background:white" class="form-control" :value="dDate(reservationInfo.Start)"/>
                                      </div>

                                </div>

                                    <div class="col col-md-3">
                                      <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">End Time</span>
                                                </div>
                                                <input type="text" readonly style="background:white" class="form-control" :value="dDate(reservationInfo.End)"/>
                                      </div>

                                </div>

                                 <div class="col col-md-3">
                                      <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">Type</span>
                                                </div>
                                                <input type="text" readonly style="background:white" class="form-control" v-model="type"/>
                                      </div>

                                </div>

                            </div>


                                  <div class="row">
                                <div class="col col-md-3">
                                      <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">Client Name</span>
                                                </div>
                                                <input type="text" readonly style="background:white" class="form-control" v-model="reservationInfo.User.fullname"/>
                                      </div>

                                </div>

                                    <div class="col col-md-3">
                                      <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">Client Email</span>
                                                </div>
                                                <input type="text" readonly style="background:white" class="form-control" v-model="reservationInfo.User.email"/>
                                      </div>

                                </div>

                                    <div class="col col-md-3">
                                      <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">Client Contact</span>
                                                </div>
                                                <input type="text" readonly style="background:white" class="form-control" v-model="reservationInfo.User.contact"/>
                                      </div>

                                </div>

                                    <div class="col col-md-3">
                                      <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">Dentist</span>
                                                </div>
                                                <input type="text" readonly style="background:white" class="form-control" v-model="reservationInfo.Dentist.fullname"/>
                                      </div>

                                </div>

                                  <div class="col col-md-3">
                                      <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">Branch</span>
                                                </div>
                                                <input type="text" readonly style="background:white" class="form-control" v-model="reservationInfo.Branch.branch"/>
                                      </div>

                                </div>

                                   
                            </div>

                          
                              <table class="table table-condensed">
                                <thead>
                                    <tr>
                                      <th>#</th>
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
                                </tbody>
                              </table>
                              
                                    <div class="col col-md-3">
                                      <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">Status</span>
                                                </div>
                                                <input type="text" readonly style="background:white" class="form-control" v-model="reservationStatus"/>
                                      </div>

                                </div>
                  

                              <div class="float-right" v-if="reservationInfo.status == 0">
                                <button v-if="reservationInfo.status != 1" @click="confirmReservation()" style="margin: 10px 30px;" class="btn btn-primary"><span class="fa fa-check"></span> Confirm</button>
                                 <!-- <button v-if="reservationInfo.status == 1" style="margin: 10px 30px;" class="btn btn-warning"><span class="fa fa-times"></span> Cancel</button> -->
                                <button  v-if="reservationInfo.status != 2"  @click="deniedReservation()" class="btn btn-danger"><span class="fa fa-times"></span> Denied</button>
                              </div>
                        
                        </div>
                    </div>
                
                    <div class="card">
                            <div class="card-header card-default" style="background:#343A40;color:white;"><span class="card-title" style="color:white !important;">Approved List Schedule</span></div>
                            <div class="card-body">
                                        <div class="col col-md-6" v-if="reservationInfo.type == 0">
                                        <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">Dentist</span>
                                                </div>
                                               <select v-model="filterData.dentist" class="form-control">
                                                <option v-for="(dentist,index) in branches[activeIndexBranch].Dentists" :key="index" :value="dentist.id">{{dentist.fullname}}</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div class="col col-md-6">
                                            <h4 style="color:dimgray" class="float-right">Opening {{format12(opening)}} Closing {{format12(closing)}}</h4>
                                        </div>
                                        <div class="col col-md-12" style="position:relative;">
                                            <div style="position:absolute;right:20px;">
                                                <button v-if="!showeditbtn" @click="beginedit"><span class="fa fa-pen"></span> Edit</button> 
                                                <div v-if="showeditbtn">
                                                       <button v-if="EventEditData.length > 0" @click="saveupdate()" style="margin-right:50px;"><span class="fa fa-check"></span> Save</button> 
                                                        <button @click="canceledit()"><span class="fa fa-times"></span> Cancel</button> 
                                                </div>
                                            </div>
                                      <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                                        </div>
                            </div>
                    </div>

                    <!-- <pre>
                      {{branches}}
                      </pre> -->
                    
        </div>
        <changeReserveModal v-if="showchangedateModal" :transaction="reservationchangedata" @closemodal="closemodal" @init="init"/>
        <deniedModal :denyInfo="ReserveInfo" v-if="showDeniedModal" @closemodal="closemodal" @init="init"/>
        <confirmModal :dentists="branches[activeIndexBranch].Dentists" :confirmInfo="ReserveInfo" v-if="showConfirmModal" @closemodal="closemodal" @init="init"/>
    </div>
</template>

<script>
import { mapActions , mapState , mapGetters } from 'vuex'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
// import { formatDate } from '@fullcalendar/vue';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { createEventId } from '@/event-utils'
import { formatHour , formatraw12Hour ,formatDate} from "@/helper/helper"

import deniedModal from "@/components/backend/reservation/deniedModal"
import confirmModal from "@/components/backend/reservation/confirmModal"
import changeReserveModal from "@/components/backend/reservation/changeDateModal"
export default {
      components: {
        deniedModal,
        confirmModal,
        changeReserveModal,
        FullCalendar // make the <FullCalendar> tag available
    },
     data: function() {
    return {
      showchangedateModal: false,
      reservationchangedata: {},
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
          right: '',
        },
        footerToolbar: {
            left: '',
        },
        contentHeight: "auto",
        height: "auto",
        allDaySlot: false,
        slotDuration: "00:10:00",
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
        // eventContent: this.eventRender,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
       eventChange: this.eventChange, 
       eventRemove: this.removeEvent,
        selectConstraint: {
            start: new Date(),
            end: new Date().setDate(new Date().getDate()+8),
        },
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
      currentEvents: [],
      calendarApi: null,
      filterData: {
          dentist: 0,
          date: '',
      },
      showDeniedModal: false,
      showConfirmModal: false,
      ReserveInfo: {},
      opening: "",
      closing: "",
      activeIndexBranch: 0,
      showeditbtn: false,
      EventEditData: [],
    }
  },
  watch: {
    'filterData.dentist': async function(){
        this.filterData.branch = this.reservationInfo.branchId
        await this.getApprovedListDay(this.filterData)
        this.calendarOptions.events = this.getActiveEvents
    }
  },
 methods: {
   saveupdate: function(){
     this.$store.dispatch("reservation/changeTimeReservation",this.EventEditData)
      .then(()=>{
        this.init()
        this.canceledit()
        this.EventEditData = []
      })
      .catch(err=>console.log(err))
   },
   beginedit: function(){
     this.showeditbtn = true
     this.calendarOptions.editable = true
    //  this.calendarOptions.selectable = true
   },
   canceledit: function(){
      this.showeditbtn = false
      this.calendarOptions.editable = false
      this.init()
   },
   format12: function(hour){
     return formatraw12Hour(hour)
   },
    init: async function(){

            await this.getReservationInfo(this.$route.params.idno)
            this.reservationchangedata = {
              dentistId: this.reservationInfo.dentistId,
              branchId: this.reservationInfo.branchId,
              userId: this.reservationInfo.userId,
              date: this.reservationInfo.date,
              info: this.reservationInfo,
            }
             this.$store.dispatch('branch/getListAllInfo').then(async ()=>{
                  let branch = this.branches.filter(branch=>{
                     if(branch.id == this.reservationInfo.branchId) return branch
                  })
                  this.activeIndexBranch = this.branches.indexOf(branch[0])
                  let calendarApi = this.$refs.fullCalendar.getApi()
                  let scheduledate = new Date(this.reservationInfo.date)
                  calendarApi.gotoDate(scheduledate)

                  let selectedDate = scheduledate.getDay()
                  this.calendarOptions.slotMinTime = `${this.branches[this.activeIndexBranch].Schedules[selectedDate].start}:00`
                  this.calendarOptions.slotMaxTime = `${this.branches[this.activeIndexBranch].Schedules[selectedDate].end}:00`
                  this.opening = `${this.branches[this.activeIndexBranch].Schedules[selectedDate].start}`
                  this.closing = `${this.branches[this.activeIndexBranch].Schedules[selectedDate].end}`

                  this.filterData.date = this.reservationInfo.date
                  this.filterData.dentist = this.reservationInfo.dentistId
                  this.filterData.branch = this.reservationInfo.branchId
                  this.filterData.refno = this.reservationInfo.id
                  await this.getApprovedListDay(this.filterData)
                  this.calendarOptions.events = this.getActiveEvents
             })
        

            
            
    },
    eventRender: function(info){
         let display = ''
         display = info.event.title == "" ? "" : `<p>${info.event.title}</p><p style="color:black">gg</p><p>sdjfsdjfk</p>` 
         return {
             html: display
         }
    },
    confirmReservation: function(){
      this.showConfirmModal = true
       this.ReserveInfo = {
        branch: this.reservationInfo.Branch.branch,
        branchid: this.reservationInfo.Branch.id,
        id: this.reservationInfo.id,
        no: this.reservationInfo.reservationNo,
        userId: this.reservationInfo.userId,
        // start: this.reservationInfo.starttime,
        // end: this.reservationInfo.endtime,
        start: this.reservationInfo.Start,
        end: this.reservationInfo.End,
        date: this.reservationInfo.date,
        dentist: this.reservationInfo.dentistId,
        dentistname: this.reservationInfo.Dentist.fullname,
        treatments: this.reservationInfo.Treatments,
        patient: this.reservationInfo.User,
        minTime: this.opening,
        maxTime: this.closing,
      }
    },
    deniedReservation: function(){
      this.showDeniedModal = true
      this.ReserveInfo = {
        branch: this.reservationInfo.Branch.branch,
        branchid: this.reservationInfo.Branch.id,
        id: this.reservationInfo.id,
        no: this.reservationInfo.reservationNo,
        userId: this.reservationInfo.userId,
        // start: this.reservationInfo.starttime,
        // end: this.reservationInfo.endtime,
        start: this.reservationInfo.Start,
        end: this.reservationInfo.End,
        date: this.reservationInfo.date,
        dentist: this.reservationInfo.dentistId,
        dentistname: this.reservationInfo.Dentist.fullname,
        treatments: this.reservationInfo.Treatments,
        patient: this.reservationInfo.User
      }
    },
    closemodal: function(){
      this.showDeniedModal = false
      this.showConfirmModal = false
      this.showchangedateModal = false
    },
    dDate: function(date){
      return this.$helper.formatraw12Hour(date)
    },
    ...mapActions('reservation',[
        'getReservationInfo',
        'getApprovedListDay',
    ]),

  
    removeEvent: function(){
      alert("removed")
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo) {
  

        let check = new Date(selectInfo.start)
        let datetoday = new Date()
        let date_aweek =  new Date().setDate(datetoday.getDate()+7)
        date_aweek = new Date(date_aweek)
   
        if(check > date_aweek || check <= datetoday){
          alert("bawal lumabas")
        }else{
          alert("yehey")
        }
 
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          display: 'background',
          color: '#ff9f89'
        })
      }
    },
    handleEventClick(clickInfo) {
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }
      console.log(clickInfo)
    },
    handleEvents(events) {
      this.currentEvents = events
      //  let calendarApi = this.$refs.fullCalendar.getApi()
      //  console.log(calendarApi.getDate())
      //  console.log(calendarApi.view.activeStart)
      //  console.log(calendarApi.view.activeEnd)
    },
    eventChange: function(event){
      let oldrecord = this.getActiveEvents.filter((e)=>{
        if(parseInt(e.id) === parseInt(event.event.id)) return e
      })

      let oldstart = formatHour(new Date(oldrecord[0].start))
      let oldend = formatHour(new Date(oldrecord[0].end))
      let newstart = formatHour(event.event.start)
      let newend = formatHour(event.event.end)

      if((oldstart != newstart) || (oldend != newend)){
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

      console.log(this.EventEditData)

    }
     },
     computed: {
         ...mapState({
             reservationInfo: state=> state.reservation.reservationInfo,
             schedules: state=> state.schedules,
             dentists: state => state.dentist.dentists,
             branches: state => state.branch.branches
         }),
         ...mapGetters('reservation',[
           'getActiveEvents'
         ]),
         type: {
           get: function(){
              let type = this.reservationInfo.type
              return type == 0 ? "New Transaction" : "Followup Transaction"
           }
         },
         reservationStatus: {
           get: function(){
             let status = this.reservationInfo.status
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
           }
         }
     },
    mounted(){
            this.$store.dispatch("activenav","reservenav")
            this.init()
     }
}
</script>