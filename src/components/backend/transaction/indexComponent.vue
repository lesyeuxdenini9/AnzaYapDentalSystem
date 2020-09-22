<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-info"></i> {{"Transaction No:"+transactionInfo.transactionNo}}
                   <button class="float-right" @click="goback()"><span class="fa fa-times"></span></button>
                  </span>
                    <hr/>

                       <div class="card">
                            <div class="card-header card-default" style="background:#343A40;color:white;">Information(s)
                              <button @click="viewMedicalCertificate()" class="float-right btn btn-default" style="color:white;"><span class="fa fa-medkit"></span> Medical Certificate</button>
                              <button @click="viewTransactionForm()" class="float-right btn btn-default" style="color:white;"><span class="fa fa-print"></span> Transaction Form</button>
                              <button @click="showcreatepaymentModal = true"  class="float-right btn btn-default" style="color:white;"><span class="fa fa-edit"></span> Billing</button>
                              <button @click="editStatus()" class="float-right btn btn-default" style="color:white;"><span class="fa fa-pen"></span> Edit Status</button>
                            </div>
                        <div class="card-body">
                             <div class="col-md-3">
                                 <div class="form-group">
                                        <label>Transaction Date</label>
                                        <input type="text" class="form-control" v-model="dDate" readonly style="background:white;"/>
                                </div>
                            </div>
                             <div class="col-md-3">
                                 <div class="form-group">
                                        <label>Assign Dentist</label>
                                        <input type="text" class="form-control" v-model="transactionInfo.dentist" readonly style="background:white;"/>
                                </div>
                            </div>
                             <div class="col-md-3">
                                 <div class="form-group">
                                        <label>Status</label>
                                        <input type="text" class="form-control" v-model="Status" readonly style="background:white;"/>
                                </div>
                            </div>
                             <div class="col-md-3">
                                 <div class="form-group">
                                        <label>Remarks</label>
                                        <input type="text" class="form-control" v-model="transactionInfo.remarks" readonly style="background:white;"/>
                                </div>
                            </div>
                              
                            <div class="col-md-3">
                                 <div class="form-group">
                                        <label>Patient name</label>
                                        <input type="text" class="form-control" v-model="transactionInfo.User.fullname" readonly style="background:white;"/>
                                </div>
                            </div>

                                <div class="col-md-3">
                                 <div class="form-group">
                                        <label>Gender</label>
                                        <input type="text" class="form-control" v-model="transactionInfo.User.gender" readonly style="background:white;"/>
                                </div>
                            </div>


                                <div class="col-md-3">
                                 <div class="form-group">
                                        <label>Age</label>
                                        <input type="text" class="form-control" v-model="Age" readonly style="background:white;"/>
                                </div>
                            </div>

                                <div class="col-md-3">
                                <div class="form-group">
                                        <label>Medical History</label>
                                        <textarea type="text" class="form-control" v-model="transactionInfo.User.history" readonly style="background:white;"/>
                                </div>
                            </div>

                            <div class="col-md-3" v-if="transactionInfo.status!=2">
                                <select class="form-control" v-model="transactionInfo.toothType">
                                        <option value="0">PERMANENT</option>\
                                        <option value="1">PRIMARY</option>
                                </select>
                            </div>

                                <div class="col-md-3" v-if="transactionInfo.status==2">
                                   <input type="text" class="form-control" v-if="transactionInfo.toothType == 0" value="PERMANENT" readonly style="background:white"/>
                                    <input type="text" class="form-control" v-else value="PRIMARY" readonly style="background:white"/>
                            </div>


                            <div class="col-md-12">
                                <table class="table table-bordered">
                                    <tr>
                                        <td v-if="transactionInfo.toothType == 0" colspan="8" style="text-align:center;font-weight:bold;">UPPER RIGHT JAW TEETH</td>
                                        <td v-if="transactionInfo.toothType == 0"  colspan="8" style="text-align:center;font-weight:bold;">UPPER LEFT JAW TEETH</td>
                                        <td v-if="transactionInfo.toothType == 1" colspan="5" style="text-align:center;font-weight:bold;">UPPER RIGHT JAW TEETH</td>
                                        <td v-if="transactionInfo.toothType == 1"  colspan="5" style="text-align:center;font-weight:bold;">UPPER LEFT JAW TEETH</td>
                                    </tr>
                                    <tr>
                                        <td v-for="(tooth,index) in topTeeth" :key="index" class="teeth"><span class="teethorder">
                                            {{tooth.orderNo}}</span>
                                            <img  v-if="transactionInfo.toothType == 0" :src="`${apiUrl}/public/images/permanent/top_${tooth.orderNo}.PNG`" style="height:40px;width:40px;"/>
                                             <img  v-else :src="`${apiUrl}/public/images/primary/top_${tooth.orderNo}.PNG`" style="height:40px;width:40px;"/>
                                        </td>
                                    </tr>
                                     <tr>
                                        <td v-for="(tooth,index) in BottomTeeth" :key="index" class="teeth"><span class="teethorder">{{tooth.orderNo}}</span>
                                          <img  v-if="transactionInfo.toothType == 0" :src="`${apiUrl}/public/images/permanent/low_${tooth.orderNo}.PNG`" style="height:40px;width:40px;"/>
                                         <img  v-else :src="`${apiUrl}/public/images/primary/low_${tooth.orderNo}.PNG`" style="height:40px;width:40px;"/>
                                        </td>
                                    </tr>

                                      <tr>
                                        <td v-if="transactionInfo.toothType == 0" colspan="8" style="text-align:center;font-weight:bold;">LOWER RIGHT JAW TEETH</td>
                                        <td v-if="transactionInfo.toothType == 0"  colspan="8" style="text-align:center;font-weight:bold;">LOWER LEFT JAW TEETH</td>
                                        <td v-if="transactionInfo.toothType == 1" colspan="5" style="text-align:center;font-weight:bold;">LOWER RIGHT JAW TEETH</td>
                                        <td v-if="transactionInfo.toothType == 1"  colspan="5" style="text-align:center;font-weight:bold;">LOWER LEFT JAW TEETH</td>
                                    </tr>
                             
                                </table>
                            </div>
       

                        </div>


                        </div>
                          
                        <div class="card">
                            <div class="card-header"><span class="card-title">&nbsp;</span></div>
                            <div class="card-body">
                                
                                    <table class="table table-condensed table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width:20%;">Treatment<button  v-if="transactionInfo.status!=2 && transactionInfo.Billings.length ==0"  @click="addnewTreatment()" class="btn btn-sm btn-primary float-right"><span class="fa fa-plus"></span> Add Treatment</button></th>
                                                <th>Action Taken</th>
                                            </tr>
                                 
                                        </thead>
                                        <tbody>
                                            <tr v-for="(treatment,index) in transactionInfo.Treatments" :key="index">
                                                <td>{{treatment.service}}<br/>Estimated Price: P {{$helper.roundToDecimal(treatment.amount,2)}}<br/>
                                                     <a  v-if="transactionInfo.status!=2 && transactionInfo.Billings.length ==0"  @click="removeTreatment(treatment.id)" style="color:maroon;font-size:8pt" href="javascript:void(0)"><span class="fa fa-pen"> </span> Remove</a>
                                                </td>
                                                <td>
                                                    <table class="table table-condensed">
                                            
                                                            <tr style="background:silver;">
                                                                <td>Date</td>
                                                                <td style="width:20px;">StartTime</td>
                                                                <td style="width:20px;">EndTime</td>
                                                                <td>Diagnosis</td>
                                                                <td>Action</td>
                                                                <td style="text-align:center;">Tooth No</td>
                                                                <td  v-if="transactionInfo.status!=2" style="width:20px;"><button @click="addaction(index)"><span class="fa fa-plus"></span></button></td>
                                                            </tr>

                                                            <tr v-for="(action,index2) in treatment.Actions" :key="index2">
                                                                <td>{{action.date}}</td>
                                                                <td>{{hour(action.starttime)}}</td>
                                                                <td>{{hour(action.endtime)}}</td>
                                                                <td v-html="action.diagnosis"></td>
                                                                <td>{{action.actiontaken}}</td>
                                                                <td style="text-align:center;">
                                                                   <span v-for="(tooth,index3) in action.teeths" :key="index3"><span v-if="tooth.flag == 0">{{tooth.orderNo}} </span></span>
                                                                     <hr/> 
                                                                    <span v-for="(tooth,index3) in action.teeths" :key="index3"><span v-if="tooth.flag == 1">{{tooth.orderNo}} </span></span>
                                                                </td>
                                                                <td  v-if="transactionInfo.status!=2">
                                                                    <button @click="editAction(action)" style="color:green;"><span class="fa fa-pen"></span></button>
                                                                    <button @click="removeAction(action.id)" style="margin-top: 10px;color:maroon;"><span class="fa fa-trash"></span></button>
                                                                </td>

                                                            </tr>
                                                  
                                                    </table>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td colspan="2" style="font-size:16pt;">Estimated Total Amount: P {{$helper.roundToDecimal(getTotalAmount,2)}}</td>
                                            </tr>
                                        </tbody>

                                    </table>
                            </div>
                        </div>

                        <!-- <div class="card">
                               <div class="card-header" style="background:#343A40;color:white;"><span class="card-title"><button @click="showcreatepaymentModal=true" class="float-left btn btn-default text-white"><span class="fa fa-plus"></span> Create Payment</button></span></div>
                            <div class="card-body">
                                    <table class="table table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Referrence No</th>
                                                <th>Type</th>
                                                <th>Date</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                    </table>
                            </div>
                        </div> -->

                        
                        <div class="card">
                            <div class="card-header" style="background:#343A40;color:white;"><span class="card-title"><button @click="showaddPrescriptionModal=true" class="float-left btn btn-default text-white"><span class="fa fa-plus"></span> Create Prescription</button></span></div>
                            <div class="card-body">
                                    <table class="table table-condensed">
                                        <thead>
                                            <tr>
                                                <th>PrescriptionNo</th>
                                                <th>Date</th>
                                                <th>Items</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(prescript,index4) in transactionInfo.Prescriptions" :key="index4">
                                                <td>{{prescript.prescriptionNo}}<br/>
                                                    <a :href="`/backend/transaction/prescript/${prescript.id}`" target="_new" style="font-size:8pt;"><span class="fa fa-print"> </span> View</a><br/>
                                                    <a  v-if="transactionInfo.status!=2"  @click="editPrescription(prescript)" style="color:green;font-size:8pt" href="javascript:void(0)"><span class="fa fa-pen"> </span> Edit</a><br/>
                                                    <a  v-if="transactionInfo.status!=2"  @click="removePrescription(prescript.id)" style="color:maroon;font-size:8pt" href="javascript:void(0)"><span class="fa fa-pen"> </span> Remove</a>
                                                </td>
                                                <td>{{formatDate(prescript.date)}}</td>
                                                <td style="width:70%">
                                                    <table class="table table-bordered">
                                                        <tr style="background:silver;">
                                                            <td>Medicine</td>
                                                            <td>Qty</td>
                                                            <td>Dosage</td>
                                                            <td>Days</td>
                                                            <td>Remarks</td>
                                                  
                                                        </tr>
                                                        <tr v-for="(item,index5) in prescript.Prescriptitems" :key="index5">
                                                            <td>{{item.medicine}}</td>
                                                            <td>{{item.qty}}</td>
                                                            <td>{{item.dosage}}</td>
                                                            <td>{{item.days}}</td>
                                                            <td>{{item.remarks}}</td>
                                                        
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </div>
                        </div>

                    <addEventModal :branchid="transactionInfo.branchId" :toothType="transactionInfo.toothType" :topT="topTeeth" :botT="BottomTeeth" :editEventInfo="editEventInfo" v-if="showaddEventModal" @closemodal="closemodal"/>
                    <editActionModal :branchid="transactionInfo.branchId" :toothType="transactionInfo.toothType"  :topT="topTeeth" :botT="BottomTeeth" :transactID="transactID" :editActionInfo="editActionInfo" v-if="showeditActionModal" @closemodal="closemodal"/>
                    <editStatusModal :transactionInfo="transactionInfo" :editstatus="editstatus" v-if="showeditStatusModal" @closemodal="closemodal"/>
                    <createPrescriptionModal :branchid="transactionInfo.branchId" :transactID="transactID" v-if="showaddPrescriptionModal" @closemodal="closemodal"/>
                    <editPrescriptionModal :branchid="transactionInfo.branchId" :editPrescriptionInfo="editPrescriptionInfo" :transactID="transactID" v-if="showeditPrescriptionModal" @closemodal="closemodal"/>
        
                    <addNewTreatmentModal :branchId="transactionInfo.branchId" :transactID="transactID" v-if="showAddNewTreatmentModal" @closemodal="closemodal"/>


                    <createPaymentModal :transactionInfo="transactionInfo" v-if="showcreatepaymentModal" @closemodal="closemodal"/>
     
        </div>
  
    </div>
</template>

<script>
import { formatBdayDate , calculateAge , formatHour } from "@/helper/helper"
import { mapActions, mapState, mapGetters } from 'vuex'
import addEventModal from "@/components/backend/transaction/addEventModal"
import editActionModal from "@/components/backend/transaction/editActionModal"
import editStatusModal from "@/components/backend/transaction/editStatusModal"
import createPrescriptionModal from "@/components/backend/transaction/createPrescriptionModal"
import editPrescriptionModal from "@/components/backend/transaction/editPrescriptionModal"
import addNewTreatmentModal from "@/components/backend/transaction/addNewTreatmentModal"
import createPaymentModal from "@/components/backend/transaction/createPaymentModal"
export default {
      data: function(){
          return {
              showcreatepaymentModal: false,
              showaddEventModal: false,
              editEventInfo: {},
              showeditActionModal: false,
              editActionInfo: {},
              transactID: parseInt(this.$route.params.idno),
              showeditStatusModal: false,
              showaddPrescriptionModal: false,
              editstatus: {},
              editPrescriptionInfo: {},
              showeditPrescriptionModal: false,
              showAddNewTreatmentModal: false,
              apiUrl: this.$store.state.apiUrl,
          }
      },
      watch: {
          "transactionInfo.toothType" : function(newval){
             this.$store.dispatch("transaction/updateType",{tid: this.$route.params.idno, val: newval})
          } 
      },
      methods: {
          goback: function(){
              this.$router.go(-1)
          },
          viewTransactionForm: function(){
              this.$router.push({name: 'transactionform',params: {idno: this.$route.params.idno}})
          },
          viewMedicalCertificate: function(){
              this.$router.push({name: "medicalCertificate",params: {idno: this.$route.params.idno}})
          },
          addnewTreatment: function(){
              this.showAddNewTreatmentModal = true
          },
          editPrescription: function(prescript){
              this.editPrescriptionInfo = prescript
              this.showeditPrescriptionModal = true
          },
          removePrescription: function(id){
    
               this.$swal({
                title: 'Are you sure you want to remove this?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
              }).then((result) => {
                if (result.value) {
                  this.$store.dispatch("transaction/removePrescription",{tid: this.$route.params.idno, id: id})
                }
              })
          },
          removeTreatment: function(id){
    
                this.$swal({
                title: 'Are you sure you want to remove this?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
              }).then((result) => {
                if (result.value) {
                 this.$store.dispatch("transaction/removeTreatment",{tid: this.$route.params.idno, id: id})
                }
              })

              
          },
          formatDate: function(date){
              return formatBdayDate(date)
          },
          ...mapActions('transaction',[
              'getTransaction',
              'removeAction_',
          ]),
          editStatus: function(){
              this.editstatus.transactid = this.transactionInfo.id
              this.editstatus.status = this.transactionInfo.status
              this.editstatus.remarks = this.transactionInfo.remarks
              this.showeditStatusModal = true
          },
          editAction: function(action){
              this.editActionInfo = action
              this.showeditActionModal = true
          },
          removeAction: function(id){

             this.$swal({
                title: 'Are you sure you want to remove this?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
              }).then((result) => {
                if (result.value) {
                   this.removeAction_({id: id,transactID: this.$route.params.idno})
                }
              })
          },
         getStatus: function(status){
            let statustring = ''
            switch(status){
                case 0:
                    statustring = "On-Going / Pending"
                    break
                case 1:
                    statustring = "For Followup"
                    break 
                case 2:
                    statustring = "Done"
                    break
                default: 
                    break
            }

            return statustring
         },
         addaction: function(index){
             this.editEventInfo = this.transactionInfo.Treatments[index]
             this.showaddEventModal = true
         },
         closemodal: function(){
             this.showaddEventModal = false
             this.showeditActionModal = false
             this.showeditStatusModal = false
             this.showaddPrescriptionModal = false
             this.showeditPrescriptionModal = false
             this.showAddNewTreatmentModal = false
             this.showcreatepaymentModal = false
         },
         hour: function(date){
             return formatHour(date)
         }
  
      },
      computed: {
          ...mapState({
                transactionInfo: state=> state.transaction.transactionInfo
          }),
          ...mapGetters('transaction',[
                'topTeeth',
                'BottomTeeth',
          ]),
          dDate: {
              get: function(){
                  return formatBdayDate(this.transactionInfo.transactionDate)
              }
          },
          Status: {
              get: function(){
                  return this.getStatus(this.transactionInfo.status)
              }
          },
          Age: {
              get: function(){
                  return calculateAge(this.transactionInfo.User.bday)
              }
          },
          getTotalAmount: {
              get: function(){
                  let amount = 0
                  this.transactionInfo.Treatments.forEach((treatment)=>{
                      amount = amount + parseFloat(treatment.amount)
                  })

                  return amount
              }
          }
      },
      async mounted(){
       this.$store.dispatch("activenav","patientnav")
       await this.getTransaction(this.$route.params.idno)

      },
      components: {
          addEventModal,
          editActionModal,
          editStatusModal,   
          createPrescriptionModal,
          editPrescriptionModal,
          addNewTreatmentModal,
          createPaymentModal
      }

}
</script>

<style scoped>

    .teeth {
        text-align:center;
        cursor:pointer;
        position: relative;
    }

    .teeth > .teethorder {
        position:absolute;
        left: 2%;
    }
</style>