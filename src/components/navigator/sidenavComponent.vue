<template>

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <router-link :to="{name: 'dashboard'}" class="sidebar-brand d-flex align-items-center justify-content-center" style="background:#083D55;">
        <div class="sidebar-brand-icon rotate-n-0">
          <!-- <i class="fas fa-laugh-wink"></i> -->
          <img src="@/assets/logoraw.jpg" style="height:40px;width:50px;border-radius:10px;"/>
        </div>
        <div class="sidebar-brand-text mx-3">Dental Clinic</div>
      </router-link>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item" id="dashboardnav">
        <router-link class="nav-link" :to="{name: 'dashboard'}">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></router-link>
      </li>

    
          
      <li id="patientnav" class="dropdown nav-item"> <a class="nav-link" href="javascript:void(0)">
          <i class="fas fa-fw fa fa-user-md"></i>
          <span> Manage Patient(s)</span></a>
        <div class="dropdown-content">
           <router-link class="dropdownItem" :to="{name: 'newPatient'}"><span class="fa fa-plus-circle"></span> New</router-link>
           <router-link class="dropdownItem" :to="{name: 'listPatient'}"><span class="fa fa-search"></span> Search</router-link>
            
        </div>
       </li>

  
<!-- 
      <li id="appointmentnav" class="nav-item">
        <router-link class="nav-link" :to="{name: 'appointment'}">
          <i class="fas fa-fw fa-clock"></i>
          <span>Appointments</span></router-link>
      </li>
 -->


              <li id="reservenav" class="dropdown nav-item"> <a class="nav-link" href="javascript:void(0)">
          <i class="fas fa-fw fa-file-alt"></i>
          <span> Appointment(s)</span><span class="badgenum" v-if="pendingCount > 0">{{pendingCount}}</span></a>
        <div class="dropdown-content">
            <router-link class="dropdownItem" :to="{name: 'appointment'}"><span class="fa fa-file-alt"></span> Appointment(s)</router-link>
           <router-link class="dropdownItem" :to="{name: 'pendingReservation'}"><span class="fa fa-times-circle"></span> Pending</router-link>
           <router-link class="dropdownItem" :to="{name: 'dataReservationList'}"><span class="fa fa-check-circle"></span> List</router-link>
            
        </div>
       </li>

        <li class="nav-item" id="pharmacynav">
        <router-link class="nav-link" :to="{name: 'pharmacySale'}">
          <i class="fas fa-fw fas fa-file-prescription"></i>
          <span> Pharmacy</span></router-link>
      </li>



            <hr class="sidebar-divider">
      <!-- Nav Item - Tables -->

      <li class="nav-item" id="settingnav">
        <router-link class="nav-link" :to="{name: 'settings'}">
          <i class="fas fa-fw fa-cogs"></i>
          <span> Other Settings</span></router-link>
      </li>

          <li  v-if="userinfo.usertype == 3 || userinfo.usertype == 0" id="reportnav" class="dropdown nav-item"> <a class="nav-link" href="javascript:void(0)">
          <i class="fas fa-fw fa-book"></i>
          <span> Reports</span></a>
        <div class="dropdown-content">
           <!-- <router-link class="dropdownItem" :to="{name: 'newPatient'}"><span class="fa fa-plus-circle"></span> Create</router-link> -->
           <router-link class="dropdownItem" :to="{name: 'report_records'}"><span class="fa fa-file-alt"></span> Records</router-link>
           <router-link class="dropdownItem" :to="{name: 'report_sales'}"><span class="fa fa-dollar-sign"></span> Graphs</router-link>
            
        </div>
       </li>

            <!-- Nav Item - Dashboard -->
      <li  v-if="userinfo.usertype == 3 || userinfo.usertype == 0" class="nav-item" id="backendfeedbacknav">
        <router-link class="nav-link" :to="{name: 'backendfeedback'}">
          <i class="fas fa-fw fa-star"></i>
          <span> Feedbacks/Comments</span></router-link>
      </li>





      <li class="nav-item">
        <a class="nav-link" href="javascript:void(0)" @click="logout">
          <i class="fas fa-power-off"></i>
          <span> Logout</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block">

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>
    <!-- End of Sidebar -->

</template>

<script>

import { mapState } from 'vuex'
export default {
    name: 'sidenav',
    methods: {
        logout:function(){
             this.$swal({
                title: 'Leave this Application?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Logout!'
              }).then((result) => {
                if (result.value) {
                  this.$store.dispatch("logout")
                  this.$router.replace("/")
                }
              })
           
        }
    },
    computed: {
        userinfo: function(){
            return JSON.parse(this.$store.state.userinfo)
        },
        ...mapState({
          pendingCount: state=>state.reservation.pendingCount
        })
    },
    mounted(){
        this.$store.dispatch("reservation/getPending")
        this.$mysocket.on('updateReservation',()=>{
            this.$store.dispatch("reservation/getPending")
        })
    },
}
</script>

<style scoped>
  aside span#toggle-button {
    font-size: 32pt;
    font-weight: bold;
    color: white;
    float: right;
    margin-right: 10px;
    cursor: pointer;
    }

    .badgenum {
      position:absolute;
      right:10px;
      background:green;
      padding:2px 5px;
      border-radius:50%;
    }

</style>