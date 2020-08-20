<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-user"></span> Change Picture</h5>
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


                              <img :style="imgstyle" :src="img" @click="showuploadfile()"/>
                              <input type="file" style="display:none;" ref="imgupload" accept=".png,.jpg,.jpeg" @change="onFileChange($event)"/>    


                </div>

                <div class="modal-footer">
                    <button v-if="imgfile != null" class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Update</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>

export default {

    props: {
        oldimg: {
            type: String,
            required: true,
        }
    },
    data: function(){
         return {
            errormsg: [],
            imgstyle: {
                height: "200px",
                width: "200px",
            },
           img: `${this.$store.state.apiUrl}/public/images/default.png`,
           imgfile: null,
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },
        save: function(){
            this.$store.dispatch("user/changepic",{imgfile: this.imgfile,oldimg: this.oldimg, convert: 0}).then((res)=>{
               if(res.data.errors){
                   this.errormsg = res.data.errors
                   this.$refs.errormessage.classList.add("show")
               }else{
                   this.closethis()
                   this.$emit("refreshData")
               }
           })
        },
         showuploadfile: function(){
            this.$refs.imgupload.click()
        },
        onFileChange: function(e){
             let files = e.target.files
             
                if(files.length == 0){
                    console.log("empty");
                }else{
                    let reader = new FileReader();
                    reader.onload = (e)=> {
                            this.img = e.target.result
                        }

                        reader.readAsDataURL(files[0]);
                }
                this.imgfile = e.target.files[0]
        },


    },
    mounted(){
      
    }
}
</script>