<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-edit"></span> Edit Medicine</h5>
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
                                    <div class="col-md-4">
                                        <label>Medicine <span style="color:maroon;">*</span></label>
                                        <input type="text" class="form-control" v-model="medicine.medicine"/>
                                    </div>

                                         
                                      <div class="col-md-4">
                                        <label>Brand <span style="color:maroon;">*</span></label>
                                        <input type="text" class="form-control" v-model="medicine.brand"/>
                                    </div>

                                   <div class="col-md-4">
                                        <label>Description <span style="color:maroon;">*</span></label>
                                        <input type="text" class="form-control" v-model="medicine.description"/>
                                    </div>

                                    
                                    <div class="col-md-4">
                                        <label>Scientific Name</label>
                                        <input type="text" class="form-control" v-model="medicine.scientificName"/>
                                    </div>

                                    
                                    <div class="col-md-4">
                                        <label>Code</label>
                                        <input type="text" class="form-control" v-model="medicine.code"/>
                                    </div>

                                      <div class="col-md-4">
                                        <label>Unit of Measurement <span style="color:maroon;">*</span></label>
                                        <input type="text" class="form-control" v-model="medicine.uom"/>
                                    </div>


                               


                            </div>

                            <div class="row" >

                                
                                      <div class="col-md-4" v-if="medicine.type == 1">
                                        <label>Manufacturer</label>
                                        <input type="text" class="form-control" v-model="medicine.manufacturer"/>
                                    </div>
                                    
                                    <div class="col-md-4" v-if="medicine.type == 1">
                                        <label>Price <span style="color:maroon;">*</span></label>
                                        <input type="number" class="form-control" v-model="medicine.price"/>
                                    </div>


                                       <div class="col-md-4">
                                        <label>Remaining Stocks</label>
                                        <input type="number" class="form-control" v-model="medicine.stocks"/>
                                    </div>

                                        <div class="col-md-4">
                                        <label>Minimum Stocks <span style="color:maroon;">*</span></label>
                                        <input type="number" class="form-control" v-model="medicine.limitMin"/>
                                    </div>

                            </div>

                         

                            <!-- <div class="row">

                                    <div class="col-md-6">
                                        <button class="btn btn-success form-control"><span class="fa fa-plus"></span> Add Stock</button>
                                    </div>

                                          <div class="col-md-6">
                                         <button class="btn btn-danger form-control"><span class="fa fa-minus"></span> Reduce Stock</button>
                                    </div>


                            </div> -->

                            



                </div>

                <div class="modal-footer">
                    <button class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Update</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>
export default {
    props: {
        editInfo: {
            type: Object,
            required: true,
        }
    },
    data: function(){
        return {
             medicine: JSON.parse(JSON.stringify(this.editInfo)),
             errormsg: [],
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },
        save: function(){
             this.$store.dispatch("medicine/update",this.medicine)
             .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                        this.$swal("Medicine info has been updated","","success")
                        this.$emit("init")
                        this.closethis()
                    }
            })
            .catch(err=>console.log(err))

        }
    }
}
</script>