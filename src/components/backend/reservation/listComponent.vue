<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-file-alt"></i> Reservation List</span>
                    <hr/>

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
                                          <span class="input-group-text" id="basic-addon3">Reservation No</span>
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
                        <table class="table table-condensed">
                            <thead>
                                <tr style="background:#343A40;color:white;">
                                    <th>#</th>
                                    <th>Reservation No</th>
                                    <th>Reservation Date</th>
                                    <th>Patient Name</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Dentist</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(reserve,index) in list" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{reserve.reservationNo}}</td>
                                    <td>{{reserve.date}}</td>
                                    <td>{{reserve.User.fullname}}</td>
                                    <td>{{dHour(reserve.starttime)}}</td>
                                    <td>{{dHour(reserve.endtime)}}</td>
                                    <td>{{reserve.Dentist.fullname}}</td>
                                    <td>{{getStatus(reserve.status)}}</td>
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
import { formatDate ,format12Hour } from "@/helper/helper"
import { mapState } from "vuex"
export default {

    data: function(){
        return {
            search :{
                start: "",
                end: "",
                reservationNo: "",
            },
            showDetailsModal: false,
            reservationInfo: {}
        }
    },
    methods: {
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
            return format12Hour(date)
        },
        searchProceed: function(){
            this.$store.dispatch("reservation/list",this.search)
        }
    },
    computed: {
        ...mapState({
            list: state=> state.reservation.list,
        })
    },
    mounted(){
        this.$store.dispatch("activenav","reservenav")

        const datenow = new Date()
        this.search.start =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth(), 1))
        this.search.end =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth()+1, 0))

        this.$store.dispatch("reservation/list",this.search)
    },
    components: {
        detailsModal
    }
}
</script>