<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-file-alt"></i> Appointment List</span>
                    <button @click="printPDF" class="btn btn-danger float-right"><span class="fa fa-file-pdf"></span> Pdf</button>
                    <hr/>

                    
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

                <div class="card">

                    <div class="card-body">
                    <div class="row">
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
                                          <span class="input-group-text" id="basic-addon3">Dentist</span>
                                      </div>
                                     <select class="form-control" v-model="search.dentist">
                                         <option value="All">All</option>
                                         <option v-for="(dentist,index) in branches[activebranchIndex].Dentists" :key="index" :value="dentist.id">{{dentist.fullname}}</option>
                                     </select>
                            </div>
                            </div>

                            <div class="col col-md-3">
                                    <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Status</span>
                                      </div>
                                      <select class="form-control" v-model="search.status">
                                         <option value="All">All</option>
                                         <option value="1">Approved</option>
                                         <option value="3">Cancelled</option>
                                         <option value="4">Confirmed</option>
                                         <option value="2">Denied</option>
                                     </select>
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
                                    <button @click="searchProceed" class="form-control btn btn-primary"><span class="fa fa-search"></span> Search</button>
                            </div>

                    </div>

                    </div>
                </div>
                <br/>

                <div class="card">
                    <div class="card-body">
                        <table class="table table-condensed table-striped">
                            <thead>
                                <tr style="background:#343A40;color:white;">
                                    <th>#</th>
                                    <th>Appointment No</th>
                                    <th>Appointment Date</th>
                                    <th>Patient Name</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Dentist</th>
                                    <th>Status</th>
                                    <!-- <th>Resched</th> -->
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(reserve,index) in list" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{reserve.reservationNo}}</td>
                                    <td>{{reserve.date}}</td>
                                    <td>{{reserve.User.fullname}}</td>
                                    <td>{{dHour(reserve.Start)}}</td>
                                    <td>{{dHour(reserve.End)}}</td>
                                    <td>{{reserve.Dentist.fullname}}</td>
                                    <td>{{getStatus(reserve.status)}}</td>
                                    <!-- <td>
                                        <span v-if="reserve.isResched == 1">Yes</span>
                                        <span v-else>No</span>
                                    </td> -->
                                    <td><a @click="viewDetails(index)" href="javascript:void(0)">View Details</a></td>
                                </tr>
                            </tbody>
                        </table>

                      
                    </div>
                </div>

        </div>

        <detailsModal :reservationInfo="reservationInfo" v-if="showDetailsModal" @closemodal="closemodal"/>
  
    </div>
</template>

<script>
import detailsModal from "@/components/backend/reservation/detailsModal"
import { formatDate } from "@/helper/helper"
import { mapState } from "vuex"
export default {

    data: function(){
        return {
            search :{
                start: "",
                end: "",
                reservationNo: "",
                dentist: "All",
                status: "All",
            },
            showDetailsModal: false,
            reservationInfo: {},
            activebranchIndex: 0,
        }
    },
    methods: {
        findDentistName: function(id){
            let finddentist = this.branches[this.activebranchIndex].Dentists.filter((dentist)=>{
                if(dentist.id == id) return dentist
            })

            let findindex = this.branches[this.activebranchIndex].Dentists.indexOf(finddentist[0])
            return this.branches[this.activebranchIndex].Dentists[findindex].fullname
        },
           printPDF: function(){
            

          let reservations = this.list.map((reserve)=>{
            return [reserve.reservationNo,reserve.date,reserve.User.fullname,this.dHour(reserve.Start),this.dHour(reserve.End),reserve.Dentist.fullname,this.getStatus(reserve.status)]
          }) 
          reservations.sort()
          reservations.unshift(['REFERENCE NO','DATE','PATIENT','START TIME','END TIME','DENTIST','STATUS'])

          let status = this.search.status == "All" ? "All" : this.getStatus(parseInt(this.search.status))

          let dentist = this.search.dentist == "All" ? "All" : this.findDentistName(parseInt(this.search.dentist))
            var docDefinition = {  

                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'landscape',
               content: [
                 {
                   text: `${this.branches[this.activebranchIndex].branch} Appointments Records`, alignment: 'center', margin: [0,0,0,20]
                 },
                 {
      
                    columns: [
                        {
                            text: `Start Date: ${this.$helper.formatBdayDate(this.search.start)}`
                        },
                        {
                            text: `Dentist: ${dentist}`
                        }
                    ]
                },
                      {
      
                    columns: [
                        {
                            text: `End Date: ${this.$helper.formatBdayDate(this.search.end)}`
                        },
                        {
                            text: `Status: ${status}`
                        }
                    ]
                },
                '\n',
               {
                 table: {
                   widths: ['auto','auto','*','auto','auto','*','auto'],
                   body: reservations
                 }
               }
              ]
              
            }
            this.$pdfMake.createPdf(docDefinition).open();
        },
        viewDetails:function(index){
            this.reservationInfo = this.list[index]
            this.showDetailsModal = true
        },
        closemodal: function(){
            this.showDetailsModal = false
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
        dHour: function(date){
            return this.$helper.formatraw12Hour(date)
        },
        searchProceed: function(){
            this.search.branch = this.branches[this.activebranchIndex].id
            this.$store.dispatch("reservation/list",this.search)
        },
        changeFilterbranch: function(branch,index){
            this.search.dentist = "All"
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            this.activebranchIndex = index
            this.search.branch = this.branches[this.activebranchIndex].id
            this.$store.dispatch("reservation/list",this.search)

        },
    },
    computed: {
        ...mapState({
            list: state=> state.reservation.list,
            branches: state=> state.branch.branches,
        })
    },
    mounted(){
        this.$store.dispatch("branch/getListDentist")
            .then((res)=>{
                
                const datenow = new Date()
                this.search.start =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth(), 1))
                this.search.end =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth()+1, 0))

                this.changeFilterbranch(res[0].id,0)
            })
            .catch(err=>console.log(err))
        this.$store.dispatch("activenav","reservenav")

        
    },
    components: {
        detailsModal
    }
}
</script>