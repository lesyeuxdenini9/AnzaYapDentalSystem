<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
            
                <div class="modal-body">
                      <button type="button" class="close" style="position:absolute;right:0;font-size:24pt;cursor:pointer;color:black !important;" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="card" id="logindiv">
                       
                    <div class="card-body" style="position:relative;">
                         <span class="fa fa-user-circle" id="truckIcon"/>
                        <div style="text-align:center">
                        <span id="systemTitle"> Anza-Yap Dental Clinic </span>
                      
                        </div>
                              <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <span v-for="(error,index) in errormsg" :key="index">
                                   <span v-for="(msg,index2) in error" :key="index2">{{msg}}<br v-if="msg.length > 1"/></span>
                            </span>
                           
                            </div>
                        <div class="form-group" style="margin-top: 20px;">     
                         <input type="text" class="form-control" placeholder="email address" v-model="user.email"/>
                         </div>
                          <div class="form-group">
                        <input type="password" class="form-control" placeholder="password" v-model="user.password"/>
                          </div>
                        <button class="btn btn-primary form-control" @click="login">Login</button>
                        <hr/>
                        <span @click="showforgot==true ? showforgot=false : showforgot= true" style="cursor:pointer">Forgot Your password?</span>
                   
                        <div v-if="showforgot">
                                 <hr/>
                             <div class="form-group">
                        <input type="text" class="form-control" placeholder="email address" v-model="resetemail"/>
                          </div>
                        <button @click="sendResetRequest()" class="btn btn-primary form-control">Send Reset Password Request</button>
                        </div>

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
              user: {
                email: "",
                password: "", 
                loginsource: "web",
            },
             errormsg: [],
             showforgot: false,
             resetemail: "",
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },
        login: function(){
       
             this.$store.dispatch('login',this.user).then((res)=>{
                if(res.data.errors){
                      this.errormsg = res.data.errors
                      this.$refs.errormessage.classList.add("show")
                }else{
                    this.$emit("logincomplete",res)
                }
                
                    
             }).catch((err)=>{
                 if(err.response.status == 401 && err.response.data.msg){
                      this.errormsg = err.response.data.msg
                      this.$refs.errormessage.classList.add("show")
                 }

                 if(err.response.status == 500){
                    this.$swal(`${err.response.data.name}`,'Please check your database connection','error')
                 }
             })

        },
        sendResetRequest: function(){
                this.$store.dispatch('sendreset',{email: this.resetemail}).then((res)=>{
                if(res.data.errors){
                      this.errormsg = res.data.errors
                      this.$refs.errormessage.classList.add("show")
                }else{
                    this.$swal(`${res.data.msg}`,'',res.data.type)             
                    if(res.data.msg == "Check Reset link in your email") this.closethis()  
                }
                
                    
             }).catch((err)=>{
                 if(err.response.status == 401 && err.response.data.msg){
                      this.errormsg = err.response.data.msg
                      this.$refs.errormessage.classList.add("show")
                 }
             })
        }
    }
}
</script>


<style scoped>
 #logindiv {
        /* position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%); */
        border:none;
        padding:0;
        margin:0;
        box-sizing: border-box;
        box-shadow:none !important;
    }

    #systemTitle {
        font-size: 2rem;
    }
    
    #truckIcon {
        position:absolute;
        /* top:-15%; */
        font-size: 3rem;
        left: 50%;
        transform: translate(-50%,-150%);
    }

</style>
