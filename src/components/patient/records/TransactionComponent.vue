<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-file-alt"></i> My Transactions</span>
                    <button @click="printPDF" class="btn btn-danger float-right"><span class="fa fa-file-pdf"></span> Pdf</button>
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
                                    <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Transaction No</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="search.transactionNo"/>
                            </div>
                            </div>

                               <div class="col-md-3">
                                    <button @click="searchProceed" class="form-control btn btn-primary"><span class="fa fa-search"></span> Search</button>
                            </div>

                    </div>

                    <table class="table table-condensed table-striped">
                        <thead>
                            <tr>
                                <th>Reference No</th>
                                <th>Date</th>
                                <th>Dentist</th>
                                <th>Status</th>
                                <th></th>

                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(transaction,index) in transactions" :key="index">
                                <td>{{transaction.transactionNo}}</td>
                                <td>{{transaction.transactionDate}}</td>
                                <td>{{transaction.Dentist.fullname}}</td>
                                <td>{{getStatus(transaction.status)}}</td>
                                <td><a target="_blank" :href="`./transaction/${transaction.id}/form`">View Details</a></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>

        </div>
  
    </div>
</template>

<script>
import { formatDate , format12Hour } from "@/helper/helper"
import { mapState } from 'vuex'
export default {
    data: function(){
        return {
             activebranchIndex: 0,
             search :{
                start: "",
                end: "",
                transactionNo: "",
                branch: "",
                dentist: "All",
                status: "All",
            },
        }
    },
    methods: {
                   printPDF: function(){
            

          let records = this.transactions.map((transaction)=>{
            return [transaction.transactionNo,transaction.transactionDate,transaction.Dentist.fullname,this.getStatus(transaction.status)]
          }) 
          records.sort()
          records.unshift(['REFERENCE NO','DATE','DENTIST','STATUS'])
           
            var docDefinition = {  

                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'portrait',
               content: [
                 {
                   text: `${this.branches[this.activebranchIndex].branch} Transaction Records From ${this.$helper.formatBdayDate(this.search.start)} To ${this.$helper.formatBdayDate(this.search.end)}`, alignment: 'center', margin: [0,0,0,20]
                 },
               {
                 table: {
                   widths: ['auto','auto','*','auto'],
                   body: records
                 }
               }
              ]
              
            }
            this.$pdfMake.createPdf(docDefinition).open();
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
         changeFilterbranch: function(branch,index){
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            this.activebranchIndex = index
            this.search.branch = this.branches[this.activebranchIndex].id
            // this.$store.dispatch("reservation/list",this.search)
             console.log(this.search)
             this.$store.dispatch("transaction/getRecords",this.search)
         },
         dHour: function(date){
            return format12Hour(date)
        },
         searchProceed: function(){
             console.log(this.search)
             this.$store.dispatch("transaction/getRecords",this.search)
        },

    },
    computed: {
        ...mapState({
            branches: state=> state.branch.branches,
            transactions: state=> state.transaction.usertransactions,
        })
    },
    mounted(){
        this.$store.dispatch("activenav","recordnav")
           this.$store.dispatch("branch/getList")
            .then(()=>{
                
                const datenow = new Date()
                this.search.start =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth(), 1))
                this.search.end =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth()+1, 0))
                this.search.branch = this.branches[this.activebranchIndex].id

                console.log(this.search)
                this.$store.dispatch("transaction/getRecords",this.search)
    
            })
            .catch(err=>console.log(err))
    }

}
</script>