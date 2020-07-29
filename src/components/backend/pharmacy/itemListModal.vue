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
                            <table class="table-scroll small-first-col">
                                <thead>
                                    <tr style="background:dimgray;color:white;">
                                        <th>Code</th>
                                        <th>Product Name</th>
                                        <th>Product Description</th>  
                                        <th>Price</th>
                                        <th>Remaining Stocks</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody class="body-half-screen">
                                    <tr @dblclick="addtoCart(med)" style="cursor:pointer;" v-for="(med,index) in medicines" :key="index">
                                        <td>{{med.code}}</td>
                                        <td>{{med.medicine}}</td>
                                        <td>{{med.description}}</td>
                                        <td>{{med.price}}</td>
                                        <td>{{med.stocks}}</td>
                                        <td style="text-align:right;"><button @click="addtoCart(med)"><span class="fa fa-plus"></span> Add to Cart</button></td>
                                    </tr>  
                                </tbody>

                            </table>

                            <!-- {{medicines}} -->
                        </div>

                </div>

               
                </div>
            </div>
            </div>
</template>

<script>
// import { formatHour } from "@/helper/helper"
import { mapState } from "vuex"
export default {
    props: {
       
    },
    data: function(){
        return {
             errormsg: [],
            doneTypingInterval: 500,
            typingTimer: '',
            search: '',
        }
    },
    watch: {
        search: function(newval){
            clearTimeout(this.typingTimer)
            if(newval.length > 0){
                this.typingTimer = setTimeout(()=>{
                    console.log("proceed")
                    // proceed search here
                },this.doneTypingInterval)
            }else{
                 this.$store.dispatch("medicine/getList")
            }
        }
    },
    computed: {
        ...mapState({
          medicines: state => state.medicine.medicines
        })
    },
    methods: {

        closethis: function(){
            this.$emit("closemodal")
        },
        addtoCart: function(med){
            if(med.stocks == 0){
                alert("No Stocks")
            }else{
                this.$emit("addtoCart",med)
            }
            
        }
  
    },

    mounted(){
        this.$store.dispatch("medicine/getList")
    },
 
}
</script>

<style scoped>
 .container{
  padding: 1rem;
  margin: 1rem;
}
.table-scroll{
  /*width:100%; */
  display: block;
  empty-cells: show;
  
  /* Decoration */
  border-spacing: 0;
  border: 1px solid;
}

.table-scroll thead{
  background-color: #f1f1f1;  
  position:relative;
  display: block;
  width:100%;
  overflow-y: scroll;
}

.table-scroll tbody{
  /* Position */
  display: block; position:relative;
  width:100%; overflow-y:scroll;
  /* Decoration */
  border-top: 1px solid rgba(0,0,0,0.2);
}


.table-scroll tr{
  width: 100%;
  display:flex;
  border: 0.2px solid gray;
}

.table-scroll td,.table-scroll th{
  flex-basis:100%;
  flex-grow:2;
  display: block;
  /* padding: 1rem; */
  text-align:left;
}

.body-half-screen{
  max-height: 50vh;
}

.small-col{flex-basis:10%;}

.table-scroll tbody tr:nth-child(2n){
  background-color: rgba(130,130,170,0.1);
}

</style>