<template>
  <div id="app">
        <resetPasswordModal v-if="showSetPassModal" />
          <div v-if="islogin">
                 <!-- Page Wrapper -->

                       <!-- ADMIN SIDE -->
            <div id="wrapper" v-if="isadmin || isstaff || issuperadmin" >   
                    <sideNav class="noprint"/>
                      <!-- Content Wrapper -->
                    <div style="background:#FFFFFF !important;" id="content-wrapper" class="d-flex flex-column">
                              <!-- Main Content -->
                          <div id="content">
                          <topNav class="noprint"/>
                          <div id="mainBody">
                            <router-view v-if="islogin"/>
                          </div>

                              </div>
                    </div>
            </div>

                      <!-- STAFF SIDE -->
            <!-- <div id="wrapper" v-else-if="isstaff">   
                    <sideNav class="noprint"/>
                  
                    <div id="content-wrapper" class="d-flex flex-column">
                
                          <div id="content">
                          <topNav class="noprint"/>
                          <div id="mainBody">
                            <router-view v-if="islogin"/>
                          </div>

                              </div>
                    </div>
            </div> -->


                    <!-- PATIENT SIDE -->
            <div id="wrapper" v-else>
                    <patientsideNav class="noprint"/>
                      <!-- Content Wrapper -->
                    <div style="background:#FFFFFF !important;" id="content-wrapper" class="d-flex flex-column">
                              <!-- Main Content -->
                          <div id="content">
                          <patienttopNav class="noprint"/>
                          <div id="mainBody">
                            <router-view v-if="islogin"/>
                          </div>

                              </div>
                    </div>
            </div>

            </div>
          
          <div id="login" v-if="!islogin">
            <login/>
          </div>  

      </div>

</template>

<script>
import sideNav from '@/components/navigator/sidenavComponent'
import patientsideNav from "@/components/navigator/patientsidenavComponent"
import patienttopNav from "@/components/navigator/patienttopNavComponent"
import topNav from "@/components/navigator/topnavComponent"
import login from '@/components/LoginComponent'
import resetPasswordModal from "@/components/setting/resetPassComponent"
import { mapState } from 'vuex'
export default {
  name: 'App',
  data: function(){
    return {
      // islogin: this.$store.state.islogin || false,
      isadmin: localStorage.getItem("isadmin") || false,
      isstaff: localStorage.getItem("isstaff") || false,
      issuperadmin: localStorage.getItem("issuperadmin") || false,
      showSetPassModal: false,
    }
  },
  watch: {
    islogin: function(){
        let userinfo = JSON.parse(localStorage.getItem("userinfo")) || null
        if(userinfo != null) {
            switch(userinfo.usertype){
              case 0:
                this.isadmin = true
                this.$router.push('/backend')
                break
              case 1:
                this.isstaff = true
                this.$router.push('/backend')
                break
              case 2:
                this.isadmin = false
                this.isstaff = false
                this.issuperadmin = false
                this.$router.push('/patient')
                break
              case 3:
                this.issuperadmin = true
                this.$router.push('/backend')
                break
              default:
                break
            }
        }
    }
  },
  mounted(){
   let app = this
   let path = this.$router.app._route.path 
   let checkreg = new RegExp(`/setpassword/\\.*`)
   let res = checkreg.test(path)
  

    if(!res){
         if(!app.islogin){
          app.$router.replace("/")
        }else{
          if(this.isadmin || this.isstaff){
            if(this.$router.app._route.path == "/") app.$router.replace("/backend")
          }else{
            if(this.$router.app._route.path == "/") app.$router.replace("/patient")
          }
          
        }
      this.showSetPassModal = false
    }else{
      this.showSetPassModal = true
    }
   window.addEventListener('storage', function(event){
          // if localstorage value changed it will trigger this event in all tab open
          
          if (event.key == 'islogin') { 
            // localStorage.removeItem('isadmin')
            // localStorage.removeItem('isstaff')
            window.location.href= "/"
          }
      })
  },
  computed: {
    ...mapState([
        'islogin'
    ])
  },
  methods:{

   
  },
  components: {
   sideNav,
   login,
   topNav,
   patientsideNav,
   patienttopNav,
   resetPasswordModal
  }
}
</script>

<style>

@media print {
  
    .noprint {
        display: none;
    }
}
</style>
