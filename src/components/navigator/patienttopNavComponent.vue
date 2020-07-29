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
              <a @click="openAlert()" class="nav-link dropdown-toggle" href="javascript:void(0)" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bell fa-fw"></i>
                <span class="badge badge-danger badge-counter" v-if="notifs.length > 0">{{notifs.length}}</span>
              </a>

              
              <!-- Dropdown - Alerts -->
              <div :style="showalert" class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 class="dropdown-header">
                 Request Alert
                </h6>

            <a class="dropdown-item d-flex align-items-center" v-for="(notif,index) in notifs" :key="index" href="javascript:void(0)" @click="viewNotif(notif)">
                  <div class="mr-3">

                    <div v-if="notif.targetLink == 'denied' || notif.targetLink == 'cancelled'" class="icon-circle bg-warning">
                      <i class="fas fa-exclamation-triangle text-white"></i>
                    </div>


                    <div v-else-if="notif.targetLink == 'approved'" class="icon-circle bg-success">
                      <i class="fas fa-check text-white"></i>
                    </div>

               

                  </div>
                  <div>
                    <div class="small text-gray-500">{{dDate(notif.createdAt)}}</div>
                    <span class="font-weight-bold">{{notif.message}}</span>
                  </div>
                </a>
                
                <a class="dropdown-item text-center small text-gray-500" href="javascript:void(0)">Show All Alerts</a>
              </div>
            </li>


                <!-- Nav Item - Messages -->
            <li class="nav-item dropdown no-arrow mx-1">
              <a @click="openMessage()" class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-envelope fa-fw"></i>
                <span class="badge badge-danger badge-counter" v-if="messages.length > 0">{{messages.length}}</span>
              </a>
              <!-- Dropdown - Messages -->
              <div :style="showmessage" class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                <h6 class="dropdown-header">
                  Message Center
                </h6>

                
            <a class="dropdown-item d-flex align-items-center" v-for="(message,index) in messages" :key="index" href="javascript:void(0)" @click="viewNotif(message)">
                  <div class="mr-3">

                    <div class="icon-circle bg-primary">
                      <i class="fas fa-info text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div class="small text-gray-500">{{dDate(message.createdAt)}}</div>
                    <span class="font-weight-bold">{{limitMask(message.message)}}</span>
                     <!-- <span class="font-weight-bold">{{message.message}}</span> -->
                  </div>
                </a>
              
                <!-- <a class="dropdown-item d-flex align-items-center" href="#">
                  <div class="dropdown-list-image mr-3">
                    <img class="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="">
                    <div class="status-indicator"></div>
                  </div>
                  <div>
                    <div class="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                    <div class="small text-gray-500">Jae Chun · 1d</div>
                  </div>
                </a>
                <a class="dropdown-item d-flex align-items-center" href="#">
                  <div class="dropdown-list-image mr-3">
                    <img class="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="">
                    <div class="status-indicator bg-warning"></div>
                  </div>
                  <div>
                    <div class="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                    <div class="small text-gray-500">Morgan Alvarez · 2d</div>
                  </div>
                </a>
                <a class="dropdown-item d-flex align-items-center" href="#">
                  <div class="dropdown-list-image mr-3">
                    <img class="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="">
                    <div class="status-indicator bg-success"></div>
                  </div>
                  <div>
                    <div class="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                    <div class="small text-gray-500">Chicken the Dog · 2w</div>
                  </div>
                </a> -->
                <a class="dropdown-item text-center small text-gray-500" href="javascript:void(0)">Read More Messages</a>
              </div>
            </li>

     
  
            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{userinfo.fullname}}</span>
                <img v-if="userinfo.img == null || userinfo.img == ''" class="img-profile rounded-circle" src="@/assets/default.png"/>
                <img v-else :src="`${imgUrl}/${userinfo.img}`" class="img-profile rounded-circle"/>
              </a>
        
            </li>

          </ul>

          <notifMessageModal :notifdata="notifdata" v-if="shownotifmessage" @closemodal="closemodal"/>

        </nav>
        <!-- End of Topbar -->
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatBdayDate, limitText } from '@/helper/helper'
import notifMessageModal from "@/components/navigator/notifMessageModal"
export default {
    name: 'topNavComponent',
    data: function(){
      return {
        showalert: {
          display: "none",
        },
        showmessage: {
          display: "none",
        },
        shownotifmessage: false,
        notifdata: {},
        imgUrl: this.$store.state.imgUrl
      }
    },
    methods: {
      openAlert: function(){
        if(this.showalert.display == 'none'){
          this.showalert.display = 'block'
          this.showmessage.display = 'none'
        }else{
          this.showalert.display = 'none'
        }
      },
      openMessage: function(){
        if(this.showmessage.display == 'none'){
          this.showmessage.display = 'block'
          this.showalert.display = 'none'
        }else{
          this.showmessage.display = 'none'
        }
      },
      closemodal: function(){
        this.shownotifmessage = false
      },
      limitMask: function(text){
        return limitText(text)
      },
      dDate: function(date){
        return formatBdayDate(date)
      },
      viewNotif: function(notif){
          if(notif.targetLink == "approved" || notif.targetLink == "denied" || notif.targetLink == 'cancelled' || notif.targetLink == 'resched') {
            this.$router.push({name: 'patientViewReservation',params: {idno: notif.reservationId} })
            this.showalert.display = "none"
            window.location.reload()
          }else{
            this.notifdata = notif
            this.shownotifmessage = true
          }

      }
    },
    computed: {
        userinfo: function(){
            return JSON.parse(this.$store.state.userinfo)
        },
        ...mapState({
          notifications: state=> state.notification.notifications
        }),
        ...mapGetters('notification',[
          'notifs',
          'messages'
        ]),
    },
    mounted(){
      this.$store.dispatch("notification/getPendingNotification",{admin: 0})
      this.$mysocket.emit("listenPrivate",`patient_${this.userinfo.id}`)
      this.$mysocket.on('updatePatientNotification',()=>{
          this.$store.dispatch("notification/getPendingNotification",{admin: 0})
      })
    },
    components: {
      notifMessageModal
    }

}
</script>