<template>
          <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"><span class="fa fa-lock"></span> Change Password</h5>
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


                                <div class="form-group">
                                    <label>New Password</label>
                                    <input type="password" class="form-control" v-model="user.password"/>
                                </div>

                                <div class="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" class="form-control" v-model="user.password_confirmation"/>
                                </div>
                        </div>

                        <div class="modal-footer">
                            <button @click="changepass" class="btn btn-primary"><span class="fa fa-check"></span> Update</button>
                        </div>
                        </div>
                    </div>
                 </div>
</template>

<script>
export default {
    props: {
        changepassData: {
            type: Object,
            required: true,
        }
    },
    data: function(){
        return {
            user: JSON.parse(JSON.stringify(this.changepassData)),
            errormsg: [],
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },
        changepass: function(){
            this.$store.dispatch("user/changepassEmployee",this.user)
             .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                       // this.$store.dispatch('staff/getStaffList',{usertype: 1})
                        this.$swal('Password has been Changed','','success')
                        this.closethis()
                    }
            })
            .catch(err=>console.log(err))
        }
    },
    mounted(){
        this.user.password = ""
        this.user.password_confirmation = ""
    }
}
</script>