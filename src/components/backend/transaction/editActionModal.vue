<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-pen"></span> Edit Action</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <h5>Choose Affected part(s)</h5>
                    <table class="table table-bordered">
                                    <tr>
                                        <td v-if="toothType == 0" colspan="8" style="text-align:center;font-weight:bold;">UPPER RIGHT JAW TEETH</td>
                                        <td v-if="toothType == 0"  colspan="8" style="text-align:center;font-weight:bold;">UPPER LEFT JAW TEETH</td>
                                        <td v-if="toothType == 1" colspan="5" style="text-align:center;font-weight:bold;">UPPER RIGHT JAW TEETH</td>
                                        <td v-if="toothType == 1"  colspan="5" style="text-align:center;font-weight:bold;">UPPER LEFT JAW TEETH</td>
                                    </tr>
                                    <tr>
                                        <td :ref="`tooth_${tooth.id}`" @click="selectAffected(tooth.id)" v-for="(tooth,index) in topT" :key="index" class="teeth"><span class="teethorder">
                                            {{tooth.orderNo}}</span>
                                            <img  v-if="toothType == 0" :src="`${apiUrl}/public/images/permanent/top_${tooth.orderNo}.PNG`" style="height:30px;width:30px;"/>
                                             <img  v-else :src="`${apiUrl}/public/images/primary/top_${tooth.orderNo}.PNG`" style="height:30px;width:30px;"/>
                                        </td>
                                    </tr>
                                     <tr>
                                        <td :ref="`tooth_${tooth.id}`" @click="selectAffected(tooth.id)" v-for="(tooth,index) in botT" :key="index" class="teeth"><span class="teethorder">{{tooth.orderNo}}</span>
                                          <img  v-if="toothType == 0" :src="`${apiUrl}/public/images/permanent/low_${tooth.orderNo}.PNG`" style="height:30px;width:30px;"/>
                                         <img  v-else :src="`${apiUrl}/public/images/primary/low_${tooth.orderNo}.PNG`" style="height:30px;width:30px;"/>
                                        </td>
                                    </tr>

                                      <tr>
                                        <td v-if="toothType == 0" colspan="8" style="text-align:center;font-weight:bold;">LOWER RIGHT JAW TEETH</td>
                                        <td v-if="toothType == 0"  colspan="8" style="text-align:center;font-weight:bold;">LOWER LEFT JAW TEETH</td>
                                        <td v-if="toothType == 1" colspan="5" style="text-align:center;font-weight:bold;">LOWER RIGHT JAW TEETH</td>
                                        <td v-if="toothType == 1"  colspan="5" style="text-align:center;font-weight:bold;">LOWER LEFT JAW TEETH</td>
                                    </tr>
                             
                                </table>
                    

                                  <div class="form-group">
                                        <label>Diagnosis</label>
                                        <textarea class="form-control" v-model="action.diagnosis"/>
                                    </div>

                                     <div class="form-group">
                                        <label>Action Taken</label>
                                        <textarea class="form-control" v-model="action.actiontaken"/>
                                    </div>



                                        <div v-if="showeditMedicineused" style="border: 4px solid dimgray;padding:10px;margin: 40px 0px;">  
                                                        <span style="color:dimgray;font-weight:bold;font-size:16pt">Medicine(s) / Item(s) Used</span>    
                                                        <button @click="showeditMedicineused = false" class="float-right"><span></span> Close</button>
                                                        <div class="row" style="margin-top:20px;">
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
                                                                <div class="col-md-12">
                                                                            <table class="table table-condensed">
                                                            <thead>
                                                                <tr>
                                                                    <th style="width:30%">Medicine</th>
                                                                    <!-- <th>Remaining Stocks</th> -->
                                                                    <th>Quantity</th>
                                                                    <th>Unit of Measurement</th>
                                                                    <th style="width:20%;"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="(item,index) in action.Stockouts" :key="index">
                                                                    <td>
                                                                        <span>{{item.Medicine.medicine}}</span>
                                                                    </td>
                                                                    <!-- <td>{{item.Medicine.stocks}}</td> -->
                                                                    <td><input @change="changeqty(index)" type="number" class="form-control" v-model="item.qty"/></td>
                                                                    <td>{{item.Medicine.uom}}</td>
                                                                    <td style="text-align:right;"><button @click="removeitem(index)"><span class="fa fa-times"></span> </button></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                                </div>
                                                            </div>
                                        </div>

                                            <div v-else style="border: 4px solid dimgray;padding:10px;margin: 40px 0px;">  
                                                   <span style="color:dimgray;font-weight:bold;font-size:16pt">Medicine(s) / Item(s) Used</span>    
                                                    <button @click="showeditMedicineused = true" class="float-right"><span></span> Edit</button>

                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                            <table class="table table-condensed">
                                                            <thead>
                                                                <tr>
                                                                    <th style="width:30%">Medicine</th>
                                                                    <!-- <th>Remaining Stocks</th> -->
                                                                    <th>Quantity</th>
                                                                    <th>Unit of Measurement</th>
                                                              
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="(item,index) in action.Stockouts" :key="index">
                                                                    <td>
                                                                        <span>{{item.Medicine.medicine}}</span>
                                                                    </td>
                                                                    <!-- <td>{{item.Medicine.stocks}}</td> -->
                                                                    <td>{{item.qty}}</td>
                                                                    <td>{{item.Medicine.uom}}</td>
                                                                    
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                                </div>
                                                            </div>

                                            </div>

                                    
                                    <div class="row">
                                        <div class="col col-md-4">
                                            <div class="form-group">
                                                <label>Date</label>
                                                <input type="date" v-model="action.date" class="form-control" />
                                            </div>
                                        </div>

                                            <div class="col col-md-4">
                                            <div class="form-group">
                                                <label>Start Time</label>
                                                <input type="time" class="form-control" v-model="action.starttime"/>
                                            </div>
                                        </div>

                                            <div class="col col-md-4">
                                            <div class="form-group">
                                                <label>End Time</label>
                                                <input type="time" class="form-control" v-model="action.endtime"/>
                                            </div>
                                        </div>
                                    </div>
                        

                               <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <span v-for="(error,index) in errormsg" :key="index">
                                   <span v-for="(msg,index2) in error" :key="index2">{{msg}}<br v-if="msg.length > 1"/></span>
                            </span>
                           
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
import Select2 from 'v-select2-component'
import  { formatHour } from "@/helper/helper"
import { mapState , mapActions } from "vuex"
export default {
        components: {
            Select2
        },
        props: {
                 toothType: {
                type: Number,
                required: true
            },
            editActionInfo: {
                type: Object,
                required: true,
            },
            topT: {
                type: Array,
                required: true,
            },
            botT: {
                type: Array,
                required: true,
            },
            transactID: {
                type: Number,
                required: true,
            },
             branchid: {
                type: Number,
                required: true
            }
        },
        data: function(){
            return {
                action: JSON.parse(JSON.stringify(this.editActionInfo)),
                affectedparts: [],
                errormsg: [],
                apiUrl: this.$store.state.apiUrl,
                ph: "Select Medicine From Pharmacy Inventory",
                myValue: '',
                showeditMedicineused: false,
            }
        },
         methods: {
             ...mapActions('medicine',[
                'getList',
            ]),
             changeqty: function(index){
                let qty = this.action.Stockouts[index].qty

                if(qty <= 0) this.action.Stockouts[index].qty = 1
                this.action.Stockouts[index].transactID = this.transactID
                this.$store.dispatch("transaction/updateMedicineused",this.action.Stockouts[index])
                    .then((res)=>{     
                        this.action.Stockouts[index].Medicine.stocks = res.data.stocks
                         this.getList({branch: this.branchid, type: 0})
                    })
                    .catch(err=>console.log(err))
            },
            removeitem: function(index){
                      this.$swal({
                        title: 'Remove this?',
                        text: "",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes!'
                    }).then((result) => {
                        if (result.value) {
                         this.$store.dispatch("transaction/removeMedicineused",{info: this.action.Stockouts[[index]], transactID: this.transactID})
                            .then(()=>{
                                 this.action.Stockouts.splice(index,1)
                                 this.getList({branch: this.branchid, type: 0})
                            })
                            .catch(err=>console.log(err))
                        
                        }
                    })
              
            },
            add:function(){

                    let duplicate = this.action.Stockouts.filter((stock)=>{
                        if(this.medicines[this.myValue].id == stock.medicineId) return stock
                    })

                    if(duplicate.length==0){
                        let data = {
                            medicineId: this.medicines[this.myValue].id,
                            transactID: this.transactID,
                            actionId: this.action.id
                        }
                        this.$store.dispatch("transaction/addMedicineused",data)
                            .then((res)=>{
                                console.log(res)
                                this.action.Stockouts.push(res.data)
                                 this.getList({branch: this.branchid, type: 0})
                            }).catch(err=>console.log(err))
                    }

                    
                },
            closethis: function(){
                this.$emit("closemodal")
            },
            selectAffected: function(id){
                let tooth = this.$refs[`tooth_${id}`][0]
                if(tooth.style.background == "silver"){
                    tooth.style.background = "white"
                    let index = this.affectedparts.indexOf(id)
                    this.affectedparts.splice(index,1)        
                }else{
                    tooth.style.background = "silver" 
                    this.affectedparts.push(id)
                }
            },
            save: function(){
                    this.action.affectedparts = this.affectedparts
                    this.action.transactID = this.transactID
                    this.$store.dispatch("transaction/actionUpdate",this.action)
                        .then((res)=>{
                               if(res.data.errors){
                                    this.errormsg = res.data.errors
                                    this.$refs.errormessage.classList.add("show")
                                }else{
                                    this.closethis()
                                }
                        })
                        .catch(err=>console.log(err))
            }
         },
         computed: {
                serviceOptions: {
                    get: function(){
                        let x = -1
                        return  this.medicines.map((med)=>{
                            x++
                            return {id: x , text: `${med.medicine} Remaining Stocks: ${med.stocks} ${med.uom}`} 
                        
                        })

                    }
                },
                ...mapState({
                    medicines: state => state.medicine.medicines
                }),
         },
         mounted(){
            this.action.teeths.forEach((tooth)=>{
                 this.selectAffected(tooth.id)
            })

            this.action.starttime = formatHour(this.action.starttime) 
            this.action.endtime = formatHour(this.action.endtime) 
            this.getList({branch: this.branchid, type: 0})
         }
}
</script>

<style scoped>
    .teeth:hover {
        background: mistyrose;
    }

    .teeth {
        text-align:center;
        cursor:pointer;
        position: relative;
    }

    .teeth > .teethorder {
        position:absolute;
        left: 2%;
    }
</style>