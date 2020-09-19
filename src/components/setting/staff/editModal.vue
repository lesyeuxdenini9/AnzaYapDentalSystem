<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-user"></span> Update User Information</h5>
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

                            
                            <div class="row" v-if="staff.usertype == 0 || staff.usertype == 1">
                                <div class="col-md-8">
                                    <div class="form-group">
                                            <label>Branch Assign <span style="color:maroon;">*</span></label>
                                            <select class="form-control" v-model="staff.branchId">
                                                <option v-for="(branch,index) in branches" :key="index" :value="branch.id">{{branch.branch}}</option>
                                            </select>
                                    </div>
                                </div>

                            </div>

                             <div class="row">
                            <div class="col-md-4">
                                 <div class="form-group">
                                        <label>First name <span style="color:maroon;">*</span></label>
                                        <input type="text" class="form-control" v-model="staff.firstname"/>
                                </div>
                            </div>

                             <div class="col-md-4">
                                 <div class="form-group">
                                        <label>Middle name</label>
                                        <input type="text" class="form-control" v-model="staff.middlename"/>
                                </div>
                            </div>

                             <div class="col-md-4">
                                 <div class="form-group">
                                        <label>Last name <span style="color:maroon;">*</span></label>
                                        <input type="text" class="form-control" v-model="staff.lastname"/>
                                </div>
                            </div>
                        </div>

                                   <div class="row">

                               <div class="col-md-4">
                                <div class="form-group">
                                        <label>Email Address <span style="color:maroon;">*</span></label>
                                        <input type="email" class="form-control" v-model="staff.email"/>
                                </div>
                            </div>

                             <div class="col-md-4">
                                <div class="form-group">
                                        <label>Birthday <span style="color:maroon;">*</span></label>
                                        <input type="date" class="form-control" v-model="staff.bday"/>
                                </div>
                            </div>

                             <div class="col-md-4">
                                <div class="form-group">
                                        <label>Contact No</label>
                                        <input type="text" class="form-control" v-model="staff.contact"/>
                                </div>
                            </div>

                        </div>

                          <div class="row">

                               <div class="col-md-6">
                                <div class="form-group">
                                        <label>Gender</label>
                                        <select type="text" class="form-control" v-model="staff.gender">
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                </div>
                            </div>

                            
                             <div class="col-md-6">
                                <div class="form-group">
                                        <label>Address</label>
                                        <input type="text" class="form-control" v-model="staff.address"/>
                                </div>
                            </div>

                          </div>

                             <div class="row">

                            

                            <div class="col-md-6" v-show="staff.usertype!=2">
                                <div class="form-group">
                                        <label>Employee No</label>
                                        <input type="text" class="form-control"  v-model="staff.employeeNo"/>
                                </div>
                            </div>

                        </div>    

                                <div class="row">

                            <div class="col-md-12" v-show="staff.usertype==2">
                                <div class="form-group">
                                        <label>Medical History</label>
                                        <textarea type="text" class="form-control"  v-model="staff.history"/>
                                </div>
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
import { formatDate } from "@/helper/helper"
export default {
    props: {
        type: {
            type: Number,
            required: true,
        },
        editInfo: {
            type: Object,
            required: true,
        },
        activebranchIndex: {
            type: Number,
            required: true,
        }
    },
    data: function(){
         return {
            staff: JSON.parse(JSON.stringify(this.editInfo)),
            errormsg: [],
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },
        save: function(){
           this.staff.oldemail = this.editInfo.email
           this.$store.dispatch("user/updateUser",this.staff)
             .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                        this.closethis()
                        this.$emit("refreshlist",{index: this.activebranchIndex})
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
        this.staff.bday = formatDate(this.staff.bday)
       // this.$store.dispatch("branch/getListUser",this.type)
    }
}
</script>