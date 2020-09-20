<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-plus"></span> Create Reservation {{formatDate(selectedDate)}} ( opening: {{opening}} closing: {{closing}} )</h5>
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


                            
                            <div style="display:none;" class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Branch</span>
                                      </div>

                                <select class="form-control" v-model="reservation.branch">
                                    <option v-for="(branch,index) in branches" :key="index" :value="branch.id">{{branch.branch}}</option>
                                </select>

                            </div>

                             <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Branch <span style="color:maroon">*</span></span>
                                      </div>
                                    <input type="text" class="form-control" readonly style="background:white" v-model="branchname"/>

                            </div>


                            <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Type <span style="color:maroon">*</span></span>
                                      </div>

                                       <select class="form-control" v-model="reservation.type">
                                    <option value="0">New Transaction</option>
                                    <option value="1">Followup</option>
                                </select>

                            </div>
               

                            <table class="table table-condensed" v-if="reservation.type == '1'">
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

                            <div v-if="reservation.type == 1" style="text-align: center;">
                                <span v-if="followups.length == 0" style="color:dimgray;font-weight:bold;font-size: 16pt">NO ACTIVE FOLLOWUP TRANSACTIONS</span>
                            </div>

                             <div class="input-group mb-3" v-if="reservation.type == '0'">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Dentist <span style="color:maroon">*</span></span>
                                      </div>

                                         <select class="form-control" v-model="reservation.dentist">
                                            <option v-for="(dentist,index) in branches[ActiveBranchIndex].Dentists" :key="index" :value="dentist.id">{{dentist.fullname}}</option>
                                        </select>

                             </div>

                            
                                  <div class="input-group mb-3" v-if="reservation.dentist != ''">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Time <span style="color:maroon">*</span></span>
                                      </div>
                                       <select class="form-control" v-model="reservation.start">
                                    <option :disabled="time.active == 1" v-for="(time,index) in scheduletime" :key="index" :value="time.value">{{time.text}}</option>
                                    <!-- <option v-for="(time,index) in scheduletime" :key="index" :value="time.value">{{schedulestring[time.index]}}</option> -->
                                </select>
                                  </div>
    

                                  <div class="row"  v-if="reservation.type == '0'">
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
                                    <button @click="add" style="width:100%;"> <span class="fa fa-plus"></span> Add</button>
                                </div>
                            </div>

                                 <div class="row"  v-if="reservation.type == '0'">
                                <div class="col col-md-12">
                                    <table class="table table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Service <span style="color:maroon">*</span></th>
                                                <th>Amount</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(list,index) in reservation.servicelist" :key="index">
                                                <td>{{list.service}}</td>
                                                <td><input class="form-control" type="number" v-model="list.price" readonly style="background:white;"/></td>
                                                <td><button @click="removeserviceList(index)" style="background:transparent;border:none;color:maroon;"><span class="fa fa-minus"></span> </button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                </div>

                <div class="modal-footer">
                    <button :disabled="followups.length == 0 && reservation.type == 1" class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Create</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>
// note* as of now disregard followup with new treatments or transaction
// but if needed either add nalang ng bagong transactionNo para sa mga bagong treatments or iappend nlang sa existing transaction followup ung mga treatments :)
import Select2 from 'v-select2-component'
import { mapActions, mapState, mapGetters } from 'vuex'
import {formatBdayDate , formatraw12Hour} from "@/helper/helper" 

export default {
    components: {
        Select2
    },
    props: {
        ActiveBranchIndex: {
            type: Number,
            required: true,
        },
        selectedDate: {
            type: String,
            required: true,
        },
        schedules: {
            type: Array,
            required: true,
        }
    },
    watch: {
        'reservation.type': function(){
            this.reservation.servicelist = []
            this.reservation.transaction = ""
            this.reservation.start = ""
        },
        'reservation.dentist': function(newval){
              this.refreshscheduletime()
                this.filtertimedata.dentist = newval
                this.blockapprovedTime()
        },
        'reservation.branch': function(newval){
              let branch = this.branches.filter((branch)=>{
                  if(branch.id == newval) return branch
              })

              let index = this.branches.indexOf(branch[0])
              this.ActiveBranchIndex = index
            
               this.refreshscheduletime()
            
        }
    },
    data: function(){
         return {
            // ActiveBranchIndex: 0,
            errormsg: [],
            branchname: '',
            reservation: {
                branch: "",
                type: "",
                start: "",
                dentist: "",
                transaction: "",
                servicelist:[],
                selectedDate: this.selectedDate,
            },
            dayindex: '',
            scheduletoday: {},
            scheduletime: [],
            opening: "",
            closing: "",
            schedulestring: [
                    "12:00 am","01:00 am","02:00 am","03:00 am","04:00 am","05:00 am","06:00 am","07:00 am","08:00 am","09:00 am","10:00 am","11:00 am",
                    "12:00 pm","01:00 pm","02:00 pm","03:00 pm","04:00 pm","05:00 pm","06:00 pm","07:00 pm","08:00 pm","09:00 pm","10:00 pm","11:00 pm",
            ],
            // schedulestring: [
            //         "12:01 am","01:01 am","02:01 am","03:01 am","04:01 am","05:01 am","06:01 am","07:01 am","08:01 am","09:01 am","10:01 am","11:01 am",
            //         "12:01 pm","01:01 pm","02:01 pm","03:01 pm","04:01 pm","05:01 pm","06:01 pm","07:01 pm","08:01 pm","09:01 pm","10:01 pm","11:01 pm",
            // ],
             myValue: '',
             ph: "Service List",
             filtertimedata: {
                 dentist: '',
                 date: this.selectedDate
             }
        }
    },
    methods: {
        refreshscheduletime: function(){
                this.reservation.branch = this.branches[this.ActiveBranchIndex].id
                let day = new Date(this.selectedDate)
                let dayindex = day.getDay()
                this.dayindex = dayindex
                let scheduletoday = this.branches[this.ActiveBranchIndex].Schedules.filter((sched)=>{
                    if(sched.index == this.dayindex) return sched
                })
                this.scheduletoday = scheduletoday[0]
                
                let starttime = parseInt(this.scheduletoday.start.split(":")[0])
                let endtime = parseInt(this.scheduletoday.end.split(":")[0])

                this.opening = formatraw12Hour(this.scheduletoday.start)
                this.closing = formatraw12Hour(this.scheduletoday.end)
                this.scheduletime = []
                for(starttime; starttime<endtime; starttime++){
                    this.scheduletime.push({active: 0,index: starttime, value: `${starttime}:00`, text: this.schedulestring[starttime]})
                }
        },
        blockapprovedTime: async function(){
           await this.$store.dispatch("reservation/getApprovedTimeDay",this.filtertimedata)
        
           this.getReserveTime.forEach((time)=>{
               this.scheduletime.forEach((sched)=>{
                   if(sched.index == time.index){
                       sched.active = 1
                       sched.text = `${this.schedulestring[sched.index]} - Unavailable`
                   }
               })
           })
        },
        selectedTransaction: function(index){
            let transact = this.$refs.followuptransaction[index]
            if(transact.style.background == "silver"){
                this.reservation.transaction = ""
                this.reservation.dentist = ""
                transact.style.background = "white"
            }else{
                this.reservation.transaction = this.followups[index].id,
                this.reservation.dentist = this.followups[index].dentistId,
                 transact.style.background = "silver"
                this.reservation.servicelist = this.followups[index].Treatments.map((treatment)=>{
                    return {
                        id:treatment.serviceId,
                        service:treatment.service,
                        price:treatment.amount,
                    }
                })
            }
        },
        closethis: function(){
            this.$emit("closemodal")
        },
        save: function(){          
            this.$store.dispatch('reservation/save',this.reservation)
                   .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                        this.$emit("init")
                        this.closethis()
                        this.$mysocket.emit('reservationCreated',res.data.data)
                        this.$mysocket.emit('notificationCreated')
                        this.$swal.fire('Reservation has been created!','','success')
                    }
            })
            .catch(err=>console.log(err))
        },
        ...mapActions('dentist',[
          'getList',
        ]),
        ...mapActions('reservation',[
            'getUserTransaction'
        ]),
        ...mapActions('service',{
            getService: 'getList',
        }),
        formatDate: function(date){
            return formatBdayDate(date)
        },
        add: function(){
            let service = {
                id: this.branches[this.ActiveBranchIndex].Services[this.myValue].id,
                service: this.branches[this.ActiveBranchIndex].Services[this.myValue].service,
                price: this.branches[this.ActiveBranchIndex].Services[this.myValue].regularPrice,
            }

            if(this.reservation.servicelist.length == 0){
                this.reservation.servicelist.push(service)
            }else{
                let duplicate = 0
                for(let x = 0 ; x < this.reservation.servicelist.length; x++){
                        if(this.reservation.servicelist[x].id == service.id ){
                        duplicate = 1
                        break
                    }  
                }

                if(duplicate==0)  this.reservation.servicelist.push(service)
            }
     
            this.myValue = ''

        },
        removeserviceList: function(index){
            this.reservation.servicelist.splice(index,1)
        },
        init: async function(){
                await this.$store.dispatch("branch/getListAllInfo")
                this.reservation.branch = this.branches[this.ActiveBranchIndex].id
                this.branchname = this.branches[this.ActiveBranchIndex].branch
                // let day = new Date(this.selectedDate)
                // let dayindex = day.getDay()
                // this.dayindex = dayindex
                // let scheduletoday = this.branches[0].Schedules.filter((sched)=>{
                //     if(sched.index == this.dayindex) return sched
                // })
                // this.scheduletoday = scheduletoday[0]
                
                // let starttime = parseInt(this.scheduletoday.start.split(":")[0])
                // let endtime = parseInt(this.scheduletoday.end.split(":")[0])

                // this.opening = formatraw12Hour(this.scheduletoday.start)
                // this.closing = formatraw12Hour(this.scheduletoday.end)

                // for(starttime; starttime<endtime; starttime++){
                //     this.scheduletime.push({active: 0,index: starttime, value: `${starttime}:00`, text: this.schedulestring[starttime]})
                // }
                this.getList()
                this.getUserTransaction({status: 1,branch: this.reservation.branch}) // 0 - pending/ongoing 1 - for followup 2 - done
                this.getService()
        }
    },
    computed: {
      ...mapState({
          dentists: state => state.dentist.dentists,
          followups: state => state.reservation.followupTransactions,
          services: state => state.service.services,
          approvedTimes:state=> state.reservation.approvedTimes,
          branches: state=> state.branch.branches,
        }),
        ...mapGetters('reservation',[
            'getReserveTime'
        ]),
    serviceOptions: {
            get: function(){
                let x = -1
                return  this.branches[this.ActiveBranchIndex].Services.map((s)=>{
                      x++
                    // return {id: x , text: `${s.service} ( ${s.description} ) - Estimated Price: P ${s.regularPrice}`} 
                     return {id: x , text: `${s.service} ( ${s.category} ) - Estimated Price: P ${s.regularPrice}`} 
                  
                })
            }
        },
    },
    mounted(){
        this.init()

    }
}
</script>
