<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-file-alt"></i> Pending Appointment List</span>
                    <hr/>

                <div class="card">
                    <div class="card-body">
                        <table class="table table-condensed table-striped">
                            <thead>
                                <tr>
                                    <th>Appointment No</th>
                                    <th>Branch</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Client</th>
                                    <th>Dentist</th>
                                    <th>Type</th>
                                    <th>Transaction No</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr @dblclick="viewReservation(reservation.id)" style="cursor:pointer;" v-for="(reservation,index) in pendingReservation" :key="index">
                                    <td>{{reservation.reservationNo}}</td>
                                    <td>{{reservation.Branch.branch}}</td>
                                    <td>{{dDate(reservation.date)}}</td>
                                    <td>{{dHour(reservation.Start)}}</td>
                                    <td>{{reservation.User.fullname}}</td>
                                    <td>{{reservation.Dentist.fullname}}</td>
                                    <td>
                                        <span v-if="reservation.type == 0">New Transaction</span>
                                        <span v-else>Followup Transaction</span>
                                    </td>
                                    <td><span v-if="reservation.Transaction">{{reservation.Transaction.transactionNo}}</span></td>
                                    <td><a href="javascript:void(0)" @click="viewReservation(reservation.id)">View</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

        </div>
  
    </div>
</template>

<script>
import { formatBdayDate  } from '@/helper/helper'
import { mapState } from 'vuex'
export default {
    methods: {
        dDate: function(date){
            return formatBdayDate(date)
        },
        dHour: function(date){
            return this.$helper.formatraw12Hour(date)
        },
        viewReservation: function(idno){
           this.$router.push({name: 'viewReservation',params: {idno: idno}})
        }
    },
    computed: {
        ...mapState({
          pendingReservation: state=>state.reservation.pendings
        })
    },
    mounted(){
        this.$store.dispatch("activenav","reservenav")
        this.$store.dispatch("reservation/getPending")
    }

}
</script>