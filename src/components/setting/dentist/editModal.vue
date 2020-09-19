<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-edit"></span> Edit Dentist</h5>
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
                                          <select class="form-control" v-model="dentist.branchId">
                                            <option v-for="(branch,index) in branches" :key="index" :value="branch.id">{{branch.branch}}</option>
                                        </select>
                                    </div>

                                    <div class="col-md-12">
                                        <label>Fullname <span style="color:maroon;">*</span></label>
                                        <input type="text" class="form-control" v-model="dentist.fullname"/>
                                    </div>

                                       <div class="col-md-12">
                                        <label>Gender</label>
                                        <select type="text" class="form-control" v-model="dentist.gender">
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>

                                   <div class="col-md-12">
                                        <label>Email Address <span style="color:maroon;">*</span></label>
                                        <input type="email" class="form-control" v-model="dentist.email"/>
                                    </div>

                            </div>

                            <div class="row">
                                    <div class="col-md-6">
                                        <label>Birthday <span style="color:maroon;">*</span></label>
                                        <input type="date" class="form-control" v-model="dentist.bday"/>
                                    </div>

                                      <div class="col-md-6">
                                        <label>Contact No</label>
                                        <input type="text" class="form-control" v-model="dentist.contact"/>
                                    </div>

                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                        <label>Address</label>
                                        <input type="text" class="form-control" v-model="dentist.address"/>
                                </div>

                            </div>

                                  
                            <div class="row">
                                    <div class="col-md-6">
                                        <label>Licence No</label>
                                        <input type="text" class="form-control" v-model="dentist.licence"/>
                                    </div>

                                      <div class="col-md-6">
                                        <label>PTR</label>
                                        <input type="text" class="form-control" v-model="dentist.ptr"/>
                                    </div>

                            </div>





                </div>

                <div class="modal-footer">
                    <button class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Update</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        editInfo: {
            type: Object,
            required: true,
        },
          activebranchIndex: {
            type:Number,
            required: true,
        }
    },
    data: function(){
        return {
             dentist: JSON.parse(JSON.stringify(this.editInfo)),
             errormsg: [],
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },
        save: function(){
            this.dentist.oldemail = this.editInfo.email
             this.$store.dispatch("dentist/update",this.dentist)
             .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
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
        this.$store.dispatch("branch/getListDentist")
    }
}
</script>