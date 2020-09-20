<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-user-lock"></span> New Superadmin</h5>
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
                                        <label>Employee No</label>
                                        <input type="text" class="form-control"  v-model="staff.employeeNo"/>
                                </div>
                            </div>

                        </div>

                        <div class="row">
                                <div class="col-md-12">
                                <div class="form-group">
                                        <label>Address</label>
                                        <input type="text" class="form-control"  v-model="staff.address"/>
                                </div>
                            </div>
                        </div>

     


                </div>  
                 <span>Note: Default password is password</span>
                <div class="modal-footer">
                   
                    <button class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Save</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>
export default {
    props: {

    },
    data: function(){
        return {
            staff: {
                fullname: '',
                firstname: '',
                middlename: '',
                lastname: '',
                employeeNo: '',
                bday: '',
                contact: '',
                email: '',
                address: '',
                usertype: 3 ,
                gender: 'Male',
                history: '',
            },
             errormsg: [],
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },
        save: function(){
           this.$store.dispatch("user/saveuser_superadmin",this.staff)
             .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                       // this.$store.dispatch('staff/getStaffList',{usertype: 1})
                        this.closethis()
                          this.$swal("New Superadmin has been added","","success")
                        this.$emit("refreshlist")
                    }
            })
            .catch(err=>console.log(err))
        }
    },
    computed: {
 
    },
    mounted(){
        
    }
}
</script>