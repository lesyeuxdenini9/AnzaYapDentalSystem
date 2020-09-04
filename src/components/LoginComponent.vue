<template>


      <div style="text-align:center;" v-if="successlogin">
        <img src="../assets/loader.gif" style="width: 100px;height:100px;margin-bottom: 20px;"/><br/>
        <span style="font-size: 12pt;font-weight:bold">Loading ... Please Wait !</span>
        </div>


  <div v-else id="maindisplay">
     
    <div id="header" style="padding:0;margin:0;">


      <div class="row" style="height: 100%;">
        <div class="col-md-3">
          <img src="@/assets/logo.jpg" style="position:absolute;top:-50px;left:0;height:100%;width:100%;"/>
        </div>
        <div class="col-md-9" style="background:white">
          <div class="float-right">
             <button class="btnindex btn btn-default" @click="showloginModal=true"><span class="fa fa-lock"></span> Login</button>
            <button class="btnindex btn btn-default" @click="showregisterModal=true"><span class="fa fa-user-circle"></span> Signup</button>
          </div>

        </div>

      </div>
      
          

    </div>


     
    

    <div id="othercontent">

      
          <div id="slider">
              <carousel 
                  :per-page="1"
                  :mouse-drag="true"
                  :centerMode="true" 
                  :autoplay="true" 
                  :adjustableHeight="true"
                  :paginationEnabled="false"
                  :loop="true"
                  :speed="500"
                  :autoplayTimeout="10000"
                >
                <slide>
                    <div id="firstslide" class="slideitem">
                      <div>
                        <div>
                          <div style="position:relative;">
                          <!-- <img src="@/assets/logo.jpg" style="height:100px;width:120px;"/> -->
                              <span style="color:#F6C23E;position:absolute;bottom:10px;">ANZA-<span style="color:#355CCC">YAP</span>
                              <small style="font-size: 20pt;color:white;"> DENTAL CLINIC</small></span>
                            </div>
                        <span>Giving The Best Solutions...</span><br/>
                          <small style='font-size: 12pt'> 
                           For compliance of DOH requirement for dental clinic<br/><hr style="background:white;"/>
                          *Hyphochlorus Machine *UV Light *Hepa Filter *HI VAC *Temperature Scanner *PPE *Autoclave Sterilizer
                          </small>
                        </div>
                      </div>
                    </div>
                </slide>
                <slide>
                   <div id="secondslide" class="slideitem" >
                     <div>
                        <div>
                        <span>Making Our Customers Satisfied... <span style="color:#87CEEB;" class="fa fa-thumbs-up"></span></span><br/>
                          <small style='font-size: 12pt'> 
                           For compliance of DOH requirement for dental clinic<br/><hr style="background:white;"/>
                          *Hyphochlorus Machine *UV Light *Hepa Filter *HI VAC *Temperature Scanner *PPE *Autoclave Sterilizer
                          </small>
                        </div>
                     </div>
                    </div>
                </slide>
                     <slide>
                   <div id="thirdslide" class="slideitem" >
                      <div>
                        <div>
                      <span>Always Delivering Best Of Our Services... <span style="color:#F6C23E;" class="fa fa-smile"></span></span><br/>
                              <small style='font-size: 12pt'> 
                           For compliance of DOH requirement for dental clinic<br/><hr style="background:white;"/>
                          *Hyphochlorus Machine *UV Light *Hepa Filter *HI VAC *Temperature Scanner *PPE *Autoclave Sterilizer
                          </small>
                        </div>
                      </div>
                    </div>
                </slide>
              </carousel>
          </div>

          <!-- <div style="width:100%;background:#87CEEB;height:15px;margin: 5px 0px;"></div> -->

          
     <div id="contactHome">
          <ul>
            <li><a href="https://www.facebook.com/Anza-Yap-Dental-Clinic-112558770549555/" target="_blank"><img src="@/assets/fb.png"></a></li>
            <li><a href="javascript:void(0)" target="_blank"><img src="@/assets/insta.png"></a></li>
            <li><a href="javascript:void(0)" target="_blank"><img src="@/assets/twitter.png"></a></li>
          </ul>
      </div>


          <div class="othercontent">
            <!-- <span class="contenticon fa fa-info-circle" aria-hidden="true" style=""/><br/> -->
              <span class="contenttitle">About Us</span><br/>
              <!-- <img src="@/assets/logo.jpg" style="width: 60%;height:120px;border-radius: 20px;"/> -->
              <p class="text-center"> DR. LUNINGNING ANZA-YAP owns and manage the ANZA-YAP DENTAL CLINIC   DR. L. ANZA-YAP earned her degree of Doctor of Dental Medicine from the Manila Central University in 08 March 1986 and passed the Professional Regulation Commission’s Licensure Examination in 16 June 1987 (PRC ID No. 23169). At the onset of her professional practice, Dr. L. ANZA-YAP has been and continues to be an active member of the Philippine Dental Association (PDA) since 1987. Her specialization in Orthodontics lead to a sustaining membership with the International Association for Orthodontics, East Asia Regional Section, since 1990, and with its Honor Society as of 06 May 1993 as a Board-Candidate.
                Her first clinic opened in 1988 within the Km. 13 East Service Road, thereby maximizing her practice with its general clientele. With growing awareness on the benefits of orthodental treatment, braces in particular, the second one was established at the FTI Sunshine Mall to cater for upscale market, as well as to serve the corporate accounts in the FTI Complex and the neighboring Veteran’s Center in 1996. To provide dental services for the growing population in the heart of Paranaque. the third clinic opened at SM City Bicutan in March 2003 and started rendering dental health services until March 2008.
              </p>
          </div>


           <div class="othercontent">
            <!-- <span class="contenticon fa fa-wrench" aria-hidden="true" style=""/><br/> -->
              <span class="contenttitle">Our Specialties</span>
              <p class="text-center" style="font-size: 14pt;margin-top:20px;">To meet the specific services required for by the various procedures and treatments, the ANZA-YAP DENTAL CLINIC are equipped with the best dental facilities and equipment. Dental-chairs and accessories are of premium quality sourced mainly from Japan, Germany and the United States. Likewise, the clinic can accommodate the different market segments at very competitive prices due to its linkage with many dental laboratories and suppliers for a particular prosthetics within an affordable budget range. </p>

              <div class="row">
                  <div class="col-md-2 servicelist" @mouseover="setAnimation(0)">
                      <img src="@/assets/profile/service/esthetic.jpg">
                      <p>Esthetic Dentistry </p>
                      <span>Services such as restoration of badly broken down teeth, whitening of stained dentition and replacement of missing and lost teeth will ensure you a winning smile.</span>
                  </div>


                     <div class="col-md-2 servicelist" @mouseover="setAnimation(1)">
                        <img src="@/assets/profile/service/preventive.jpg">
                      <p>Preventive  Dentistry </p>
                      <span>ANZA-YAP Dental Clinic offers pediatric services such as fluoride applications, placement of pit and fissure sealants and stainless steel crowns among others.</span>

                  </div>

                      <div class="col-md-2 servicelist" @mouseover="setAnimation(2)">
                        <img src="@/assets/profile/service/Periodontics.jpg">
                      <p>Periodontics & Endodontics</p>
                       <span>ANZA-YAP Dental Clinic offers advanced approaches to treatment of gum diseases and pulp diseases.</span>

                  </div>

                      <div class="col-md-2 servicelist" @mouseover="setAnimation(3)">
                        <img src="@/assets/profile/service/oral.jpg">
                      <p>Oral Surgery </p>
                       <span>provides safe surgical procedures from simple to complicated cases such as gingivectomy (removal of excess gums), odontectomy (removal of impacted teeth) among others. </span>

                  </div>

                      <div class="col-md-2 servicelist" @mouseover="setAnimation(4)">
                        <img src="@/assets/profile/service/Orthodontics.jpg">
                      <p>Orthodontics</p>
                       <span>Clinic offers preventive, interceptive and corrective treatment to malocclusion that will improve esthetic and functional needs and that will address TMJ problems.</span>

                  </div>

                  
                     <div class="col-md-2 servicelist" @mouseover="setAnimation(5)">
                        <img src="@/assets/profile/service/xray.jpg">
                      <p>Dental Roentology </p>
                       <span>ANZA-YAP Dental Clinic provides peri-apical x-ray.</span>
                  </div>
              </div>
          </div>

            <!-- <div class="othercontent">
            <span class="contenticon fa fa-users" aria-hidden="true" style=""/><br/>
              <span class="contenttitle">Our Team</span>
              <p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
 -->


           <div class="othercontent">
            <!-- <span class="contenticon fa fa-handshake" aria-hidden="true" style=""/><br/> -->
             <!-- <span class="contenticon fa fa-user-edit" aria-hidden="true" style=""/><br/> -->
              <span class="contenttitle">Appointment Process</span>
              <p class="text-center">Save time with online reservation and get notified for the next visit.</p>

            <div class="row">
                <div class="col-md-12" style="position:relative;">
                    <span class="appointnum">1</span>
                    <img class="appointsvg" src="@/assets/appointment/login.svg"/>
                    <p class="appointdes">Login to our portal. <br/>
                    You can register by clicking signup.</p>
                </div>
     
                <div class="col-md-12" style="position:relative;">
                    <span class="appointnum">2</span>
                        <img class="appointsvg"  src="@/assets/appointment/setdate.svg"/>
                        <p class="appointdes">Choose available dates from calendar.<br/>
                        Check schedules on different branch.</p>
                </div>

                <div class="col-md-12" style="position:relative;">
                    <span class="appointnum">3</span>
                        <img class="appointsvg"  src="@/assets/appointment/waitConfirm.svg"/>
                        <p class="appointdes">Wait for confirmation of your reservation.</p>
                </div>


                <div class="col-md-12" style="position:relative;">
                    <span class="appointnum">4</span>
                        <img class="appointsvg"  src="@/assets/appointment/proceedtoappointment.svg"/>
                        <p class="appointdes">Proceed in your scheduled appointment.</p>
                </div>


                
                

            </div>


          </div>

      
                  <div class="othercontent">
            <!-- <span class="contenticon fa fa-map-marker-alt" aria-hidden="true" style=""/><br/> -->
              <span class="contenttitle">Branches</span>
              <p class="text-center">Due to the continuing clamor for the quality dental health services at affordable prices at the nearest <br/> location of ANZA-YAP DENTAL CLINIC, Dr. ANZA-YAP would like to implement further expansion in other strategic location. <br/>To this, DR. ANZA-YAP would continue to manage and be the lead-person in providing outstanding dental health services.</p>
            <div class="branches">
                  <div class="branchdiv" v-for="(branch,index) in branches" :key="index">
                      <div  v-if="(index+1) & 1" class="row">
                          <div class="col-md-4">
                                <span class="fa fa-map-marker-alt" style="font-size: 50pt;color:#6C63FF;"></span><br/>
                                <span style="font-size: 20pt;font-weight:bold;color:dimgray;">{{branch.branch}}</span><br/>
                                <span>{{branch.address}}</span><br/>
                                <small>Email Address: {{branch.email}} Contact No: {{branch.contact}}</small>
                          </div>
                          <div class="col-md-4">
                              <table class="table table-condensed table-striped">
                                  <thead>
                                    <tr>
                                       <th colspan="2" style="background:#6C63FF;color:white;">Dentist(s)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="(dentist,index2) in branch.Dentists" :key="index2">
                                        <td style="width: 10%;">{{index2+1}}</td>
                                        <td>{{dentist.fullname}}</td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>

                              <div class="col-md-4">
                                 <span style="font-size: 20pt;color:dimgray;"><span class="fa fa-clock"></span> Schedules</span>
                                     <hr/>
                                 <div class="row">
                                   <div class="col-md-6" style="text-align:left !important;">
                                     <span><span style="font-weight: bold">Mon:</span> 
                                     <span v-if="branch.Schedules[1].active==1"> {{dhour(branch.Schedules[1].start)}} - {{dhour(branch.Schedules[1].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>

                                      <span><span style="font-weight: bold">Tue:</span> 
                                     <span v-if="branch.Schedules[2].active==1"> {{dhour(branch.Schedules[2].start)}} - {{dhour(branch.Schedules[2].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>

                                      <span><span style="font-weight: bold">Wed:</span> 
                                     <span v-if="branch.Schedules[3].active==1"> {{dhour(branch.Schedules[3].start)}} - {{dhour(branch.Schedules[3].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>

                                      <span><span style="font-weight: bold">Thu:</span> 
                                     <span v-if="branch.Schedules[4].active==1"> {{dhour(branch.Schedules[4].start)}} - {{dhour(branch.Schedules[4].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>
                                   
                                   </div>
                                 <div class="col-md-6" style="text-align:left !important;">   
                                       <span><span style="font-weight: bold">Fri:</span> 
                                     <span v-if="branch.Schedules[5].active==1"> {{dhour(branch.Schedules[5].start)}} - {{dhour(branch.Schedules[5].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>

                                      <span><span style="font-weight: bold">Sat:</span> 
                                     <span v-if="branch.Schedules[6].active==1"> {{dhour(branch.Schedules[6].start)}} - {{dhour(branch.Schedules[6].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>

                                      <span><span style="font-weight: bold">Sun:</span> 
                                     <span v-if="branch.Schedules[0].active==1"> {{dhour(branch.Schedules[0].start)}} - {{dhour(branch.Schedules[0].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>
                                   </div>
                       
                     
                                 </div>
                          </div>


                      </div>

                       <div v-else class="row">
                              <div class="col-md-4">
                                 <span style="font-size: 20pt;color:dimgray;"><span class="fa fa-clock"></span> Schedules</span>
                                     <hr/>
                                 <div class="row">
                                   <div class="col-md-6" style="text-align:left !important;">
                                     <span><span style="font-weight: bold">Mon:</span> 
                                     <span v-if="branch.Schedules[1].active==1"> {{dhour(branch.Schedules[1].start)}} - {{dhour(branch.Schedules[1].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>

                                      <span><span style="font-weight: bold">Tue:</span> 
                                     <span v-if="branch.Schedules[2].active==1"> {{dhour(branch.Schedules[2].start)}} - {{dhour(branch.Schedules[2].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>

                                      <span><span style="font-weight: bold">Wed:</span> 
                                     <span v-if="branch.Schedules[3].active==1"> {{dhour(branch.Schedules[3].start)}} - {{dhour(branch.Schedules[3].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>

                                      <span><span style="font-weight: bold">Thu:</span> 
                                     <span v-if="branch.Schedules[4].active==1"> {{dhour(branch.Schedules[4].start)}} - {{dhour(branch.Schedules[4].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>
                                   
                                   </div>
                                 <div class="col-md-6" style="text-align:left !important;">   
                                       <span><span style="font-weight: bold">Fri:</span> 
                                     <span v-if="branch.Schedules[5].active==1"> {{dhour(branch.Schedules[5].start)}} - {{dhour(branch.Schedules[5].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>

                                      <span><span style="font-weight: bold">Sat:</span> 
                                     <span v-if="branch.Schedules[6].active==1"> {{dhour(branch.Schedules[6].start)}} - {{dhour(branch.Schedules[6].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>

                                      <span><span style="font-weight: bold">Sun:</span> 
                                     <span v-if="branch.Schedules[0].active==1"> {{dhour(branch.Schedules[0].start)}} - {{dhour(branch.Schedules[0].end)}}</span>
                                     <span v-else> Close</span>
                                     </span><br/>
                                   </div>
                       
                     
                                 </div>
                          </div>


                               <div class="col-md-4">
                              <table class="table table-condensed table-striped">
                                  <thead>
                                    <tr>
                                      <th colspan="2" style="background:#6C63FF;color:white;">Dentist(s)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="(dentist,index3) in branch.Dentists" :key="index3">
                                        <td style="width: 10%;">{{index3+1}}</td>
                                        <td>{{dentist.fullname}}</td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>

                          <div class="col-md-4">
                              <span class="fa fa-map-marker-alt" style="font-size: 50pt;color:#6C63FF;"></span><br/>
                               <span style="font-size: 20pt;font-weight:bold;color:dimgray;">{{branch.branch}}</span><br/>
                                <span>{{branch.address}}</span><br/>
                                <small>Email Address: {{branch.email}} Contact No: {{branch.contact}}</small>
                          </div>

                      </div>



                  </div>
                  <div class="branchdiv">

                  </div>
              </div>
              <!-- {{branches}} -->
          </div>


    </div>

    <loginModal v-if="showloginModal" @closemodal="closemodal" @logincomplete="logincomplete"/>
    <registerModal v-if="showregisterModal" @closemodal="closemodal" @logincomplete="logincomplete"/>
     <footer class="noprint">
          <span>Created By: TUP-Taguig &#169; <span ref="yearnow"></span></span>
          <!-- <br/> -->
    </footer>

  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import loginModal from "@/components/loginModal"
import registerModal from "@/components/registerComponent"
import { mapState } from 'vuex';
export default {
    name: 'login',
    data: function(){
        return {
            user: {
                email: "",
                password: "", 
            },
            successlogin: false,
            errormsg: [],
            showlogin: false,
            showloginModal: false,
            showregisterModal: false,
        }
    },
    methods: {
      setAnimation: function(index){
          const element = document.getElementsByClassName('servicelist')[index];
          element.classList.add('animate__animated', 'animate__flip');

          element.addEventListener('animationend', () => {
            // do something
            element.classList.remove('animate__animated', 'animate__fadeIn');
          });
      },
      dhour: function(date){
        return this.$helper.formatraw12Hour(date)
      },
      closemodal: function(){
        this.showloginModal = false
        this.showregisterModal = false
      },
      logincomplete: function(res){
           this.showloadingScreen(res)
                    .then((res)=>{
                        this.$store.dispatch('authenticated',res)
                        window.location.href="/"
                    })
        },
        showloadingScreen: function(res){
            return new Promise((resolve,reject)=>{
                try {
                   this.successlogin = true
                    setTimeout(()=>{
                        resolve(res)
                    },1000)
                }catch(err){
                    reject(err)
                }
              
            })
        },
    },
    computed: {
      ...mapState({
        branches: state=> state.branch.branches
      })
    },
    mounted(){
        // const body = document.querySelector("body")
        // body.classList.add("bg-gradient-primary")
        this.$store.dispatch("branch/getPublicList")

    },
    components: {
         Carousel,
         Slide,
         loginModal,
         registerModal
    }

}

</script>

<style scoped>

    .servicelist {
      text-align: center;
    }
    .servicelist > img {
      min-height:200px;
      max-width:200px;
      border-radius: 50%;
      margin-bottom: 20px;
    }

    .servicelist > p {
      font-size: 18pt;
      font-weight: bold;
      margin-bottom: 20px;
      color:dimgray;
    }

    .servicelist > span {
      font-size: 14pt;
       color:dimgray;
    }

    #logindiv {
        padding: 30px 10px 50px 10px;
        box-sizing: border-box;
        box-shadow: 1px 2px 1px black;
    }

    img {
        margin-top: 50px;
    }

    #systemTitle {
        font-size: 20pt;
    }

    #header{
        width: 100%;
        height: 80px;
        background: white;
        position: fixed;
        box-shadow: 2px 2px 2px dimgray;
        padding: 15px 10px; 
        z-index: 9;
    }

    .btnindex {
        border: 2px solid #6C63FF;
        color: #6C63FF;
        margin: 5px;
        border-radius: 15px;
    }

    #maindisplay {
      margin:0;
      padding:0;
      height:100%;
      width:100%;
    }

    #othercontent {
        height: 100%;
        width: 100%;
        display: block;
    }

    .othercontent > p {
      font-size: 14pt;
      margin-top:20px;
      color:dimgray;
      line-height: 2;
    }


    footer {
  /* position: absolute; */
  bottom: 0;
  width: 100%;
  height: 5rem;      
  background: #282262;
  text-align: center;
  padding-top: 5px;
}

footer span {
  font-size: 1rem;
  color:white;
}


    div#othercontent > div#slider {
      padding-top: 80px;
      height: 40em;
      width: 100%;
      /* background-image: url("../assets/bg.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center; */
    }

    div.slideitem {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      height:33em;
      position:relative;
      width:100%;
    }

    div.slideitem > div {
      position:absolute;
      height:100%;
      width:100%;
      background: rgba(0,0,0,0.5)
    }

    div.slideitem > div >  div {
      position:absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      font-size:3.5em;
      color:white;
      font-family: tahoma;
      font-weight: bold;
    }
    div.slideitem > div >  div > small {
      font-weight: normal;
      font-size: 16pt;
      width: 100%;
      position: absolute;
      margin-top: 20px;
    }

    div#firstslide {
      background-image: url("../assets/bg4.png"); 
    }

    div#secondslide {
      background-image: url("../assets/bg5.png");
    }

    div#thirdslide {
      background-image: url("../assets/bg6.png");
    }

    .othercontent {
      padding: 20px 100px;
      text-align: center;
    }

    span.contenttitle {
      font-weight: bold;
      font-size: 36pt;
      opacity: 0.8;
      border-bottom: 4px solid skyblue;
    }

    .contenticon {
      color:skyblue;font-size:20pt;
    }

    div#contactHome {
        width: 80px;
        padding: 40px 0px;
        background: rgba(0,0,0,0.3);
        position: fixed;
        right: 0;
        text-align: center;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        transition: 0.5s width;
        transform: translateY(-80%);
        z-index: 9999 !important;
      }

      div#contactHome ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      div#contactHome ul li {
        display: inline-block;
      }

      div#contactHome ul li a {
        text-decoration: none;
      }

      div#contactHome ul li a img {
        height: 50px;
        width: 50px;
            /* padding: 0 !important; */
        margin-top: 10px !important;
      }

      .appointsvg {
        height: 250px;
        width: 100%;
        padding:0;
        margin:0;
      }

      .appointdes {
        font-size: 15pt;
        color: dimgray;
      }

      span.appointnum {
        position:absolute;
        top:40%;
        left:30%;
        transform: translate(-50%,-50%);
        padding: 15px;
        background:dimgray;
        color:white;
        border-radius:50%;
        font-size:18pt;
        font-weight:bold;
      }

      .branches {
				padding: 0;
				margin: 0;
			}

			.branches div.branchdiv {
				/* height: 200px; */
				width: 100%;
				border-top: 5px solid dimgray;
				padding: 20px;
				box-sizing: border-box;
			}

			.branches div.branchdiv:nth-child(odd){
				/*background: orange;*/
				border-right: 5px solid dimgray;
			}

			.branches div.branchdiv:nth-child(even){
			/*	background: blue;*/

				border-left: 5px solid dimgray;
			}



</style>
