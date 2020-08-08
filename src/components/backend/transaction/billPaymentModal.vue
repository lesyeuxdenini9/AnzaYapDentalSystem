<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-file-alt"></span> Transaction No {{transactionInfo.transactionNo}}</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                                <div class="row">
                                <div class="col col-md-6">
                                     <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Payment Method</span>
                                      </div>
                                            <select class="form-control billingitem" v-model="payment.method">
                                                <option value="0">Cash</option>
                                                <option value="1">HealthCard</option>
                                            </select>
                                      </div>
                                </div>

                                 <div class="col col-md-6">
                                     <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Amount (Balance)</span>
                                      </div>
                                            <input style="background:mistyrose;" type="text" class="form-control billingitem" readonly v-model="totalAmountBalance"/>
                                                
                                      </div>
                                </div>

                            </div>
                            <div v-if="payment.method == 0">
                                    <div class="row">
                                        <div class="col-md-6">
                                             <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Cash Amount Received</span>
                                      </div>
                                            <input type="number" class="form-control billingitem" v-model="payment.cashpayment"/>
                                                
                                      </div>
                                        </div>

                                        <div class="col-md-6">
                                             <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Change</span>
                                      </div>
                                            <input type="number" class="form-control billingitem" v-model="payment.change" readonly style="background:mistyrose;"/>
                                                
                                      </div>
                                        </div>
                                    </div>

                            </div>
                            <div  v-else>
                                <span style="font-size:14pt;">Please choose Treatment covered by Healthcard . . .</span>
                            <table class="table table-condensed">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Treatment</th>
                                            <th style="width:20%;">Estimated Price</th>
                                            <th style="width:20%;">Actual Price</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="(treatment,index) in transactionInfo.Treatments" :key="index">
                                            <td><input ref="checkitems" @click="checktreatment(index)" style="height:20px;width:20px" type="checkbox"/></td>
                                            <td>{{treatment.service}}</td>
                                            <td>{{treatment.amount}}</td>
                                            <td>{{treatment.actualAmount}}</td>
                                        </tr>
                                        <tr style="background:black;padding:10px;color:lime;font-size:16pt;font-weight:bold;">
                                            <td colspan="3" style="text-align:right;">Total Amount:</td>
                                            <td style="text-align:right;">{{totalAmountFinal}}</td>
                                        </tr>
                                    </tbody>

                            </table>

                            <div class="row">
                                     <div class="col col-md-6">
                                     <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Healthcard Name</span>
                                      </div>
                                            <input  type="text" class="form-control billingitem" v-model="payment.healthcardname"/>
                                      </div>
                                </div>

                                     <div class="col col-md-6">
                                     <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Healthcard No</span>
                                      </div>
                                            <input  type="text" class="form-control billingitem" v-model="payment.healthcardNo"/>
                                      </div>
                                </div>

                                

                            </div>


                                <div class="row">
                                     <div class="col col-md-6">
                                     <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Account Name</span>
                                      </div>
                                            <input  type="text" class="form-control billingitem" v-model="payment.AccountName"/>
                                      </div>
                                </div>

                                     <div class="col col-md-6">
                                     <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Account No</span>
                                      </div>
                                            <input  type="text" class="form-control billingitem" v-model="payment.AccountNo"/>
                                      </div>
                                </div>

                                

                            </div>

                            
                            <div class="row">
                                     <div class="col col-md-6">
                                     <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Treatment Price</span>
                                      </div>
                                            <input  type="text" class="form-control billingitem" v-model="totalAmountFinal" style="background:white" readonly/>
                                      </div>
                                </div>

                                     <div class="col col-md-6">
                                     <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Payment Amount</span>
                                      </div>
                                            <input  type="text" class="form-control billingitem" v-model="payment.hcpaymentTotal"/>
                                      </div>
                                </div>

                                

                            </div>

                            </div>

                            <hr/>

                      
                            <!-- {{transactionInfo}} -->
           
                        
                             <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <span v-for="(error,index) in errormsg" :key="index">
                                   <span v-for="(msg,index2) in error" :key="index2">{{msg}}<br v-if="msg.length > 1"/></span>
                            </span>
                           
                            </div>



                </div>

                <div class="modal-footer">
                    <button class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Create</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>
export default {
    props: {
        totalAmountBalance: {
            type: Number,
            required:true
        },
        transactionInfo: {
            type: Object,
            required: true,
        }
    },
    data: function(){
        return {
             errormsg: [],
             totalAmountFinal: 0,
             payment: {
                 method: '0',
                 hcitems: [],
                 healthcardname: '',
                 healthcardNo: '',
                 AccountNo: '',
                 AccountName: '',
                 hcpaymentTotal: 0,
                 cashpayment: '',
                 change: 0,
             }

        }
    },
    watch: {
        totalAmountFinal: function(newval){
            this.payment.hcpaymentTotal = newval
        },
        'payment.method': function(){
            this.payment.hcitems = []
        },
        'payment.cashpayment': function(newval){
            if(parseFloat(newval) > parseFloat(this.totalAmountBalance)){
                this.payment.change =  parseFloat(newval) - parseFloat(this.totalAmountBalance)
            }else{
                this.payment.change = 0
            }
            
        }
    },
    methods: {
        totalAmount: function(){
             let totalamount = 0
                 this.transactionInfo.Treatments.forEach((treatment)=>{
                     if(treatment.checked == 1){
                         totalamount = totalamount + parseFloat(treatment.actualAmount)
                     }
                })

        this.totalAmountFinal = totalamount
        },
        changeactualamount: function(){
            this.totalAmount()
        },
        checktreatment: function(index){
            this.transactionInfo.Treatments[index].checked = this.$refs.checkitems[index].checked ? 1 : 0
            if(this.$refs.checkitems[index].checked){
                if(this.payment.hcitems.length == 0){
                     this.payment.hcitems.push(this.transactionInfo.Treatments[index].id)
                }else{
                          let findindex =  this.payment.hcitems.indexOf(this.transactionInfo.Treatments[index].id)
                          if(findindex == -1 )this.payment.hcitems.push(this.transactionInfo.Treatments[index].id)
                }
            }else{

                 let findindex = this.payment.hcitems.indexOf(this.transactionInfo.Treatments[index].id)
                this.payment.hcitems.splice(findindex,1)
            }
            this.totalAmount()
        },
        closethis: function(){
            this.$emit("closemodal")
        },
        save: function(){
            this.payment.totalAmountFinal = this.totalAmountFinal
            this.payment.transactID = this.transactionInfo.id
            this.payment.branchId = this.transactionInfo.branchId
            this.payment.userId = this.transactionInfo.userId
            this.payment.customerName = this.transactionInfo.User.fullname
            this.payment.totalAmountBalance = this.totalAmountBalance
            console.log(this.payment)
            this.$store.dispatch('transaction/createBillTreatment',this.payment)
                   .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                       // this.$store.dispatch('staff/getStaffList',{usertype: 1}
                        this.$emit("init")
                        this.closethis()
                       
                    }
            })
            .catch(err=>console.log(err))

        }
    },
    computed: {

    },
    mounted(){
        this.transactionInfo.Treatments.forEach((treatment)=>{
           treatment.checked = 0
        })
    }
}
</script>

<style css>
.billingitem {
    font-size: 20pt;
}

</style>