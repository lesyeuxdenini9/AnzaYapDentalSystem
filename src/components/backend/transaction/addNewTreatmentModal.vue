<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-plus"></span> New Treatment</h5>
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
                                <div class="col col-md-12">
                                        <div class="form-group">
                                       
                                       <!-- <Select2 class="formselect" :placeholder="ph" v-model="myValue" :options="myOptions" :settings="{ multiple: true, settingOption: myValue }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" /> -->
                                        <Select2
                                        :placeholder="ph"
                                         v-model="myValue" 
                                        :options="serviceOptions"
                                        />
                                         </div>
                                </div>
                              
                            </div>


                </div>

                <div class="modal-footer">
                    <button class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Create</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>
import Select2 from 'v-select2-component'
import { mapActions, mapState } from 'vuex'
export default {
    props: {
             transactID: {
                type: Number,
                required: true,
            },
            branchId: {
                type: Number,
                required: true,
            }
    },
    data: function(){
        return {
            errormsg: [],
            myValue: '',
            ph: "Service List",
            treatmentInfo: {},
        }
    },

    methods: {
        ...mapActions('service',{
            getService: 'getList',
        }),
     
        closethis: function(){
            this.$emit("closemodal")
        },
      
        save: function(){
            this.treatmentInfo = this.services[this.myValue]
            this.$store.dispatch('transaction/additionalTreatment',{tid: this.transactID, data: this.treatmentInfo})
                   .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                        this.closethis()
                    }
            })
            .catch(err=>console.log(err))
        },
         myChangeEvent(val){
            console.log(val);
        },
        mySelectEvent({id, text}){
            console.log({id, text})
        }
    },
    computed: {
         ...mapState({
          services: state => state.service.services,
        }),
        serviceOptions: {
            get: function(){
                let x = -1
                return  this.services.map((s)=>{
                      x++
                    return {id: x , text: `${s.service} - Price: P ${s.regularPrice}`} 
                  
                })
            }
        }
    },
    mounted(){
        this.getService(this.branchId)
    },
    components: {
        Select2,
    }
}
</script>

<style scoped>
 
</style>