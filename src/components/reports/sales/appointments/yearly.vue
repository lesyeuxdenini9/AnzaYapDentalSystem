<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-calendar"></i> Yearly - Appointments</span>
                    <button type="button" @click="back()" class="noprint float-right"><span class="fa fa-times"></span></button>
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
                                            
                                            <div class="col-md-3">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon3">Start Year</span>
                                                    </div>
                                                    <input type="number" class="form-control" v-model="search.startyear">
                                            </div>
                                            </div>

                                            

                                            <div class="col-md-3">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon3">End Year</span>
                                                    </div>
                                                    <input type="number" class="form-control" v-model="search.endyear"/>
                                            </div>
                                            </div>

                                             <div class="col-md-3">
                                                    <button @click="searchProceed" class="form-control btn btn-primary"><span class="fa fa-search"></span> Generate</button>
                                            </div>

                                        </div>
                                        

                                </div>
                              </div>

                                <br/>
                                <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;"/>
                                <div style="text-align:center;color:dimgray;font-size:14pt;font-weight:bold;"><span>NO. OF APPOINTMENTS FROM {{search.startyear}} TO {{search.endyear}}</span></div>
                                 <column-chart :stacked="graphOptions.stacked" :legend="true" :download="true" :data="graphOptions.data"></column-chart>
                                        <div class="row">
                                        <div class="col-md-10 offset-md-1">
                                            <table class="table table-condensed table-striped table-bordered">
                                                <thead>
                                                    <tr style="background:#343A40;color:white;">
                                                        <th>Date</th>
                                                        <th>Approved</th>
                                                        <th>Cancelled</th>
                                                        <th>Reschedule</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>

                                              <tbody>
                                                    <tr v-for="(appointment,index) in appointments.data" :key="index">
                                                       <td>{{appointment.yearname}}</td>
                                                       <td>{{appointment.Approved}}</td>
                                                       <td>{{appointment.Cancelled}}</td>
                                                       <td>{{appointment.Reschedule}}</td>
                                                       <td>{{appointment.totalcount}}</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>Total</th>
                                                        <th>{{computeTotal[0]}}</th>
                                                        <th>{{computeTotal[1]}}</th>
                                                        <th>{{computeTotal[2]}}</th>
                                                        <th>{{computeTotal[3]}}</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                      
                                
                              </div>

                               <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;"/>
                                 <div style="text-align:center;color:dimgray;font-size:14pt;font-weight:bold;"><span>TOTAL NO. OF APPOINTMENTS FROM  {{search.startyear}} TO {{search.endyear}}</span></div>
                                      <div class="row">
                                  <div class="col-md-12">
                                      <pie-chart :download="true" width="100%" height="500px" :data="pieOptionsTotal.data"></pie-chart>
                                  </div>

                                   <div class="col-md-10 offset-md-1">
                                         
                                        </div>
                              </div>
                              <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;"/>


        </div>
  
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {

    data: function(){
        return {
                activebranchIndex: 0,
                search :{
                    startyear: "",
                    endyear: "",
                    branch: "",
                },
                 graphOptions: {
                    stacked: false,
                    colors: ['#b00', '#666'],
                    data: [],
                },
                pieOptionsTotal: {
                    data: [],
                },

        }
    },
    methods: {
        back: function(){
            this.$router.go(-1)
        },
        changeFilterbranch: function(branch,index){
                const navbranch = document.getElementsByClassName('navbranch')
                for(let x = 0 ; x < navbranch.length ; x++){
                    navbranch[x].classList.remove('active')
                }
                navbranch[index].classList.add('active')
                this.activebranchIndex = index
                this.search.branch = this.branches[this.activebranchIndex].id
                this.searchProceed()

         },

         searchProceed: function(){
              this.$store.dispatch("report/appointment_yearly",this.search)
                .then(()=>{
                    this.graphOptions.data = []
                    this.graphOptions.data.push({name: 'Approved', data: {}})
                    this.graphOptions.data.push({name: 'Cancelled', data: {}})
                    this.graphOptions.data.push({name: 'Reschedule', data: {}})

                    this.appointments.data.forEach((appointment)=>{
                        this.graphOptions.data[0].data[`${appointment.yearname}`] = appointment.Approved
                        this.graphOptions.data[1].data[`${appointment.yearname}`] = appointment.Cancelled
                        this.graphOptions.data[2].data[`${appointment.yearname}`] = appointment.Reschedule

                    })

                       this.pieOptionsTotal.data = []
                        this.pieOptionsTotal.data.push(["Approved",this.computeTotal[0]])
                        this.pieOptionsTotal.data.push(["Cancelled",this.computeTotal[1]])
                        this.pieOptionsTotal.data.push(["Reschedule",this.computeTotal[2]])
                })
                .catch(err=>console.log(err))
         }
    },
    computed: {
        ...mapState({
            branches: state=> state.branch.branches,
            appointments: state=> state.report.sales,
        }),
        computeTotal: {
            get: function(){
             let approved = 0 , cancelled = 0 , reschedule =0 ,  total = 0
             this.appointments.data.forEach((appointment)=>{
                 total = total + parseFloat(appointment.totalcount)
                 approved = approved + parseFloat(appointment.Approved)
                 cancelled = cancelled + parseFloat(appointment.Cancelled)
                 reschedule = reschedule + parseFloat(appointment.Reschedule)
             })
             return [approved,cancelled,reschedule,total]
            }
        }
    },
    mounted(){
        this.$store.dispatch("activenav","reportnav")
          this.$store.dispatch("branch/getList")
            .then(()=>{
                    const datenow = new Date()
                    this.search.startyear = this.search.endyear = datenow.getFullYear()
                    this.search.branch = this.branches[this.activebranchIndex].id
                    this.searchProceed()
                })
            .catch(err=>console.log(err))
    }

}
</script>