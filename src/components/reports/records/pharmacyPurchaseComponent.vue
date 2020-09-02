<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-file-alt"></i> Records Search - Pharmarcy Purchase Receipt</span>
                   <button type="button" @click="back()" class="noprint float-right"><span class="fa fa-times"></span></button>
                    <button @click="printPDF" class="btn btn-danger float-right" style="margin-right:20px;"><span class="fa fa-file-pdf"></span> Pdf</button>
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
                                          <span class="input-group-text" id="basic-addon3">Receipt Reference No</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="search.refno"/>
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
                                <th>Date Time</th>
                                <th>Staff</th>
                                <th>SubTotal Amount</th>
                                <th>Discount</th>
                                <th>Total Amount</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                           <tr v-for="(bill,index) in purchases" :key="index">
                               <td>{{bill.billrefNo}}</td>
                               <td>{{dDate(bill.createdAt)}}</td>
                               <td>{{bill.modifiedBy}}</td>
                               <td>{{subtotal(bill.Billitems)}}</td>
                               <td>{{bill.discount}}</td>
                               <td>{{subtotal(bill.Billitems) - bill.discount}}</td>
                               <td><router-link :to="{name: 'invoiceInfo',params: {idno: bill.id}}">purchase receipt</router-link></td>
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
                refno: "",
                branch: "",
            },
        }
    },
    methods: {
        printPDF: function(){
            

          let records = this.purchases.map((bill)=>{
            return [bill.billrefNo,this.dDate(bill.createdAt),bill.modifiedBy,this.subtotal(bill.Billitems),bill.discount,this.subtotal(bill.Billitems) - bill.discount]
          }) 
          records.sort()
          records.unshift(['REFERENCE NO','DATE TIME','STAFF','SUB TOTAL','DISCOUNT','TOTAL AMOUNT'])
           
            var docDefinition = {  

                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'landscape',
               content: [
                 {
                   text: `${this.branches[this.activebranchIndex].branch} Pharmacy Sales Records From ${this.$helper.formatBdayDate(this.search.start)} To ${this.$helper.formatBdayDate(this.search.end)}`, alignment: 'center', margin: [0,0,0,20]
                 },
               {
                 table: {
                   widths: ['*','auto','*','auto','auto','auto'],
                   body: records
                 }
               }
              ]
              
            }
            this.$pdfMake.createPdf(docDefinition).open();
        },
        back: function(){
            this.$router.go(-1)
        },
        subtotal: function(items){
            let amount = 0 
            items.forEach((item)=>{
                amount = amount + parseFloat(item.amount)
            })
            return amount
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
         dHour: function(date){
            return format12Hour(date)
        },
        dDate: function(date){
            return `${this.$helper.formatDate(date)} ${this.$helper.format12Hour(date)}`
        },
         searchProceed: function(){
             this.$store.dispatch("report/pharmacyPurchaseRecords",this.search)
        },

    },
    computed: {
        ...mapState({
            branches: state=> state.branch.branches,
            purchases: state=> state.report.purchases
        })
    },
    mounted(){
        this.$store.dispatch("activenav","reportnav")
           this.$store.dispatch("branch/getList")
            .then(()=>{
                
                const datenow = new Date()
                this.search.start =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth(), 1))
                this.search.end =  formatDate(new Date(datenow.getFullYear(), datenow.getMonth()+1, 0))
                this.search.branch = this.branches[this.activebranchIndex].id

               this.searchProceed()
    
            })
            .catch(err=>console.log(err))
    }

}
</script>