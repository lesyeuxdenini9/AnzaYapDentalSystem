<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-file-alt"></span> Purchase Records</h5>
                    <button @click="closethis()" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                        <div class="row">
                            <div class="col-md-10">
                                <input v-model="refno" type="text" class="form-control" placeholder="Reference Number"/>
                            </div>
                            <div class="col-md-2">
                                <button @click="init" class="btn btn-primary form-control"><span class="fa fa-search"></span> Search</button>
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
                                <tr v-for="(receipt,index) in pharmacyTransactions" :key="index">
                                    <td>{{receipt.billrefNo}}</td>
                                    <td>{{dDate(receipt.createdAt)}}</td>
                                    <td>{{receipt.modifiedBy}}</td>
                                    <td>{{subtotal(receipt.Billitems)}}</td>
                                    <td>{{receipt.discount}}</td>
                                    <td>{{subtotal(receipt.Billitems) - receipt.discount}}</td>
                                    <td>
                                        <a target="_blank" :href="`../pharmacy/sale/invoice/${receipt.id}`">purchase receipt</a>
                                    </td>
                                </tr>
                            
                            </tbody>


                        </table>

                        <div style="text-align:center"><span>Page {{page}}</span></div>

                        <button @click="prev" :disabled="page == 1" class="btn btn-default float-left"><span class="fa fa-arrow-left"></span> Prev</button>
                        <button @click="next" class="btn btn-default float-right">Next <span class="fa fa-arrow-right"></span></button>

                </div>
                </div>
            </div>
            </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        branch: {
            type: Number,
            required: true,
        }
    },
    data: function(){
        return {
             page: 1,
             refno: '',
             limit: 50,
        }
    },
    watch: {
   
    },
    computed: {
        ...mapState({
            pharmacyTransactions: state=> state.transaction.pharmacyTransactions
        })
    },
    methods: {
        prev: function(){
            this.page--
            this.init()
        },
        next: function(){
            this.page++
            this.init()
        },
        init: function(){
            this.$store.dispatch("transaction/getPastListPharmacy",{branch: this.branch , refno: this.refno ,page: this.page, limit: this.limit})
        },
        closethis: function(){
           this.$emit("closemodal")
        },
        dDate: function(date){
            return `${this.$helper.formatDate(date)} ${this.$helper.format12Hour(date)}`
        },
        subtotal: function(items){
           let amount = 0 
            items.forEach((item)=>{
                amount = amount + parseFloat(item.amount)
            })
            return amount
        }
  
    },

    mounted(){
        this.init()
    },
 
}

</script>