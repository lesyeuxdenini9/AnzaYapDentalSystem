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
                                            <td><input @change="changeactualamount()" type="number" class="form-control" v-model="treatment.actualamount"/></td>
                                        </tr>
                                        <tr style="background:black;padding:10px;color:lime;font-size:16pt;font-weight:bold;">
                                            <td colspan="3" style="text-align:right;">Total Amount:</td>
                                            <td style="text-align:right;">{{totalAmountFinal}}</td>
                                        </tr>
                                    </tbody>

                            </table>

                            <hr/>

                            <div class="row">
                                <div class="col col-md-6">
                                     <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Payment Method</span>
                                      </div>
                                            <select class="form-control" v-model="payment.method">
                                                <option value="0">Cash</option>
                                                <option value="1">HealthCard</option>
                                            </select>
                                      </div>
                                </div>
                            </div>
                            <!-- {{transactionInfo}} -->
           
                        
                             <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <span v-for="(error,index) in errormsg" :key="index">
                                   <span v-for="(msg,index2) in error" :key="index2">{{msg}}<br v-if="msg.length > 1"/></span>
                            </span>
                           
                            </div>



                </div>

                <div class="modal-footer">
                    <button class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Save</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>
export default {
    props: {
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
                 method: ''
             }

        }
    },
    methods: {
        totalAmount: function(){
             let totalamount = 0
                 this.transactionInfo.Treatments.forEach((treatment)=>{
                     if(treatment.checked == 1){
                         totalamount = totalamount + parseFloat(treatment.actualamount)
                     }
                })

        this.totalAmountFinal = totalamount
        },
        changeactualamount: function(){
            this.totalAmount()
        },
        checktreatment: function(index){
            this.transactionInfo.Treatments[index].checked = this.$refs.checkitems[index].checked ? 1 : 0
            this.totalAmount()
        },
        closethis: function(){
            this.$emit("closemodal")
        },
        save: function(){
            this.$store.dispatch('branch/save',this.branch)
                   .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                       // this.$store.dispatch('staff/getStaffList',{usertype: 1})
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
           treatment.actualamount = treatment.amount
           treatment.checked = 0
        })
    }
}
</script>