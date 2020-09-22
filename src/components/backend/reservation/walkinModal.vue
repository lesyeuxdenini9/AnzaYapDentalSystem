<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-calendar"></span> Walkin Reservation</h5>
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
                                <div class="col col-md-4">
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3" >Date <span style="color:maroon;">*</span></span>
                                        </div>
                                        <input type="date" class="form-control" v-model="filterData.date"/>
                                         </div>

                                </div>

                                 <div class="col col-md-4">
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">StartTime <span style="color:maroon;">*</span></span>
                                        </div>
                                        <input type="time" class="form-control" v-model="filterData.start"/>
                                         </div>

                                </div>

                                 <div class="col col-md-4">
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">EndTime <span style="color:maroon;">*</span></span>
                                        </div>
                                        <input type="time" class="form-control" v-model="filterData.end"/>
                                         </div>

                                </div>

                            </div>


                            <div class="row">
                                <div class="col col-md-8">
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">Patient <span style="color:maroon;">*</span></span>
                                        </div>
                                               <input type="text" v-model="filterData.patientname" class="form-control" readonly style="background:white;"/>
                                         </div>

                                </div>

                                <div class="col col-md-4">
                                     <button v-if="filterData.patientname == ''" @click="showpatientlist=true" class="btn btn-primary form-control"> Select Patient</button>
                                      <button v-else @click="removepatient()" class="btn btn-primary form-control"> Remove Patient</button>
                                </div>

                            </div>


                            <div class="row">
                                   <div class="col col-md-12">
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">Type</span>
                                        </div>
                                        <select class="form-control" v-model="filterData.type">
                                                <option value="0">New Transaction</option>
                                                <option value="1">Followup</option>
                                        </select>
                                         </div>

                                </div>

                                   <table class="table table-condensed" v-if="filterData.type == '1'">
                                    <thead>
                                        <tr>
                                            <th>Transaction No</th>
                                            <th>Date</th>
                                            <th>Dentist</th>
                                            <th>Treatments</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr style="cursor:pointer" @click="selectedTransaction(index)" ref="followuptransaction" v-for="(followup,index) in followups" :key="index">
                                            <td>{{followup.transactionNo}}</td>
                                            <td>{{followup.transactionDate}}</td>
                                            <td>{{followup.dentist}}</td>
                                            <td>
                                                <ul>
                                                    <li v-for="treatment in followup.Treatments" :key="treatment.id">{{treatment.service}}</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                            </table>

                            </div>

                            <div class="row">

                                <div class="col col-md-12" v-if="filterData.type == '0'">
                                      <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">Dentist  <span style="color:maroon;">*</span></span>
                                        </div>
                                        <select class="form-control" v-model="filterData.dentist">
                                                <option v-for="(dentist,index) in branch.Dentists" :key="index" :value="dentist.id">{{dentist.fullname}}</option>
                                        </select>
                                         </div>

                                </div>

                            </div>

                            <div class="row" v-if="filterData.type == '0'">

                                 
                                <div class="col col-md-10">
                                        <div class="form-group">
                                       
                                       <!-- <Select2 class="formselect" :placeholder="ph" v-model="myValue" :options="myOptions" :settings="{ multiple: true, settingOption: myValue }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" /> -->
                                        <Select2
                                        :placeholder="ph"
                                         v-model="myValue" 
                                        :options="serviceOptions"
                                        />
                                         </div>
                                </div>

                                <div class="col col-md-2">
                                    <button @click="add()" style="width:100%;"> <span class="fa fa-plus"></span> Add</button>
                                </div>
                                       

                            </div>

                                <div class="row">

                              <div class="col col-md-12">
                                    <table class="table table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Service  <span style="color:maroon;">*</span></th>
                                                <th>Amount</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(list,index) in filterData.servicelist" :key="index">
                                                <td>{{list.service}}</td>
                                                <td>{{$helper.roundToDecimal(list.price,2)}}<input class="form-control" type="number" v-model="list.price" style="background:white;display:none;"/></td>
                                                <td><button @click="removeserviceList(index)" style="background:transparent;border:none;color:maroon;"><span class="fa fa-minus"></span> </button></td>
                                            </tr>
                                        </tbody>
                                    </table>
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

                                <div class="col col-md-12">
                                     <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                                </div>
                                </div>
         
                            <h4 style="color:dimgray;" v-if="dateactive == 0">NO OPERATION / CLOSED</h4>
                            <h4 style="color:dimgray;" v-else>Opening: {{opening}} Closing: {{closing}}</h4>
                  
                </div>

                <div class="modal-footer">
                    <button :disabled="dateactive == 0" class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Create</button>
                </div>
                </div>
            </div>

            <patientListModal v-if="showpatientlist" @closemodal="closemodal" @setpatient="setpatient" @init="init"/>
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
import Select2 from 'v-select2-component'
import patientListModal from "@/components/backend/reservation/patientListModal"
export default {
    props: {
        transaction: {
            type: Object,
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
            this.dateactive = this.branch.Schedules[selectedDate].active
            this.filterData.branch = this.branch.id

             await this.getApprovedListDay(this.filterData)
             this.calendarOptions.events = this.getActiveEvents
        },
        'filterData.patientname': async function(newval){
            if(newval != ""){
                this.getUserTransactionWalkIn({status: 1,branch: this.filterData.branch, userid: this.filterData.patient})
            }
        },
        'filterData.dentist': async function(newval){
            if(newval != ""){
                await this.getApprovedListDay(this.filterData)
                this.calendarOptions.events = this.getActiveEvents
            }
        },
        'filterData.type': function(){
            this.filterData.dentist = ""
            this.filterData.transaction = ""
        }
    },
    data: function(){
        return {
            dateactive: 0,
            showpatientlist: false,
             myValue: '',
             ph: "Service List",
            activeIndexBranch: 0,
             errormsg: [],
             filterData: {
                 date: formatDate(new Date()),
                 dentist: "",
                 start: "",
                 end: "",
                 curdate: formatDate(new Date()),
                 minTime: "",
                 maxTime: "",
                 remarks: "",
                 type: 0,
                 servicelist: [],
                 patient: this.transaction.userId,
                 patientname: "",
                 transaction: "",
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
             selectedTransaction: function(index){
                let transact = this.$refs.followuptransaction[index]
                if(transact.style.background == "silver"){
                    this.filterData.transaction = ""
                    this.filterData.dentist = ""
                    this.filterData.servicelist = []
                    transact.style.background = "white"
                }else{
                    this.filterData.transaction = this.followups[index].id,
                    this.filterData.dentist = this.followups[index].dentistId,
                    transact.style.background = "silver"
                    this.filterData.servicelist = this.followups[index].Treatments.map((treatment)=>{
                        return {
                            id: treatment.serviceId,
                            service: treatment.service,
                            price: treatment.regularPrice
                        }
                    })
                }
            },
            removepatient: function(){
                this.filterData.patient = ""
                this.filterData.patientname = ""
            },
            setpatient: function(patient){
                this.filterData.patient = patient.id
                this.filterData.patientname = patient.fullname
            },
             removeserviceList: function(index){
                this.filterData.servicelist.splice(index,1)
            },
           add: function(){
  
            let service = {
                id: this.branch.Services[this.myValue].id,
                service: this.branch.Services[this.myValue].service,
                price: this.branch.Services[this.myValue].regularPrice,
            }

            if(this.filterData.servicelist.length == 0){
                this.filterData.servicelist.push(service)
            }else{
                let duplicate = 0
                for(let x = 0 ; x < this.filterData.servicelist.length; x++){
                        if(this.filterData.servicelist[x].id == service.id ){
                        duplicate = 1
                        break
                    }  
                }

                if(duplicate==0)  this.filterData.servicelist.push(service)
            }
     
            this.myValue = ''

        },
        formatDHour: function(date){
            return format12Hour(date)
        },
        eventRender: function(info){
            let display = ''
            let bg = "#1CC88A"
            let color = "white"

        if(info.event.extendedProps.status == 4) bg = "#385ECE"
 
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
            'changeReservationDate',
            'getUserTransactionWalkIn',
        ]),
        closemodal: function(){
            this.showpatientlist = false
        },
        closethis: function(){
            this.$emit("closemodal")
        },
        init: async function(){
              this.$store.dispatch("branch/getInfo",{idno: this.transaction.branchId , type: 0}).then(async ()=>{
                let calendarApi = this.$refs.fullCalendar.getApi()
               let scheduledate = new Date(this.filterData.date)
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
              })
               
        }, 
        save: function(){
            if(this.filterData.patient == 0) this.filterData.patient = ""
            this.$store.dispatch("reservation/createWalkInReservation",this.filterData)
                    .then((res)=>{
                        if(res.data.errors){
                             this.errormsg = res.data.errors
                              this.$refs.errormessage.classList.add("show")

                        }else{
                            this.$mysocket.emit('updatePatientNotification',{privateID: `patient_${this.filterData.patient}`})
                        
                             this.$swal("Reservation has been created","","success")
                              this.$emit("init")
                             this.closethis()
                             this.$refs.errormessage.classList.remove("show")
                             this.errormsg = []
                        }
                    })
                     .catch(err=>console.log(err))
         
        }
    },
    computed: {
         serviceOptions: {
            get: function(){
                let x = -1
                return  this.branch.Services.map((s)=>{
                      x++
                    return {id: x , text: `${s.service} - Price: P ${this.$helper.roundToDecimal(s.regularPrice,2)}`} 
                  
                })
            }
        },
        ...mapState({
             schedules: state=> state.schedules,
             branch: state=> state.branch.branch,
             followups: state => state.reservation.followupTransactions,
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
      FullCalendar,
      Select2,
      patientListModal
    }
}
</script>

<style scoped>
 
</style>
