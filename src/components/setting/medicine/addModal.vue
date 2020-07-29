<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-plus"></span> New Medicine</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                               <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <span v-for="(error,index) in errormsg" :key="index">
                                   <span v-for="(msg,index2) in error" :key="index2">{{msg}}<br v-if="msg.length > 1"/></span>
                            </span>
                           
                            </div>

                            
                            <div class="row">

                                 <div class="col-md-12">
                                        <div class="form-group">
                                                <label>Branch</label>
                                                <select class="form-control" v-model="medicine.branch">
                                                    <option v-for="(branch,index) in branches" :key="index" :value="branch.id">{{branch.branch}}</option>
                                                </select>
                                        </div>
                                    </div>


                                    <div class="col-md-12">
                                        <label>Medicine</label>
                                        <input type="text" class="form-control" v-model="medicine.medicine"/>
                                    </div>

                                   <div class="col-md-12">
                                        <label>Description</label>
                                        <input type="text" class="form-control" v-model="medicine.description"/>
                                    </div>

                                      <div class="col-md-12">
                                        <label>Unit of Measurement</label>
                                        <input type="text" class="form-control" v-model="medicine.uom"/>
                                    </div>

                                    <div class="col-md-12">
                                        <label>Minimum Stocks</label>
                                        <input type="text" class="form-control" v-model="medicine.limit"/>
                                    </div>


                                    <div class="col-md-12">
                                        <label>Product Code</label>
                                        <input type="text" class="form-control" v-model="medicine.code"/>
                                    </div>

                            </div>

                            <div class="row">
                                    <!-- <div class="col-md-12">
                                        <label>Price</label>
                                        <input type="number" class="form-control" v-model="medicine.price"/>
                                    </div> -->

                                      <div class="col-md-12">
                                        <label>Manufacturer</label>
                                        <input type="text" class="form-control" v-model="medicine.manufacturer"/>
                                    </div>

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
import { mapState } from 'vuex'
export default {
    props: {
        activebranchIndex: {
            type:Number,
            required: true,
        }
    },
    data: function(){
        return {
             errormsg: [],
             medicine: {
                 limit: 0,
                 uom: '',
                 branch: '',
                 medicine: '',
                 description: '',
                 price: 0,
                 manufacturer: '',
                 code: '',
             }
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },
        save: function(){
            this.$store.dispatch('medicine/save',this.medicine)
                   .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                       // this.$store.dispatch('staff/getStaffList',{usertype: 1})
                        this.closethis()
                        this.$emit("refreshlist",this.activebranchIndex)
                    }
            })
            .catch(err=>console.log(err))

        }
    },
     computed: {
        ...mapState({
            branches: state => state.branch.branches
        })
    },
     mounted(){
         this.$store.dispatch("branch/getListMedicine",0)
    }
}
</script>