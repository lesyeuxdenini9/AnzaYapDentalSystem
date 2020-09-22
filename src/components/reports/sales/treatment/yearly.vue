<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-calendar"></i> Yearly - Services & Treatments</span>
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
                                 <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;position:relative">
                                     <button @click="printcolumn()" class="btn btn-danger" style="position:absolute;right:0;bottom:-40px;"><span class="fa fa-file-pdf"></span> PDF</button>
                                 </div>
                                <div style="text-align:center;color:dimgray;font-size:14pt;font-weight:bold;"><span>SERVICE & TREATMENT EARNINGS FROM {{search.startyear}} TO {{search.endyear}}</span></div>
                                 <column-chart :library="columnlibrary" :stacked="graphOptions.stacked" :legend="false" :download="true" :data="graphOptions.data"></column-chart>
                                        <div class="row">
                                        <div class="col-md-10 offset-md-1">
                                            <table class="table table-condensed table-striped table-bordered">
                                                <thead>
                                                    <tr style="background:#343A40;color:white;">
                                                        <th style="width:50%">Date</th>
                                                        <th>Earnings</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr v-for="(sale,index) in sales.graph" :key="index">
                                                        <td>{{sale.yearname}}</td>
                                                        <td>{{$helper.roundToDecimal(sale.totalsales,2)}}</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>Total</th>
                                                        <th>{{$helper.roundToDecimal(computeTotal,2)}}</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                      
                                
                              </div>

                               <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;position:relative">
                                     <button @click="printpie()" class="btn btn-danger" style="position:absolute;right:0;bottom:-40px;"><span class="fa fa-file-pdf"></span> PDF</button>
                                 </div>
                                 <div style="text-align:center;color:dimgray;font-size:14pt;font-weight:bold;"><span>NO. OF SERVICE & TREATMENT DONE BASED ON TRANSACTION DATE FROM  {{search.startyear}} TO {{search.endyear}}</span></div>
                                      <div class="row">
                                            <div class="col-md-6" style="text-align:center">
                                       <span style="font-weight:bold;color:dimgray;">BY SERVICE CATEGORY</span>
                                       <pie-chart :library="pielibrary2" :download="true" width="100%" height="500px" :data="byCategory"></pie-chart>

                                            <table class="table table-condensed table-striped table-bordered">
                                                <thead>
                                                   <tr style="background:#343A40;color:white;">
                                                        <th style="text-align:left;">Category</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr v-for="(categ,index) in byCategory" :key="index">
                                                        <td>{{categ[0]}}</td>
                                                        <td>{{categ[1]}}</td>
                                                  
                                                    </tr>
                                                </tbody>
                                               
                                            </table>
                                  </div>
                                  <div class="col-md-6" style="text-align:center">
                                       <span style="font-weight:bold;color:dimgray;">BY SERVICE TREATMENT</span>
                                      <pie-chart :library="pielibrary" :download="true" width="100%" height="500px" :data="pieOptionsMostAvail.data"></pie-chart>
                                        <table class="table table-condensed table-striped table-bordered">
                                                <thead>
                                                   <tr style="background:#343A40;color:white;">
                                                        <th  style="text-align:left;">Service & Treatment</th>
                                                         <th style="text-align:left;">Category</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr v-for="(sale,index) in sales.serviceMostavail" :key="index">
                                                        <td>{{sale.service}}</td>
                                                        <td>{{sale.category}}</td>
                                                        <td>{{$helper.roundToDecimal(sale.totalcount,2)}} 
                                                            <!-- <span v-if="sale.totalcount == 1">time</span><span v-else>times</span> -->
                                                        </td>
                                                        <td>
                                                           <a @click="showgenderModal(index)" href="javascript:void(0)">Detailed By Gender</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                               
                                            </table>
                                  </div>

                             
                              </div>

                              <bygenderModal :branch="branches[activebranchIndex].branch" :flag="3" :search="search" :service="service" @closemodal="closemodal" v-if="showbygender" />

                                 <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;position:relative">
                                     <button @click="printDetailed()" class="btn btn-danger" style="position:absolute;right:0;bottom:-40px;"><span class="fa fa-file-pdf"></span> PDF</button>
                                 </div>
                                         <div style="text-align:center;margin-bottom:20px;"><span style="font-weight:bold;color:#696972;font-size:14pt;">DETAILED TRANSACTION DATA PER DENTIST FROM {{search.startyear}} TO {{search.endyear}}</span></div>
                             
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
                                                        <td style="font-weight:bold;font-size:12pt;">SERVICES & TREATMENTS</td>
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
                                                        <td style="font-size:11pt;">{{$helper.roundToDecimal(TotalAmount(transaction.Billings),2)}}</td>
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
                    startyear: "",
                    endyear: "",
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
                 pielibrary2: {
                    animation: {
                        onComplete: this.donePie2
                    }
                },
                columnimg: null,
                pieimg: null,
                pieimg2: null,

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
        doneChart: function(){
            let charts = document.getElementsByClassName('chartjs-render-monitor')
            this.columnimg = charts[0].toDataURL()
        },
        donePie: function(){
            let charts = document.getElementsByClassName('chartjs-render-monitor')
            this.pieimg = charts[2].toDataURL()
        },
        donePie2: function(){
            let charts = document.getElementsByClassName('chartjs-render-monitor')
            this.pieimg2 = charts[1].toDataURL()
        },
         printDetailed: function(){

            let data = []

            this.sales.dentistdata.forEach((dentist)=>{
                data.push([{text: dentist.fullname,colSpan: 8},{},{},{},{},{},{},{}])
                 data.push(['YEAR','MONTH','DATE','TRANSACTION NO','PATIENT','SERVICES & TREATMENTS','STATUS','AMOUNT'])
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
                            this.$helper.roundToDecimal(this.TotalAmount(transaction.Billings),2),
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
                        text: `${this.branches[this.activebranchIndex].branch} Detailed Transaction Data Per Dentist From ${this.search.startyear} To ${this.search.endyear}`, alignment: 'center', margin: [0,0,0,20]
                    },
                    {
                        table: {
                            widths: ['auto','auto','auto','auto','*','*','auto','auto'],
                            body: data,
                            pageBreak: 'after'
                        }
                    }
                ],
            }

            this.$pdfMake.createPdf(docDefinition).open()
        },
          printcolumn: function(){

            let data = this.sales.graph.map((sale)=>{
                return [sale.yearname,this.$helper.roundToDecimal(sale.totalsales,2)]
            })

            data.unshift(['PAYMENT DATE','EARNINGS'])

             data.push(['Total',this.$helper.roundToDecimal(this.computeTotal,2)])
             var docDefinition = {  
                 
                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'landscape',
               content: [
                 {
                   text: `${this.branches[this.activebranchIndex].branch} Service & Treatment Earnings From ${this.search.startyear} To ${this.search.endyear}`, alignment: 'center', margin: [0,0,0,20]
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
        printpie: function(){
            let data = this.sales.serviceMostavail.map((sale)=>{
                 return [sale.service,sale.category,this.$helper.roundToDecimal(sale.totalcount,2)]
            })

            data.unshift(['Service & Treatment','Category',''])

             
            let datacategory = this.byCategory
            datacategory.unshift(['Category',''])

             var docDefinition = {  
                 
                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'landscape',
               content: [
                 {
                   text: `${this.branches[this.activebranchIndex].branch} No. Of Service & Treatment Done Based On Transaction Date From ${this.search.startyear} To ${this.search.endyear}`, alignment: 'center', margin: [0,0,0,20]
                 },
                 {
                   text: `By Service Category`, alignment: 'center', margin: [0,0,0,20]
                 },
                 {
                    image: this.pieimg2,
                    height:400,
                    // width: 1200,
                    alignment: 'center',
                    margin: [0,0,0,20],
                     pageBreak: 'after'
                 },{
                     table: {
                        widths: ['*','*'],
                        body: datacategory,
                        pageBreak: 'after'
                    }
                 },
                 {
                   text: `By Service Treatment`, alignment: 'center', margin: [0,0,0,20], pageBreak: 'before'
                 },
                 {
                    image: this.pieimg,
                    height:400,
                    // width: 1200,
                    alignment: 'center',
                    margin: [0,0,0,20],
                    pageBreak: 'after',
                 },
                {
                 table: {
                   widths: ['*','*','*'],
                   body: data,
                   pageBreak: 'after'
                 }
               },
           
              ]
              
            }
            this.$pdfMake.createPdf(docDefinition).open();
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
              this.$store.dispatch("report/sales_yearly",this.search)
                .then(()=>{
                     let data = []
                    this.sales.graph.forEach((sale)=>{
                        data.push([sale.yearname, sale.totalsales])
                    })
                    this.graphOptions.data = data
                    data = []
                     this.sales.serviceMostavail.forEach((sale)=>{
                        data.push([sale.service, sale.totalcount])
                    })
                    this.pieOptionsMostAvail.data = data
                })
                .catch(err=>console.log(err))
         }
    },
    computed: {
        ...mapState({
            branches: state=> state.branch.branches,
            sales: state=> state.report.sales,
            categories: state=> state.service.categories,
        }),
        byCategory: {
            get: function(){
                let totalcount = [0,0,0,0,0,0]
                this.sales.serviceMostavail.forEach((sale)=>{

                    if(sale.category == this.categories[0]) totalcount[0] = totalcount[0] + sale.totalcount
                    if(sale.category == this.categories[1]) totalcount[1] = totalcount[1] + sale.totalcount
                    if(sale.category == this.categories[2]) totalcount[2] = totalcount[2] + sale.totalcount
                    if(sale.category == this.categories[3]) totalcount[3] = totalcount[3] + sale.totalcount
                    if(sale.category == this.categories[4]) totalcount[4] = totalcount[4] + sale.totalcount
                    if(sale.category == this.categories[5]) totalcount[5] = totalcount[5] + sale.totalcount
                    
                })

                return [
                    [this.categories[0],this.$helper.roundToDecimal(totalcount[0],2)],
                    [this.categories[1],this.$helper.roundToDecimal(totalcount[1],2)],
                    [this.categories[2],this.$helper.roundToDecimal(totalcount[2],2)],
                    [this.categories[3],this.$helper.roundToDecimal(totalcount[3],2)],
                    [this.categories[4],this.$helper.roundToDecimal(totalcount[4],2)],
                    [this.categories[5],this.$helper.roundToDecimal(totalcount[5],2)],
                ].sort()
            }
        },
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
                    this.search.startyear = this.search.endyear = datenow.getFullYear()
                    this.search.branch = this.branches[this.activebranchIndex].id
                    this.searchProceed()
                })
            .catch(err=>console.log(err))
    }

}
</script>
