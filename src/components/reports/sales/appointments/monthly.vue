<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-calendar"></i> Monthly - Appointments</span>
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
                                            <div class="col-md-2">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon3">Start Month</span>
                                                    </div>
                                                    <select class="form-control" v-model="search.startmonth">
                                                        <option v-for="(month,index) in months" :key="index" :value="month.index">{{month.des}}</option>
                                                    </select>
                                            </div>
                                            </div>

                                            <div class="col-md-2">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon3">Start Year</span>
                                                    </div>
                                                    <input type="number" class="form-control" v-model="search.startyear">
                                            </div>
                                            </div>

                                             <div class="col-md-2">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon3">End Month</span>
                                                    </div>
                                                    <select class="form-control" v-model="search.endmonth">
                                                      <option v-for="(month,index) in months" :key="index" :value="month.index">{{month.des}}</option>
                                                    </select>
                                            </div>
                                            </div>

                                            <div class="col-md-2">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon3">End Year</span>
                                                    </div>
                                                    <input type="number" class="form-control" v-model="search.endyear"/>
                                            </div>
                                            </div>

                                             <div class="col-md-2">
                                                    <button @click="searchProceed" class="form-control btn btn-primary"><span class="fa fa-search"></span> Generate</button>
                                            </div>

                                        </div>
                                        

                                </div>
                              </div>

                                 <br/>
                                    <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;position:relative">
                                     <button @click="printcolumn()" class="btn btn-danger" style="position:absolute;right:0;bottom:-40px;"><span class="fa fa-file-pdf"></span> PDF</button>
                                 </div>
                                   <div style="text-align:center;color:dimgray;font-size:14pt;font-weight:bold;"><span>NO. OF APPOINTMENTS FROM {{months[search.startmonth-1].des}} {{search.startyear}} TO {{months[search.endmonth-1].des}} {{search.endyear}}</span></div>
                                      <column-chart :library="columnlibrary" :stacked="graphOptions.stacked" :legend="true" :download="true" :data="graphOptions.data"></column-chart>
                           
                           
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
                                                        <td>{{`${months[appointment.monthname-1].des} ${appointment.yearname}`}}</td>
                                                       <td>{{$helper.roundToDecimal(appointment.Approved,2)}}</td>
                                                       <td>{{$helper.roundToDecimal(appointment.Cancelled,2)}}</td>
                                                       <td>{{$helper.roundToDecimal(appointment.Reschedule,2)}}</td>
                                                       <td>{{$helper.roundToDecimal(appointment.totalcount,2)}}</td>
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
                                 <div style="text-align:center;color:dimgray;font-size:14pt;font-weight:bold;"><span>TOTAL NO. OF APPOINTMENTS FROM {{months[search.startmonth-1].des}} {{search.startyear}} TO {{months[search.endmonth-1].des}} {{search.endyear}}</span></div>
                                    <div class="row">
                                  <div class="col-md-12">
                                      <pie-chart :library="pielibrary" :download="true" width="100%" height="500px" :data="pieOptionsTotal.data"></pie-chart>
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
                    startmonth:1,
                    startyear: "",
                    endmonth: "",
                    endyear: "",
                    branch: "",
                },
                months: [
                    {index: 1 , des: "JAN"},
                    {index: 2 , des: "FEB"},
                    {index: 3 , des: "MAR"},
                    {index: 4 , des: "APR"},
                    {index: 5 , des: "MAY"},
                    {index: 6 , des: "JUN"},
                    {index: 7 , des: "JUL"},
                    {index: 8 , des: "AUG"},
                    {index: 9 , des: "SEP"},
                    {index: 10 , des: "OCT"},
                    {index: 11 , des: "NOV"},
                    {index: 12 , des: "DEC"},
                ],
                 graphOptions: {
                    stacked: false,
                    colors: ['#b00', '#666'],
                    data: [],
                },
                pieOptionsTotal: {
                    data: [],
                },
                columnlibrary: {
                    animation: {
                        onComplete: this.doneChart
                    }
                },
                pielibrary: {
                    animation: {
                        onComplete: this.donePie
                    }
                },
                columnimg: null,
                pieimg: null,
        }
    },
    methods: {
        doneChart: function(){
            let charts = document.getElementsByClassName('chartjs-render-monitor')
            this.columnimg = charts[0].toDataURL()
        },
        donePie: function(){
            let charts = document.getElementsByClassName('chartjs-render-monitor')
            this.pieimg = charts[1].toDataURL()
        },
               printcolumn: function(){

            let data = this.appointments.data.map((appointment)=>{
                return [`${this.months[appointment.monthname-1].des} ${appointment.yearname}`,
                    this.$helper.roundToDecimal(appointment.Approved,2),
                    this.$helper.roundToDecimal(appointment.Cancelled,2),
                    this.$helper.roundToDecimal(appointment.Reschedule,2),
                    this.$helper.roundToDecimal(appointment.totalcount,2)
                    ]
            })

            data.unshift(['DATE','APPROVED','CANCELLED','RESCHEDULE','TOTAL'])

            data.push(['Total',this.computeTotal[0],this.computeTotal[1],this.computeTotal[2],this.computeTotal[3]])
             var docDefinition = {  
                 
                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'landscape',
               content: [
                 {
                   text: `${this.branches[this.activebranchIndex].branch} No. Of Appointments From ${this.months[this.search.startmonth-1].des} ${this.search.startyear} To ${this.months[this.search.endmonth-1].des} ${this.search.endyear}`, alignment: 'center', margin: [0,0,0,20]
                 },
                 {
                     image: this.columnimg,
                     height:300,
                     width:750,
                 },
                {
                 table: {
                   widths: ['*','*','*','*','*'],
                   body: data,
                   pageBreak: 'after'
                 }
               },
           
               {
                   image: this.pieimg,
                   height:400,
                   width: 1500,
                   alignment: 'center',
                   margin: [0,0,0,20]
               },
                 {
                   text: `${this.branches[this.activebranchIndex].branch} Total No. Of Appointments From ${this.months[this.search.startmonth-1].des} ${this.search.startyear} To ${this.months[this.search.endmonth-1].des} ${this.search.endyear}`, alignment: 'center', margin: [0,0,0,20]
                 },
              ]
              
            }
            this.$pdfMake.createPdf(docDefinition).open();
        },
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
              this.$store.dispatch("report/appointment_monthly",this.search)
                .then(()=>{

                this.graphOptions.data = []
                this.graphOptions.data.push({name: 'Approved', data: {}})
                this.graphOptions.data.push({name: 'Cancelled', data: {}})
                this.graphOptions.data.push({name: 'Reschedule', data: {}})

                this.appointments.data.forEach((appointment)=>{
                    this.graphOptions.data[0].data[`${this.months[appointment.monthname-1].des} ${appointment.yearname}`] = appointment.Approved
                    this.graphOptions.data[1].data[`${this.months[appointment.monthname-1].des} ${appointment.yearname}`] = appointment.Cancelled
                    this.graphOptions.data[2].data[`${this.months[appointment.monthname-1].des} ${appointment.yearname}`] = appointment.Reschedule

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
              return [
                 this.$helper.roundToDecimal(approved,2),
                 this.$helper.roundToDecimal(cancelled,2),
                 this.$helper.roundToDecimal(reschedule,2),
                 this.$helper.roundToDecimal(total,2)
                 ]
            }
        }
    },
    mounted(){
        this.$store.dispatch("activenav","reportnav")
          this.$store.dispatch("branch/getList")
            .then(()=>{
                    const datenow = new Date()
                    this.search.startyear = this.search.endyear = datenow.getFullYear()
                    this.search.endmonth = datenow.getMonth()+1
                    this.search.start =  this.$helper.formatDate(new Date(datenow.getFullYear(), datenow.getMonth(), 1))
                    this.search.end =   this.$helper.formatDate(new Date(datenow.getFullYear(), datenow.getMonth()+1, 0))
                    this.search.branch = this.branches[this.activebranchIndex].id
                    this.searchProceed()
                })
            .catch(err=>console.log(err))
    }

}
</script>