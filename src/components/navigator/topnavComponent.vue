<template>
       <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          <!-- Sidebar Toggle (Topbar) -->
          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">

                          <!-- Nav Item - Alerts -->
            <li class="nav-item dropdown no-arrow mx-1">
              <a @click="showalert.display == 'none' ? showalert.display = 'block' : showalert.display = 'none'" class="nav-link dropdown-toggle" href="javascript:void(0)" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bell fa-fw"></i>
                <span class="badge badge-danger badge-counter" v-if="notifications.length > 0">{{notifications.length}}</span>
              </a>

              
              <!-- Dropdown - Alerts -->
              <div :style="showalert" class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 class="dropdown-header">
                  Pending Reservation Request
                </h6>
                <a class="dropdown-item d-flex align-items-center" v-for="(notif,index) in notifications" :key="index" href="javascript:void(0)" @click="viewNotif(notif)">
                  <div class="mr-3">
                    <div class="icon-circle bg-primary">
                      <i class="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div class="small text-gray-500">{{dDate(notif.createdAt)}}</div>
                    <span class="font-weight-bold">{{notif.message}}</span>
                  </div>
                </a>
               
                
                <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
              </div>
            </li>

     
  
            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{userinfo.fullname}}</span>
                <img class="img-profile rounded-circle" src="@/assets/default.png">
              </a>
              <!-- Dropdown - User Information -->
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="javascript:void(0)">
                  <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </a>
                <a class="dropdown-item" href="javascript:void(0)">
                  <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Settings
                </a>
                <a class="dropdown-item" href="javascript:void(0)">
                  <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                  Activity Log
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="javascript:void(0)" data-toggle="modal" data-target="#logoutModal">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>

          </ul>

        </nav>
        <!-- End of Topbar -->
</template>

<script>
import { formatBdayDate } from '@/helper/helper'
import { mapState } from 'vuex'
export default {
    name: 'topNavComponent',
    data: function(){
      return {
        showalert: {
          display: "none",
        }
      }
    },
    methods: {
      dDate: function(date){
        return formatBdayDate(date)
      },
      viewNotif: async function(notif){
        await this.$store.dispatch('notification/markasRead',notif.reservationId)
        if(notif.targetLink == "reservation") {
          this.$router.push({name: 'viewReservation',params: {idno: notif.reservationId} })
          this.showalert.display = "none"
          window.location.reload()
        }
      }
    },
    computed: {
        userinfo: function(){
            return JSON.parse(this.$store.state.userinfo)
        },
        ...mapState({
          notifications: state=> state.notification.notifications
        })
    },
    mounted(){
        this.$store.dispatch("notification/getPendingNotification",{admin: 1})
        this.$mysocket.on('updateNotification',()=>{
             this.$store.dispatch("notification/getPendingNotification",{admin: 1})
        })
    }

}
</script>