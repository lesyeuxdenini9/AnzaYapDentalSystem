<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-medkit"></span> Item List</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                          <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Search Product</span>
                                      </div>
                                      <input v-model="search" type="text" class="form-control" placeholder=" ... Product Name or Product Code"/>
                                      </div>

                        <div>


                               <div class="row">
                                   <div class="col col-md-12">
                                             <div class="card"  style="height:450px;">
                                                <div class="card-header" style="background:#343A40;padding:0;">
                                                    <table class="table table-condensed" style="margin:0;padding:0;">
                                                        <thead>
                                                            <tr style="color:white;">
                                                                <th style="width: 10%">Code</th>
                                                                <th style="width: 20%">Product</th>
                                                                <th style="width: 25%">Description</th>
                                                                <th style="width: 10%">Price</th>
                                                                <th style="width: 10%">Stocks</th>
                                                                <th style="width: 10%">Uom</th>
                                                                <th style="width: 10%"></th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                                <div class="card-body" style="overflow-y:auto !important;padding: 0;overflow-x:hidden">
                                                    <table class="table table-bordered" style="padding: 0;margin: 0;">
                                                              <tr @dblclick="addtoCart(med)" style="cursor:pointer;" v-for="(med,index) in medicines" :key="index">
                                                                <td style="width: 10%">{{med.code}}</td>
                                                                <td style="width: 20%">{{med.medicine}} ( {{med.brand}} )</td>
                                                                <td style="width: 23%">{{med.description}}</td>
                                                                <td style="width: 10%">{{$helper.roundToDecimal(med.price,2)}}</td>
                                                                <td style="width: 10%">{{$helper.roundToDecimal(med.stocks,2)}}</td>
                                                                <td style="width: 10%">{{med.uom}}</td>
                                                                <td style="text-align:right;width:12%">
                                                                    <button class="form-control" style="margin-bottom:10px;" @click="addtoCart(med)"><span class="fa fa-plus"></span> Add</button>
                                                                    <button class="form-control" @click="viewstockInfo(med)"><span class="fa fa-check"></span>Stock Info</button>
                                                                    
                                                                    </td>
                                                            </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                       
                                          
                                     
                             </div>

                            <!-- {{medicines}} -->
                        </div>

                </div>

               
                </div>
            </div>


            <stockInfoModal v-if="viewStock" :med="med" @closemodal="closemodal"/>
            </div>
</template>

<script>
// import { formatHour } from "@/helper/helper"
import { mapState } from "vuex"
import stockInfoModal from "@/components/backend/pharmacy/stockInfoModal"
export default {
    components: {stockInfoModal},
    props: {
       branch: {
           type: Number,
           required: true,
       }
    },
    data: function(){
        return {
             errormsg: [],
            doneTypingInterval: 1000,
            typingTimer: '',
            search: '',
            viewStock: false,
            med: 0,
            
        }
    },
    watch: {
        search: function(newval){
            clearTimeout(this.typingTimer)
            if(newval.length > 0){
                this.typingTimer = setTimeout(()=>{
                       let data = {
                            search:newval,
                            branch: this.branch,
                            type: 1,
                        }
                 this.$store.dispatch("medicine/search",data)
                    // proceed search here
                },this.doneTypingInterval)
            }else{
                 this.$store.dispatch("medicine/getList",{branch: this.branch,type: 1})
            }
        }
    },
    computed: {
        ...mapState({
          medicines: state => state.medicine.medicines
        })
    },
    methods: {
        closemodal: function(){
            this.viewStock = false
        },
        viewstockInfo: function(med){
            this.viewStock = true
            this.med = med
        },
        closethis: function(){
            this.$emit("closemodal")
        },
        addtoCart: function(med){
            if(med.stocks == 0){
                 this.$swal("No Stocks","","warning")
            }else{
                this.$emit("addtoCart",med)
            }
            
        }
  
    },

    mounted(){
        this.$store.dispatch("medicine/getList",{branch: this.branch,type: 1})
    },
 
}
</script>

<style scoped>
 

</style>