<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-plus"></span> New Branch</h5>
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
                                        <label>Branch <span style="color:maroon;">*</span></label>
                                        <input type="text" class="form-control" v-model="branch.branch"/>
                                    </div>

                                   <div class="col-md-12">
                                        <label>Address <span style="color:maroon;">*</span></label>
                                        <input type="email" class="form-control" v-model="branch.address"/>
                                    </div>

                            </div>

                            <div class="row">
                                    <div class="col-md-12">
                                        <label>Contact</label>
                                        <input type="text" class="form-control" v-model="branch.contact"/>
                                    </div>

                                      <div class="col-md-12">
                                        <label>Email Address</label>
                                        <input type="text" class="form-control" v-model="branch.email"/>
                                    </div>

                            </div>

                            
                            <div class="row">
                                    <div class="col-md-12">
                                        <label>TIN</label>
                                        <input type="text" class="form-control" v-model="branch.tin"/>
                                    </div>

                                       <div class="col-md-12">
                                        <label>VAT</label>
                                        <input type="number" class="form-control" v-model="branch.vat"/>
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
export default {

    data: function(){
        return {
             errormsg: [],
             branch: {
                 branch: '',
                 address: '',
                 contact: '',
                 email: '',
                 tin: '',
                 vat: 12,
             }
        }
    },
    methods: {
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
    }
}
</script>