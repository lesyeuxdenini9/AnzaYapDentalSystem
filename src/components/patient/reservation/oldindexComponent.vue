<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid" style="position:relative;">
                  <!-- <span class="pageheader"><i class="fa fa-calendar"></i> Appointment</span> -->
                  
                  <!-- if 1 week limit starting after 1 week from date now -->
                  <!-- <span class="float-right" style="font-size:16pt;font-weight:bold;color:dimgray;">
                    Check dates from {{formatDdate(startDate)}} to {{formatDdate(endDate)}}</span> -->

                    <div class="row">
                        <div class="col-md-6">
                               <ul class="legends">
                                  <li><button disabled style="height:20px;width:20px;background: #36B9CC"></button> Pending</li>
                                  <li><button disabled style="height:20px;width:20px;background: #1CC88A"></button> Approved</li>
                                  <li><button disabled style="height:20px;width:20px;background: #9F29E0"></button> Reschedule</li>
                                  <li><button disabled style="height:20px;width:20px;background: maroon"></button> Denied</li>
                                  <li><button disabled style="height:20px;width:20px;background: dimgray"></button> Cancelled</li>
                                  <li><button disabled style="height:20px;width:20px;background: #385ECE"></button> Confirmed</li>
                                </ul>

                        </div>
                        <div class="col-md-6">
                            <span class="float-right" style="font-size:16pt;font-weight:bold;color:dimgray;">
                    Check dates from {{formatDdate(startDate)}}</span>

                        </div>
                    </div>

                  
                    <div class="alert alert-danger" role="alert">
                     <ul>
                       <li>For Emergency or Rush Appointment Please Contact Branch Helpdesk Hotline Number</li>
                       <li>Failure to show after 15 minutes on scheduled time will cancel your reservation slot.</li>
                      </ul>
                      
                    </div>
                  
                    <hr/>
                        <ul class="nav nav-tabs">
            
                            <li class="nav-item" v-for="(branch,index) in branches" :key="index">
                                <a v-if="index==0" @click="changeFilterbranch(index)" class="active navbranch nav-link" href="javascript:void(0)">
                                          {{branch.branch}}
                                </a>
                                <a v-else @click="changeFilterbranch(index)" class="navbranch nav-link" href="javascript:void(0)">
                                          {{branch.branch}}
                                </a>
                                
                            </li>
                          
                        </ul>   
                    <div class="card">
                        <div class="card-body">
                            <!-- <button @click="toggleWeekends">toggle weekends</button> -->
                                <!-- <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Branch</span>
                                      </div>
                                       <select class="form-control" v-model="filterBranch">
                                    <option v-for="(branch,index) in branches" :key="index" :value="branch.id">{{branch.branch}}</option>
                                </select>
                            </div> -->
                               <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                        </div>
                    </div>
                    <hr/>

                    <div class="card">
                      <div class="card-header card-default" style="background:#343A40;color:white;">Table List
                             <button @click="printPDF" class="btn btn-danger float-right"><span class="fa fa-file-pdf"></span> Pdf</button>
                            </div>
                        <div class="card-body">
                          <div class="col col-md-3">
                              <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Start Date</span>
                                      </div>
                                      <input type="date" class="form-control" v-model="search.start"/>
                            </div>
                          </div>

                          <div class="col col-md-3">
                              <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">End Date</span>
                                      </div>
                                      <input type="date" class="form-control" v-model="search.end"/>
                            </div>
                          </div>

                          <div class="col col-md-3">
                              <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Appointment No</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="search.reservationNo"/>
                            </div>
                          </div>

                           <div class="col col-md-3">
                              <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Branch</span>
                                      </div>
                                      <select class="form-control" v-model="filterBranch">
                                          <option v-for="(branch,index) in branches" :key="index" :value="branch.id">{{branch.branch}}</option>
                                      </select>
                            </div>
                          </div>

                          <div class="col-md-3">
                            <button @click="manualTableSearch()" type="button" class="form-control btn btn-primary"><span class="fa fa-search"></span> Filter</button>
                          </div>
                          <table class="table table-condensed table-striped">
                            <thead>
                              <tr style="background:silver;">
                                <th style="width:10%;">AppointmentNo</th>
                                <th style="width:10%;">Date</th>
                                <th>Type</th>
                                <th style="width:5%x;">Start</th>
                                <th style="width:10%;">End</th>
                                <th style="width:10%;">Status</th>
                                <th style="width:15%;">Dentist</th>
                                <th></th>
                                <th style="width:12%;"></th>
                              </tr>
                            </thead>  

                            <tbody>
                              <tr v-for="(reserve,index) in reservationsList" :key="index">
                                <td>{{reserve.reservationNo}}</td>
                                <td>{{reserve.date}}</td>
                                <td>
                                  <span v-if="reserve.type == 0">New</span>
                                  <span v-else>Followup</span>
                                </td>
                                <td>{{DHour(reserve.Start)}}</td>
                                <td>{{DHour(reserve.End)}}</td>
                                <td>{{getStatus(reserve.status)}}</td>
                                <td>{{reserve.Dentist.fullname}}</td>
                                <td><ul>
                                  <li v-for="treatment in reserve.Treatments" :key="treatment.id"> {{treatment.service}}</li>
                                  </ul>
                                </td>
                                <td><router-link :to="{name: 'patientViewReservation', params: {idno: reserve.id}}">View Reservation Form</router-link></td>
                              </tr>
                            </tbody>
                          </table>

                        </div>
                    </div>
                  

        </div>

          <addModal :ActiveBranchIndex="ActiveBranchIndex" :schedules="schedules" :selectedDate="selectedDate" v-if="showAddModal" @closemodal="closemodal" @init="init"/>
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
import { formatBdayDate,formatDate,format12Hour } from "@/helper/helper"
import { mapActions, mapState, mapGetters } from 'vuex'
import addModal from "@/components/patient/reservation/addModalComponent"
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    addModal,
  },
  data: function() {
    return {
      search: {
        start: '',
        end: '',
        reservationNo: '',
      },
      ActiveBranchIndex: 0,
      filterBranch: "",
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
        slotDuration: "00:10:00",
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
          //  start: new Date().setDate(new Date().getDate()+7), // just add days if needed for restriction
        //    end: new Date().setDate(new Date().getDate()+9), // comment if no restriction of date onwards
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
      await this.getPatientReservations({start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd,branchid: this.branches[this.ActiveBranchIndex].id, reservationNo: this.search.reservationNo})
       this.calendarOptions.events = this.getReservationEvents
    },
    "filterBranch": async function(newval){
            let branch = this.branches.filter((branch)=>{
                if(branch.id == newval) return branch
            })
            let index = this.branches.indexOf(branch[0])
            this.ActiveBranchIndex = index
           // this.calendarOptions.hiddenDays = this.InactiveSchedules()
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            let calendarApi = this.$refs.fullCalendar.getApi()
            await this.getPatientReservations({start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd,branchid: this.branches[this.ActiveBranchIndex].id, reservationNo: this.search.reservationNo})
            this.calendarOptions.events = this.getReservationEvents
  
            this.resetScheduledDate()
    }
  },
  methods: {
    printPDF: function(){
        let records = this.reservationsList.map((reserve)=>{
            let type = reserve.type == 0 ? "New" : "Followup"
            let treatments = ''
            reserve.Treatments.forEach((treatment)=>{
              treatments = treatments + `* ${treatment.service}`
            })
            return [reserve.reservationNo,reserve.date,type,this.DHour(reserve.Start),this.DHour(reserve.End),this.getStatus(reserve.status),reserve.Dentist.fullname,treatments]
          }) 
          records.sort()
          records.unshift(['APPOINTMENT NO','DATE','TYPE','START','END','STATUS','DENTIST','TREATMENTS'])
           
            var docDefinition = {  
                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'landscape',
               content: [
                 {
                   text: `${this.branches[this.ActiveBranchIndex].branch} Appointments From ${this.$helper.formatBdayDate(this.search.start)} To ${this.$helper.formatBdayDate(this.search.end)}`, alignment: 'center', margin: [0,0,0,20]
                 },
               {
                 table: {
                   widths: ['*','auto','auto','auto','auto','auto','*','*'],
                   body: records
                 }
               }
              ]
              
            }
            this.$pdfMake.createPdf(docDefinition).open();
    },
     changeFilterbranch: function(index){
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            this.ActiveBranchIndex = index
            this.filterBranch = this.branches[this.ActiveBranchIndex].id
            
     },
    assignPossibleDates: function(){
        let scheduleddate =  new Date().setDate(new Date().getDate()+8)
        let finalscheduledDate =  this.checkifnooperation(scheduleddate)
   
        if(this.ActiveReservation.length == 0){
            this.getReservationEvents.push(  {
                  start: formatDate(finalscheduledDate),
                  end: formatDate(finalscheduledDate.setDate(finalscheduledDate.getDate()+1)),
                  overlap: false,
                  display: 'background',
                  color: '#4268D6',
                  customRender: false,
                  extendedProps: {
                    status: 10,
               dentist: '',
                    branch: '',
                  }
            })
        }
    },
    rendernewDates: async function(info){
      await this.getPatientReservations({start: info.start,end: info.end,branchid: this.branches[this.ActiveBranchIndex].id, reservationNo: this.search.reservationNo})
      this.assignPossibleDates()
      this.calendarOptions.events = this.getReservationEvents
    },
    eventRender: function(info){
         let display = ''
         let bg
         let color = "white"
         switch(info.event.extendedProps.status){
           case 0:
              bg = "#36B9CC"
              break
           case 1:
              bg = "#1CC88A"
              break
           case 2: 
              bg = "maroon"
              break
           case 3:
              bg = "dimgray"
              break
           default:
              bg = "#385ECE"
              break
         }
         if(info.event.extendedProps.isResched == 1 && info.event.extendedProps.status == 1) bg = "#9F29E0"
         
         display = `<div style="background: ${bg};color:${color};height:100%;width:100%;position: relative;padding:10px;"><span style="font-weight:bold">${info.event.title}</span>
            <br/>
            <span>${this.formatDHour(info.event.start)} - ${this.formatDHour(info.event.end)}</span>
            <br/>
            <span>Dentist: ${info.event.extendedProps.dentist}</span>
            <br/>
            <span>Branch: ${info.event.extendedProps.branch}</span></div>` 
         if(!info.event.title) display = ``
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
        // let check = new Date(selectInfo.start)
        // let datetoday = new Date() // just add days if needed
        // let date_aweek =  new Date().setDate(datetoday.getDate()+7) // just remove if need date onwards
        // date_aweek = new Date(date_aweek)
   
        // if(check > date_aweek || check <= datetoday){
        //   alert("bawal lumabas")
        // }else{
        //   this.showAddModal = true
        //   this.selectedDate = selectInfo.startStr
        // }
        this.showAddModal = true
        this.selectedDate = selectInfo.startStr
    },
    handleEventClick: function(clickInfo) {
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}' ${clickInfo.event.extendedProps.department}`)) {
      //   clickInfo.event.remove()
      // }
      if(clickInfo.event.extendedProps.status != 10)this.$router.push({name: 'patientViewReservation', params: { idno: clickInfo.event.id} })
    },
    handleEvents: async function(events) {
      this.currentEvents = events
      let calendarApi = this.$refs.fullCalendar.getApi()  
      // this.search.start = this.$helper.formatDate(calendarApi.view.activeStart)
      // this.search.end = this.$helper.formatDate(calendarApi.view.activeEnd)
      let selectedDate = new Date(calendarApi.getDate())
      selectedDate = selectedDate.getDay()
      this.calendarOptions.slotMinTime = `${this.branches[this.ActiveBranchIndex].Schedules[selectedDate].start}:00`
      this.calendarOptions.slotMaxTime = `${this.branches[this.ActiveBranchIndex].Schedules[selectedDate].end}:00`
        
    },
    DHour: function(date){
      return this.$helper.formatraw12Hour(date)
    },
    formatDHour: function(date){
      return format12Hour(date)
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
        des = "Confirmed"
        break
      }
      return des
    },
    checkifnooperation: function(date){
      let assigndate = new Date(date)
      let index = assigndate.getDay()
      let findindex = this.InactiveSchedules().indexOf(index)
      if(findindex != -1){
        assigndate = assigndate.setDate(assigndate.getDate()+1)
        this.checkifnooperation(assigndate)
      }
      return new Date(assigndate)
    },
    init: async function(){
          await this.$store.dispatch("branch/getListAllInfo")
          this.filterBranch = this.branches[this.ActiveBranchIndex].id
          let calendarApi = this.$refs.fullCalendar.getApi()
          // let datetoday = new Date()
          // let date_lweek =  new Date().setDate(datetoday.getDate()+14)
          // let date_fweek = new Date().setDate(datetoday.getDate()+8) 
          // date_lweek = new Date(date_lweek)
          // date_fweek = new Date(date_fweek)
          // this.startDate = date_fweek
          // this.endDate = date_lweek
         // this.calendarOptions.hiddenDays = this.InactiveSchedules() // remove or comment this line if it is not necessary to hide off / no operation days
          let selectedDate = new Date(calendarApi.getDate())
          selectedDate = selectedDate.getDay()
          this.calendarOptions.slotMinTime = `${this.branches[this.ActiveBranchIndex].Schedules[selectedDate].start}:00`
          this.calendarOptions.slotMaxTime = `${this.branches[this.ActiveBranchIndex].Schedules[selectedDate].end}:00`
        
          this.search.start = this.$helper.formatDate(calendarApi.view.activeStart)
          this.search.end = this.$helper.formatDate(calendarApi.view.activeEnd)
          await this.getPatientReservations({start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd,branchid: this.branches[this.ActiveBranchIndex].id, reservationNo: this.search.reservationNo})
           this.calendarOptions.events = this.getReservationEvents
          this.resetScheduledDate()
    
    },
    resetScheduledDate: function(){
        let scheduleddate =  new Date().setDate(new Date().getDate()+8)
        let finalscheduledDate =  this.checkifnooperation(scheduleddate)
        this.calendarOptions.selectConstraint.start = new Date(`${formatDate(finalscheduledDate.setDate(finalscheduledDate.getDate()-1))} 23:59:00`)
        this.calendarOptions.selectConstraint.end = this.ActiveReservation.length == 0 ?  new Date(finalscheduledDate.setDate(finalscheduledDate.getDate()+2)) :  new Date(finalscheduledDate.setDate(finalscheduledDate.getDate()+1)) 
       // this.calendarOptions.selectConstraint.start = new Date(`${formatDate(new Date().setDate(new Date().getDate()+7))} 23:59:00`)
       // this.calendarOptions.selectConstraint.end = this.ActiveReservation.length == 0 ?  new Date().setDate(new Date().getDate()+9) :  new Date().setDate(new Date().getDate()+8)
       this.startDate = new Date(finalscheduledDate.setDate(finalscheduledDate.getDate()-1))
       this.assignPossibleDates()
    },
    manualTableSearch: async function(){
        await this.getPatientReservations({start: this.search.start,end: this.search.end,branchid: this.branches[this.ActiveBranchIndex].id, reservationNo: this.search.reservationNo})
        this.calendarOptions.events = this.getReservationEvents
    },
    InactiveSchedules: function(){
        let inactivesched = []
        this.branches[this.ActiveBranchIndex].Schedules.filter((sched)=>{
          if(sched.active == 0){
           inactivesched.push(sched.index)
          }
        })
        return inactivesched
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
      branches: state=> state.branch.branches,
    }),
    ...mapGetters('reservation',[
      'getReservationEvents'
    ]),
    ActiveReservation:{
      get: function(){
          let activeReservation = this.getReservationEvents.filter((reservation)=>{
              if(reservation.extendedProps.status == 1) return reservation
          })
          return activeReservation
      }
    }
  },
  mounted(){
    this.$store.dispatch("reservation/getNextAppointment")
    this.$store.dispatch("activenav","reservationnav")
    this.init()
    let calendarApi = this.$refs.fullCalendar.getApi()
    this.$mysocket.emit("listenPrivate",`patient_${this.userinfo.id}`)
    this.$mysocket.on('updatePatientNotification',async ()=>{
      await this.getPatientReservations({start: calendarApi.view.activeStart,end: calendarApi.view.activeEnd,branchid: this.branches[this.ActiveBranchIndex].id, reservationNo: this.search.reservationNo})
        this.calendarOptions.events = this.getReservationEvents
      
        let scheduleddate =  new Date().setDate(new Date().getDate()+8)
        let finalscheduledDate =  this.checkifnooperation(scheduleddate)
        this.calendarOptions.selectConstraint.start = new Date(`${formatDate(finalscheduledDate.setDate(finalscheduledDate.getDate()-1))} 23:59:00`)
        this.calendarOptions.selectConstraint.end = this.ActiveReservation.length == 0 ?  new Date(finalscheduledDate.setDate(finalscheduledDate.getDate()+2)) :  new Date(finalscheduledDate.setDate(finalscheduledDate.getDate()+1)) 
        this.assignPossibleDates()
   })
  },
}
</script>

<style lang="css" scoped>
  .legends {
    /* position:absolute;
    left:15%;
    top:10px; */
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
    font-size: 10pt;
    font-weight: bold;
    color:dimgray;
  }
</style>