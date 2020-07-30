<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-plus"></span> New Transaction</h5>
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
                                 <div class="col col-md-6">
                                    <div class="form-group">
                                        <label>Branch</label>
                                        <select class="form-control" v-model="transaction.branch">
                                            <option v-for="(branch,index) in branches" :key="index" :value="branch.id">{{branch.branch}}</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col col-md-6">
                                    <div class="form-group">
                                        <label>Dentist</label>
                                        <select class="form-control" v-model="transaction.dentistIndex">
                                            <option v-for="(dentist,index) in branches[activeIndexBranch].Dentists" :key="index" :value="index">{{dentist.fullname}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col col-md-6">
                                    <div class="form-group">
                                        <label>Date</label>
                                        <input type="date" class="form-control" v-model="transaction.date"/>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col col-md-10">
                                        <div class="form-group">
                                       
                                       <!-- <Select2 class="formselect" :placeholder="ph" v-model="myValue" :options="myOptions" :settings="{ multiple: true, settingOption: myValue }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" /> -->
                                        <Select2
                                        :placeholder="ph"
                                         v-model="myValue" 
                                        :options="serviceOptions"
                                        />
                                         </div>
                                </div>

                                <div class="col col-md-2">
                                    <button @click="add" style="width:100%;"> <span class="fa fa-plus"></span> Add</button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col col-md-12">
                                    <table class="table table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Service</th>
                                                <th>Amount</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(list,index) in transaction.servicelist" :key="index">
                                                <td>{{list.service}}</td>
                                                <td><input class="form-control" type="number" v-model="list.price" readonly style="background:white;"/></td>
                                                <td><button @click="removeserviceList(index)" style="background:transparent;border:none;color:maroon;"><span class="fa fa-minus"></span> </button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            
                            <div class="row">
                                <div class="col col-md-6">
                                    <div class="form-group">
                                        <label>Start Time</label>
                                       <input type="time" class="form-control" v-model="transaction.Start"/>
                                    </div>
                                </div>

                                <div class="col col-md-6">
                                    <div class="form-group">
                                        <label>Estimated End Time</label>
                                        <input type="time" class="form-control" v-model="transaction.End"/>
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
import { formatDate } from "@/helper/helper"
import Select2 from 'v-select2-component'
import { mapActions, mapState } from 'vuex'
export default {

    data: function(){
        return {
             activeIndexBranch: 0,
             errormsg: [],
             transaction: {
                 branch: '',
                 dentistIndex: -1,
                 dentistname: '',
                 dentistid: '',
                 patient: this.$route.params.idno,
                 date: '',
                 servicelist: [],
                 Start: '',
                 End: '',
             },
            myValue: '',
            myOptions: ['op1', 'op2', 'op3'], // or [{id: key, text: value}, {id: key, text: value}],
            // serviceOptions: [],
            ph: "Service List",
        }
    },
    watch: {
        'transaction.branch': function(newval){
            let branch = this.branches.filter((branch)=>{
                if(branch.id == newval) return branch
            })
            let indexbranch = this.branches.indexOf(branch[0])
            this.activeIndexBranch = indexbranch
        }
    },
    methods: {
        ...mapActions('dentist',[
          'getList',
        ]),
        ...mapActions('service',{
            getService: 'getList',
        }),
        removeserviceList: function(index){
            this.transaction.servicelist.splice(index,1)
        },

        closethis: function(){
            this.$emit("closemodal")
        },
        add: function(){
            let service = {
                id: this.branches[this.activeIndexBranch].Services[this.myValue].id,
                service: this.branches[this.activeIndexBranch].Services[this.myValue].service,
                price: this.branches[this.activeIndexBranch].Services[this.myValue].regularPrice,
            }

            if(this.transaction.servicelist.length == 0){
                this.transaction.servicelist.push(service)
            }else{
                let duplicate = 0
                for(let x = 0 ; x < this.transaction.servicelist.length; x++){
                        if(this.transaction.servicelist[x].id == service.id ){
                        duplicate = 1
                        break
                    }  
                }

                if(duplicate==0)  this.transaction.servicelist.push(service)
            }
     
            this.myValue = ''

        },
        save: function(){
            if(this.transaction.dentistIndex >= 0){
             this.transaction.dentistname = this.dentists[this.transaction.dentistIndex].fullname
             this.transaction.dentistid = this.dentists[this.transaction.dentistIndex].id
            }
         
            this.$store.dispatch('transaction/save',this.transaction)
                   .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                       // this.$store.dispatch('staff/getStaffList',{usertype: 1})
                        this.$swal.fire('Transaction has been created','','success')
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
          dentists: state => state.dentist.dentists,
          services: state => state.service.services,
          branches: state=> state.branch.branches,
        }),
        serviceOptions: {
            get: function(){
                let x = -1
                return  this.branches[this.activeIndexBranch].Services.map((s)=>{
                      x++
                    return {id: x , text: `${s.service} - Price: P ${s.regularPrice}`} 
                  
                })
            }
        }
    },
    mounted(){
        this.transaction.date = formatDate(new Date())
        this.getList()
        this.getService()
        this.$store.dispatch("branch/getListAllInfo").then(()=>{
            this.transaction.branch = this.branches[this.activeIndexBranch].id
        }).catch(err=>console.log(err))
    },
    components: {
        Select2,
    }
}
</script>

<style scoped>
 
</style>