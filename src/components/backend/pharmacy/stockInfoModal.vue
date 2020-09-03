<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-info"></span> Stock Info</h5>
                    <button @click="closethis()" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                     <input ref="stock" style="font-size: 16pt;" v-model="refno" type="text" class="form-control" placeholder="Stock Reference No"/>

                    <table class="table table-condensed table-striped">
                        <tbody>
                            <tr>
                                <td>MEDICINE:</td>
                                <td>{{med.medicine}}</td>
                            </tr>
                             <tr>
                                <td>BRAND:</td>
                                <td>{{med.brand}}</td>
                            </tr>
                            <tr>
                                <td>CODE:</td>
                                <td>{{med.code}}</td>
                            </tr>
                            <tr>
                                <td>DESCRIPTION:</td>
                                <td>{{med.des}}</td>
                            </tr>
                        </tbody>
                    </table>
                      

                            <table class="table table-condensed">
                        <tbody>
                            <tr>
                                <td>STOCK REF NO:</td>
                                <td>{{stockinfo.refno}}</td>
                            </tr>
                             <tr>
                                <td>SUPPLIER:</td>
                                <td>{{stockinfo.manufacturer}}</td>
                            </tr>
                            <tr>
                                <td>INVOICE REF NO:</td>
                                <td>{{stockinfo.invoiceRefno}}</td>
                            </tr>
                            <tr>
                                <td>EXPIRATION DATE:</td>
                                <td>
                                    <span v-if="stockinfo.Stockinitems.length == 0"></span>
                                    <span v-else>{{formatBdayDate(stockinfo.Stockinitems[0].ExpirationDate)}}</span>
                                </td>
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

export default {
    props: {
        med: {
            type: Object,
            required: true
        }
    },
    data: function(){
        return {
            refno: "",
            doneTypingInterval: 1000,
            typingTimer: '',
        }   
    },
    watch: {
        refno: function(newval){
            clearTimeout(this.typingTimer)

            if(newval.length > 0){
                this.typingTimer = setTimeout(()=>{
                 this.$store.dispatch("medicine/stockinfo",{refno: this.refno,  medid: this.med.id})
                    // proceed search here
                },this.doneTypingInterval)
            }else{
                 this.$store.state.medicine.stockInfo = {Stockinitems: [],}
            }
        }
    },
    computed: {
        ...mapState({
            stockinfo: state=> state.medicine.stockInfo
        })
    },
    methods: {
        formatBdayDate: function(date){
            return this.$helper.formatBdayDate(date)
        },
        closethis: function(){
           this.$emit("closemodal")
        }
  
    },

    mounted(){ 
        this.$nextTick(()=>{
             this.$refs.stock.focus()
              this.$store.state.medicine.stockInfo = {Stockinitems: [],}
        })
    },
 
}

</script>