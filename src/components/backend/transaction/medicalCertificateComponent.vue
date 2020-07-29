<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <!-- <span class="pageheader noprint"><i class="fa fa-file-alt"></i> Medical Certificate</span> -->
                   <button type="button" @click="back()" class="noprint float-left"><span class="fa fa-arrow-left"></span> Back</button>
                      <button type="button" @click="print()" class="noprint float-right"><span class="fa fa-print"></span> Print</button>
                    <hr class="noprint"/>

                    
                    <div class="card" style="border:none;box-shadow:none !important;">
                        <div class="card-body" style="padding: 10px 5%;">
                                   <div style="text-align:center;margin-bottom: 50px;position:relative;">
                                    
                                            <span style="text-align:center;font-size:28pt; font-weight:bold;"><span style="color:#4167D6">Anza</span>-<span style="color:orange;">Yap</span> <span style="color:#083D55">Dental Clinic</span>
                                            <span style="font-weight:bold;font-size:22pt;"> - {{transactionInfo.Branch.branch}}</span>
                                            </span>
                                            <br/>
                                <small>{{transactionInfo.Branch.address}} ( Contact No: {{transactionInfo.Branch.contact}} Email Address: {{transactionInfo.Branch.email}} )</small>
                                <br/>
                                <small>VAT Reg. TIN: {{transactionInfo.Branch.tin}}</small>
                                </div>
                  <div style="text-align:center;margin-bottom:10px;font-size: 14pt;"><span style="font-size: 1.5em;font-weight:bold;">MEDICAL CERTIFICATE</span></div>
                            <hr/>
                            <span class="medmessage">To whom it may concern: </span>
                            <br/>
                            <div style="margin: 30px 0px;">
                            <span class="medmessage" style="margin-left: 4rem;">This is to certify that Mr. / Mrs. / Ms. <strong>{{transactionInfo.User.fullname}}</strong>
                                was examined / treated at Anza - Yap Dental clinic ({{transactionInfo.Branch.branch}}) on {{formatBdayDate(transactionInfo.transactionDate)}}.
                            </span>

                            </div>
                            <hr/>
                            
                            <span class="medmessage">TREATMENTS</span>

                            <table class="table table-condensed">
                                    <thead>
                                        <tr>    
                                            <th style="width: 15%;"><span class="medmessage">#</span></th>
                                            <th><span class="medmessage">Treatment</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(treatment,index) in transactionInfo.Treatments" :key="index">
                                            <td> <span class="medmessage">{{index+1}}</span></td>
                                            <td> <span class="medmessage">{{treatment.service}}</span></td>
                                        </tr>
                                    </tbody>
                            </table>
                            
                            <br/>
                         <span class="medmessage">REMARKS: {{transactionInfo.medRemarks}}</span>
                         <textarea @change="updateremarks()" class="form-control noprint" v-model="transactionInfo.medRemarks"></textarea>
                          <div style="margin: 30px 0px;">
                            <span class="medmessage" style="margin-left: 4rem;">This was issued upon the request of Mr. / Mrs. / Ms. <strong>{{transactionInfo.User.fullname}}</strong>
                               for whatever purpose it may serve.
                            </span>

                            </div>

                            <div style="margin-top: 120px">
                                      <span class="medmessage">Dentist : {{transactionInfo.Dentist.fullname}}</span><br/>
                                       <span class="medmessage">Lic No : {{transactionInfo.Dentist.licence}}</span><br/>
                                        <span class="medmessage">PTR : {{transactionInfo.Dentist.ptr}}</span><br/>
                            </div>
                        
                        </div>
                    </div>
                  
        </div>
  
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatBdayDate } from "@/helper/helper"
export default {
    data: function(){
        return {
            doneTypingInterval: 500,
            typingTimer: '',
        }
    },
    watch: {
        'transactionInfo.medRemarks': function(newval,oldval){
             clearTimeout(this.typingTimer)
             if(newval != oldval){
                this.typingTimer = setTimeout(()=>{
                  this.$store.dispatch("transaction/saveMedRemarks",{message: newval , id: this.$route.params.idno})
                    // proceed search here
                },this.doneTypingInterval)
             }
           
      
        }
    },
    methods: {
        ...mapActions('transaction',[
            'getTransaction'
        ]),
        print: function(){
            window.print()
        },
        back: function(){
            this.$router.go(-1)
        },
        formatBdayDate: function(date){
            return formatBdayDate(date)
        },
    },
    computed: {
          ...mapState({
                transactionInfo: state=> state.transaction.transactionInfo
          }),

    },
    async mounted(){
        this.$store.dispatch("activenav","patientnav")
        await this.getTransaction(this.$route.params.idno)
    }
}
</script>

<style lang="css" scoped>
    .medmessage {
        font-size: 20pt;
    }

    small {
        font-size:12pt;
    }
</style>