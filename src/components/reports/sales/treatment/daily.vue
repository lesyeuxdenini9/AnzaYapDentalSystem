<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-calendar"></i> Daily ( Date Range ) - Treatment</span>
                    <button type="button" @click="back()" class="noprint float-right"><span class="fa fa-times"></span></button>
                    <hr class="noprint"/>
                      <ul class="nav nav-tabs noprint">
            
                                <li class="nav-item" v-for="(branch,index) in branches" :key="index">
                                    <a v-if="index==0" @click="changeFilterbranch(branch.id,index)" class="active navbranch nav-link" href="javascript:void(0)">
                                             {{branch.branch}}
                                    </a>
                                    <a v-else @click="changeFilterbranch(branch.id,index)" class="navbranch nav-link" href="javascript:void(0)">
                                             {{branch.branch}}
                                    </a>
                                    
                                </li>
                             
                            </ul>   

                            
                              <div class="card noprint">

                                <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon3">Start Date</span>
                                                    </div>
                                                    <input type="date" class="form-control" v-model="search.start"/>
                                            </div>
                                            </div>

                                            <div class="col-md-3">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon3">End Date</span>
                                                    </div>
                                                    <input type="date" class="form-control" v-model="search.end"/>
                                            </div>
                                            </div>

                                             <div class="col-md-3">
                                                    <button @click="searchProceed" class="form-control btn btn-primary"><span class="fa fa-search"></span> Generate</button>
                                            </div>

                                        </div>

                                </div>
                              </div>

                              <br/>
                                   <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;position:relative">
                                     <button @click="printcolumn()" class="btn btn-danger" style="position:absolute;right:0;bottom:-40px;"><span class="fa fa-file-pdf"></span> PDF</button>
                                 </div>
                                
                                      <div style="text-align:center;color:dimgray;font-size:14pt;font-weight:bold;"><span>TREATMENT EARNINGS FROM {{search.start}} TO {{search.end}}</span></div>
                                      <column-chart :library="columnlibrary" :stacked="graphOptions.stacked" :legend="false" :download="true" :data="graphOptions.data"></column-chart>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <table class="table table-condensed table-striped table-bordered">
                                                <thead>
                                                    <tr style="background:#343A40;color:white;">
                                                        <th style="width:50%">Payment Date</th>
                                                        <th>Earnings</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr v-for="(sale,index) in sales.graph" :key="index">
                                                        <td>{{sale.date}}</td>
                                                        <td>{{sale.totalsales}}</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>Total</th>
                                                        <th>{{computeTotal}}</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>                                      
                                
                              </div>

                         
                         
                                    <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;position:relative">
                                     <button @click="printpie()" class="btn btn-danger" style="position:absolute;right:0;bottom:-40px;"><span class="fa fa-file-pdf"></span> PDF</button>
                                 </div>
                              <div style="text-align:center;color:dimgray;font-size:14pt;font-weight:bold;"><span>NO. OF SERVICE DONE BASED ON TRANSACTION DATE FROM {{search.start}} TO {{search.end}}</span></div>
                              <div class="row">
                                  <div class="col-md-12">
                                      <pie-chart :library="pielibrary" :download="true" width="100%" height="500px" :data="pieOptionsMostAvail.data"></pie-chart>
                                  </div>

                                   <div class="col-md-10 offset-md-1">
                                            <table class="table table-condensed table-striped table-bordered">
                                                <thead>
                                                   <tr style="background:#343A40;color:white;">
                                                        <th style="width:50%">Service / Treatment</th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr v-for="(sale,index) in sales.serviceMostavail" :key="index">
                                                        <td>{{sale.service}}</td>
                                                        <td>{{sale.totalcount}}</td>
                                                        <td>
                                                           <a @click="showgenderModal(index)" href="javascript:void(0)">Detailed By Gender</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                               
                                            </table>
                                        </div>
                              </div>

                              <bygenderModal :branch="branches[activebranchIndex].branch" :flag="1" :search="search" :service="service" @closemodal="closemodal" v-if="showbygender" />

                            
                              
                                    <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;position:relative">
                                     <button @click="printDetailed()" class="btn btn-danger" style="position:absolute;right:0;bottom:-40px;"><span class="fa fa-file-pdf"></span> PDF</button>
                                 </div>
                                <div style="text-align:center;margin-bottom:20px;"><span style="font-weight:bold;color:#696972;font-size:14pt;">DETAILED TRANSACTION DATA PER DENTIST FROM {{search.start}} TO {{search.end}}</span></div>
                             
                                 <div class="row">
                   
                                                   <div class="col-md-12">
                                            <table class="table table-condensed table-striped table-bordered">
                                                <tbody v-for="(dentist,index) in sales.dentistdata" :key="index">
                                                    <tr style="background:dimgray;color:white;">
                                                        <td colspan="8">{{dentist.fullname}}</td>
                                                    </tr>
                                                    <tr style="background:white;color:black;">
                                                        <td style="font-weight:bold;font-size:12pt;">YEAR</td>
                                                        <td style="font-weight:bold;font-size:12pt;">MONTH</td>
                                                        <td style="font-weight:bold;font-size:12pt;">TRANSACTION DATE</td>
                                                        <td style="font-weight:bold;font-size:12pt;">TRANSACTION NO</td>
                                                        <td style="font-weight:bold;font-size:12pt;">PATIENT</td>
                                                        <td style="font-weight:bold;font-size:12pt;">TREATMENTS</td>
                                                        <td style="font-weight:bold;font-size:12pt;">STATUS</td>
                                                        <td style="font-weight:bold;font-size:12pt;">AMOUNT PAID</td>
                                                    </tr>
                                                    <tr v-for="transaction in dentist.Transactions" :key="transaction.id">
                                                         <td style="font-size:11pt;">{{getYear(transaction.transactionDate)}}</td>
                                                        <td style="font-size:11pt;">{{getMonth(transaction.transactionDate)}}</td>
                                                        <td style="font-size:11pt;">{{transaction.transactionDate}}</td>
                                                        <td style="font-size:11pt;">{{transaction.transactionNo}}</td>
                                                        <td style="font-size:11pt;">{{transaction.User.fullname}}</td>
                                                        <td style="font-size:11pt;">
                                                            <ul>
                                                                <li v-for="treatment in transaction.Treatments" :key="treatment.id">{{treatment.service}}</li>
                                                            </ul>
                                                        </td>
                                                        <td style="font-size:11pt;">{{getStatus(transaction.status)}}</td>
                                                        <td style="font-size:11pt;">{{TotalAmount(transaction.Billings)}}</td>
                                                    </tr>
                                                </tbody>
                                                

                                            </table>
                                        </div>
                                 </div>



        </div>
  
    </div>
</template>

<script>
import { mapState } from 'vuex'
import bygenderModal from "@/components/reports/sales/treatment/genderModal"
export default {
    components: {bygenderModal},
    data: function(){
        return {
                showbygender: false,
                service: {},
                activebranchIndex: 0,
                search :{
                    start: "",
                    end: "",
                    branch: "",
                },
                graphOptions: {
                    stacked: false,
                    colors: ['#b00', '#666'],
                    data: [],
                },
                pieOptionsMostAvail: {
                    data: [],
                },
                pieOptionsMostEarn: {
                    data: [],
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
        closemodal: function(){
            this.showbygender = false
        },
        showgenderModal: function(index){
            this.showbygender = true
            this.service = this.sales.serviceMostavail[index]
        },
        printDetailed: function(){

            let data = []

            this.sales.dentistdata.forEach((dentist)=>{
                data.push([{text: dentist.fullname,colSpan: 8},{},{},{},{},{},{},{}])
                dentist.Transactions.forEach((transaction)=>{
                    let treatments = ''
                    transaction.Treatments.forEach((treatment)=>{
                        treatments = treatments + `* ${treatment.service}\n`
                    })

                    data.push([
                            this.getYear(transaction.transactionDate),
                            this.getMonth(transaction.transactionDate),
                            transaction.transactionDate,
                            transaction.transactionNo,
                            transaction.User.fullname,
                            treatments,
                            this.getStatus(transaction.status),
                            this.TotalAmount(transaction.Billings),
                    ])

                })
            })

            var docDefinition = {
                  watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'landscape',
                content: [
                    {
                        text: `${this.branches[this.activebranchIndex].branch} Detailed Transaction Data Per Dentist From ${this.search.start} To ${this.search.end}`, alignment: 'center', margin: [0,0,0,20]
                    },
                    {
                        table: {
                            widths: ['auto','auto','auto','auto','*','*','auto','auto'],
                            body: data,
                            pageBreak: 'after'
                        }
                    }
                ],
                // styles: {
                //     tableHeader: {
                //         bold: true,
                //         background: 'dimgray',
                //         color: 'white',
                //     }
                // } 
            }

            this.$pdfMake.createPdf(docDefinition).open()
        },
         printpie: function(){
               let data = this.sales.serviceMostavail.map((sale)=>{
                return [sale.service,sale.totalcount]
            })

            data.unshift(['Service/Treatment',''])

             var docDefinition = {  
                 
                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'portrait',
               content: [
                 {
                   text: `${this.branches[this.activebranchIndex].branch} No. Of Service Done Based On Transaction Date From ${this.search.start} To ${this.search.end}`, alignment: 'center', margin: [0,0,0,20]
                 },
                 {
                    image: this.pieimg,
                    height:400,
                    width: 1200,
                    alignment: 'center',
                    margin: [0,0,0,20]
                 },
                {
                 table: {
                   widths: ['*','*'],
                   body: data,
                   pageBreak: 'after'
                 }
               },
           
              ]
              
            }
            this.$pdfMake.createPdf(docDefinition).open();
         },
         printcolumn: function(){

            let data = this.sales.graph.map((sale)=>{
                return [sale.date,sale.totalsales]
            })

            data.unshift(['PAYMENT DATE','EARNINGS'])

            data.push(['Total',this.computeTotal])
             var docDefinition = {  
                 
                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'landscape',
               content: [
                 {
                   text: `${this.branches[this.activebranchIndex].branch} Treatment Earnings From ${this.search.start} To ${this.search.end}`, alignment: 'center', margin: [0,0,0,20]
                 },
                 {
                     image: this.columnimg,
                     height:300,
                     width:750,
                 },
                {
                 table: {
                   widths: ['*','*'],
                   body: data,
                   pageBreak: 'after'
                 }
               },
           
              ]
              
            }
            this.$pdfMake.createPdf(docDefinition).open();
        },
        doneChart: function(){
            let charts = document.getElementsByClassName('chartjs-render-monitor')
            this.columnimg = charts[0].toDataURL()
        },
        donePie: function(){
            let charts = document.getElementsByClassName('chartjs-render-monitor')
            this.pieimg = charts[1].toDataURL()
        },
        getMonth: function(date){
            let ddate = new Date(date)
            return this.months[ddate.getMonth()].des
        },
        getYear: function(date){
            let ddate = new Date(date)
            return ddate.getFullYear()
        },
        getStatus: function(status){
             let des = ''
             switch(status){
                 case 0:
                     des = "On-Going"
                     break
                 case 1:
                     des = "For Followup"
                     break
                 case 2:
                     des = "Done"
                     break
                 default:
                     des = "Cancelled"
                     break
             }

             return des
         },
        TotalAmount: function(billings){
            let total = 0
            billings.forEach(bill=>{
                total = total + parseFloat(bill.payment)
            })
            return total
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
             this.$store.dispatch("report/sales_daily",this.search).then(()=>{
                let data = []
                this.sales.graph.forEach((sale)=>{
                   data.push([sale.date, sale.totalsales])
                })
                this.graphOptions.data = data
                data = []
                this.sales.serviceMostavail.forEach((sale)=>{
                     data.push([sale.service, sale.totalcount])
                })
                this.pieOptionsMostAvail.data = data
                data = []
                this.sales.serviceMostEarn.forEach((sale)=>{
                     data.push([sale.service, sale.totalearn])
                })
                this.pieOptionsMostEarn.data = data
             }).catch(err=>console.log(err))
         },
 
    },
    computed: {
        ...mapState({
            branches: state=> state.branch.branches,
            sales: state=> state.report.sales,
        }),
        computeTotal: {
            get: function(){
                let total = 0
             this.sales.graph.forEach((sale)=>{
                 total = total + parseFloat(sale.totalsales)
             })
             return total
            }
        }
 
    },
    mounted(){
        this.$store.dispatch("activenav","reportnav")
          this.$store.dispatch("branch/getList")
            .then(()=>{
                    const datenow = new Date()
                    this.search.start =  this.$helper.formatDate(new Date(datenow.getFullYear(), datenow.getMonth(), 1))
                    this.search.end =   this.$helper.formatDate(new Date(datenow.getFullYear(), datenow.getMonth()+1, 0))
                    this.search.branch = this.branches[this.activebranchIndex].id
                    this.searchProceed()
                })
            .catch(err=>console.log(err))
    }

}
</script>
