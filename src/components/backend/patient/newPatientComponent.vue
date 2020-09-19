<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-user"></i> Register New Patient</span>
                 <hr/>
                <div class="row">
                <div class="col col-md-8">
                    <div class="card">
                      
                        <div class="card-body">
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
                                        <label>Email Address</label>
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

                            
                             <div class="col-md-4">
                                <div class="form-group">
                                        <label>Gender</label>
                                        <select class="form-control" v-model="staff.gender">
                                                <option>Male</option>
                                                <option>Female</option>
                                        </select>
                                </div>
                            </div>

                             <div class="col-md-8">
                                <div class="form-group">
                                        <label>Address</label>
                                        <input type="text" class="form-control" v-model="staff.address"/>
                                </div>
                            </div>


                        </div>


                               <div class="row">

                            
                             <div class="col-md-12">
                                <div class="form-group">
                                        <label>Medical History</label>
                                        <textarea type="text" class="form-control" v-model="staff.history"/>
                                </div>
                            </div>


                        </div>


                          <span>Note: Default password for the portal will be lastname_password ex. delacruz_password</span>
                          <button class="btn btn-primary float-right" @click="save"><span class="fa fa-check"></span> Save</button>

                        </div>

                    </div>
                </div>
                </div>

        </div>
  
    </div>
</template>

<script>

export default {
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
                usertype: 2,
                gender: 'Male',
                history: '',
            },
             errormsg: [],
        }
    },
    methods: {
        save: function(){
            this.$store.dispatch('user/addpatient',this.staff)
             .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                       // this.$store.dispatch('staff/getStaffList',{usertype: 1})
                       alert("New patient successfully registered!")
                        this.$refs.errormessage.classList.remove("show")
                        this.errormsg = []
                        this.staff = {
                                        fullname: '',
                                        employeeNo: '',
                                        bday: '',
                                        contact: '',
                                        email: '',
                                        address: '',
                                        usertype: 2,
                                    }
                        this.$router.push({name: 'patientinfo',params: {idno: res.data.id}})

                    }
            })
            .catch(err=>console.log(err))
        }
    },
    mounted(){
    this.$store.dispatch("activenav","patientnav")
    }
}
</script>