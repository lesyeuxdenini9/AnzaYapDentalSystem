<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-plus"></span> Create Prescription</h5>
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
                                    <label>Date</label>
                                    <input type="date" class="form-control" v-model="date"/>
                                </div>

                            </div>

                            <div class="col-md-8" style="position:relative;">
                                <img style="position:absolute;right:15px;width:60px;height:60px;" src="@/assets/rx.png"/>
                            </div>

                            </div>

                            <div class="row">

                          <div class="col-md-10" style="display:none;">
                                        <div class="form-group">
                                       
                                       <!-- <Select2 class="formselect" :placeholder="ph" v-model="myValue" :options="myOptions" :settings="{ multiple: true, settingOption: myValue }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" /> -->
                                        <Select2
                                        :placeholder="ph"
                                         v-model="myValue" 
                                        :options="serviceOptions"
                                        />
                                         </div>
                                </div>

                                <div class="col-md-2"  style="display:none;">
                                    <button @click="add" style="width:100%;"> <span class="fa fa-plus"></span> Add</button>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                      <button @click="addnew()" style="width:100%;"><span class="fa fa-plus"></span> Add</button>
                                </div>
                            </div>
                        
                                
                                <table class="table table-condensed">
                                    <thead>
                                        <tr>
                                            <th style="width:30%">Medicine</th>
                                            <th>Qty</th>
                                            <th>Dosage</th>
                                            <th>Days</th>
                                            <th>Remarks</th>
                                            <th style="width:5%;"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in items" :key="index">
                                            <td>
                                                <span v-if="item.id > 0">{{item.medicine}}</span>
                                                <input v-else v-model="item.medicine" class="form-control"/>
                                            </td>
                                            <td><input type="number" class="form-control" v-model="item.qty"/></td>
                                            <td><input type="text" class="form-control" v-model="item.dosage"/></td>
                                            <td><input type="text" class="form-control" v-model="item.days"/></td>
                                            <td><textarea class="form-control" v-model="item.remarks"></textarea></td>
                                            <td style="text-align:right;"><button @click="removeitem(index)"><span class="fa fa-times"></span> </button></td>
                                        </tr>
                                    </tbody>
                                </table>
                             
                        
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
import { mapState , mapActions } from 'vuex'
import { formatDate } from "@/helper/helper"
export default {
        props: {
            transactID: {
                type: Number,
                required: true,
            },
            branchid:{
                type: Number,
                required:true,
            }
        },
        data: function(){
            return {
                errormsg: [],
                ph: "Select Medicine From Pharmacy Inventory",
                items: [],
                myValue: '',
                date: '',
            }
        },
         methods: {
             removeitem: function(index){
                 this.items.splice(index,1)
             },
             ...mapActions('medicine',[
                'getList',
              ]),
            closethis: function(){
                this.$emit("closemodal")
            },
            save: function(){
                    this.$store.dispatch("transaction/createPrescription",{tid: this.transactID, items: this.items , date: this.date})
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
            addnew: function(){
                 let item = {
                    id: 0,
                    qty: 0,
                    medicine: '',
                    amount: 0,
                    dosage: '',
                    days: '',
                    remarks: '',
                }
               this.items.push(item)
            },
            add:function(){
                let item = {
                    id: this.medicines[this.myValue].id,
                    qty: 0,
                    medicine: this.medicines[this.myValue].medicine,
                    amount: parseFloat(this.medicines[this.myValue].price),
                    dosage: '',
                    days: '',
                    remarks: '',
                }

                if(this.items.length == 0){
                    this.items.push(item)
                }else{
                     let duplicate = 0
                      for(let x = 0 ; x < this.items.length; x++){
                                if(this.items[x].id == item.id ){
                                duplicate = 1
                                break
                            }  

                        
                        }
                  if(duplicate==0)  this.items.push(item)
                }

                 this.myValue = ''

             
            }
         },
         computed: {
                 serviceOptions: {
                    get: function(){
                        let x = -1
                        return  this.medicines.map((med)=>{
                            x++
                            return {id: x , text: `${med.medicine}`} 
                        
                        })

                    }
                },
                   ...mapState({
                      medicines: state => state.medicine.medicines
                    }),
         },
         mounted(){
                this.getList({branch: this.branchid, type: 1})
                this.date = formatDate(new Date())
         },
         components: {
                 Select2,
         }
}
</script>
