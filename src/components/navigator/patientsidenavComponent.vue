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
        <router-link class="nav-link" :to="{name: 'patientdashboard'}">
          <i class="fas fa-fw fa-user"></i>
          <span> Profile</span></router-link>
      </li>

      


       <li class="nav-item" id="reservationnav">
        <router-link class="nav-link" :to="{name: 'patientReservation'}">
          <i class="fas fa-fw fa-calendar"></i>
          <span> Appointment(s)</span></router-link>
      </li>

          <!-- Nav Item - Dashboard -->
      <li class="nav-item" id="recordnav">
        <router-link class="nav-link" :to="{name: 'patienttransaction'}">
          <i class="fas fa-fw fa-edit"></i>
          <span> Records</span></router-link>
      </li>

           <!-- Nav Item - Dashboard -->
      <li class="nav-item" id="feedbacknav">
        <router-link class="nav-link" :to="{name: 'patientfeedback'}">
          <i class="fas fa-fw fa-star"></i>
          <span> Feedbacks/Comments</span></router-link>
      </li>



      <!-- Nav Item - Tables -->
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

export default {
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
        }
    },
    mounted(){

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

</style>