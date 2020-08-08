<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-medkit"></span> Item List</h5>
                    <button @click="closethis()" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
<!--                     
                            {{patient}}
                        {{items}} -->

                           <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">subtotal Amount</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="totalAmount" readonly style="background:white;"/>
                                      </div>

                                      
                                         <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Discount</span>
                                      </div>
                                      <input type="number" class="form-control" v-model="discount"/>
                                      </div>

                                             <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Total Amount</span>
                                      </div>
                                      <input type="number" class="form-control" v-model="finalamount" readonly style="background:white;"/>
                                      </div>


                                         <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Payment</span>
                                      </div>
                                      <input type="number" class="form-control" v-model="payment"/>
                                      </div>

                                         <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Change</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="change" readonly style="background:white;"/>
                                      </div>

                                        <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <span v-for="(error,index) in errormsg" :key="index">
                                   <span v-for="(msg,index2) in error" :key="index2">{{msg}}<br v-if="msg.length > 1"/></span>
                            </span>
                           
                            </div>
                        


                </div>

                <div class="modal-footer">
                    <button @click="proceed()" class="btn btn-primary"><span class="fa fa-check"></span> Proceed</button>
                </div>

               
                </div>
            </div>
            </div>
</template>

<script>

export default {
    props: {
       patient: {
           type: Object,
           required: true,
       },
       items: {
           type: Array,
           required:true,
       },
       totalAmount: {
           type: Number,
           required:true,
       },
       branch: {
           type: Number,
           required: true,
       }
    },
    data: function(){
        return {
             errormsg: [],
             change: 0,
             payment: 0,
             discount: 0,
             finalamount: 0,
        }
    },
    watch: {
        discount: function(newval){
            if(newval < 0) this.discount = 0
            this.finalamount = this.totalAmount - newval
        },
        payment:function(newval){
            this.change = isNaN(parseFloat(newval) - parseFloat(this.finalamount)) ? 0 : (parseFloat(newval) - parseFloat(this.finalamount))
        }
    },
    computed: {
    
    },
    methods: {
        proceed: function(){
            let data = {
                patient: this.patient,
                items: this.items,
                totalAmount: this.finalamount,
                payment: this.payment,
                branch: this.branch,
                discount: this.discount,
            }

            if(parseFloat(this.change) < 0 || parseFloat(this.payment) <= 0){
                this.$swal("Insufficient Payment","","warning")
            }else{
                this.$store.dispatch("transaction/createBillPharmarcy",data)
                    .then((res)=>{
                        if(res.data.errors){
                            this.errormsg = res.data.errors
                            this.$refs.errormessage.classList.add("show")
                        }else{
                            const billid = res.data.data
                            this.closethis()
                            this.$router.push({name: 'invoiceInfo',params: {idno: billid}})
                        }
                    
                    })
                    .catch(err=>console.log(err))
            }
        },
        closethis: function(){
           this.$emit("closemodal")
        }
  
    },

    mounted(){
       this.finalamount = this.totalAmount - this.discount
    },
 
}

</script>