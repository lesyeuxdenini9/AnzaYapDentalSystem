<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-plus"></span> New Stocks</h5>
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
                                <div class="col-md-6">
                                         <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Date</span>
                                      </div>
                                      <input type="date" class="form-control" v-model="stock.date"/>
                                  </div>

                                </div>

                                <div class="col-md-6">
                                         <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Supplier</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="stock.supplier"/>
                                  </div>

                                </div>
                            </div>

                               <div class="row">
                                <div class="col-md-6">
                                         <div class="input-group mb-3">
                                      <div class="input-group-prepend">
                                          <span class="input-group-text" id="basic-addon3">Invoice Ref No</span>
                                      </div>
                                      <input type="text" class="form-control" v-model="stock.invoiceRef"/>
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

                                 <table class="table table-condensed">
                                    <thead>
                                        <tr>
                                            <th style="width:30%">Item <span style="color:maroon;">*</span></th>
                                            <th>Qty</th>
                                            <th>Unit of Measurement</th>
                                            <th>Expiration Date</th>
                                            <th style="width:20%;"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in stock.items" :key="index">
                                            <td>
                                                <span v-if="item.id > 0">{{item.medicine}}</span>
                                            </td>
                                            <td><input @change="changeqty(index)" type="number" class="form-control" v-model="item.qty"/></td>
                                            <td>{{item.uom}}</td>
                                            <td><input type="date" class="form-control" v-model="item.expirationDate"/></td>
                                            <td style="text-align:right;"><button @click="removeitem(index)"><span class="fa fa-times"></span> </button></td>
                                        </tr>
                                    </tbody>
                                </table>

                </div>

                <div class="modal-footer">
                    <button class="btn btn-primary" @click="save"><span class="fa fa-check"></span> Save</button>
                </div>
                </div>
            </div>
            </div>
</template>

<script>
import Select2 from 'v-select2-component'
export default {
    components: {
        Select2,
    },
    props: {
        branch: {
            type:Object,
            required: true,
        },
        type: {
            type: Number,
            required: true,
        }
    },
    data: function(){
        return {
             errormsg: [],
             stock: {
                 date: '',
                 supplier: '',
                 invoiceRef: '',
                 items: [],
                 branch: this.branch.id,
                 isPharmacy: this.type,
             },
            ph: "Select Item From Inventory",
            myValue: '',
     
        }
    },
    methods: {
        changeqty: function(index){
            let qty = this.stock.items[index].qty

            if(qty <= 0) this.stock.items[index].qty = 1
        },
        closethis: function(){
            this.$emit("closemodal")
        },
         removeitem: function(index){
            this.stock.items.splice(index,1)
        },
        add:function(){
            let item = {
                id: this.branch.Medicines[this.myValue].id,
                qty: 1,
                medicine: `${this.branch.Medicines[this.myValue].medicine} ( ${this.branch.Medicines[this.myValue].brand} )`,
                uom: this.branch.Medicines[this.myValue].uom,
                // expirationDate: this.$helper.formatDate(new Date())
                expirationDate: '',
            }

            if(this.stock.items.length == 0){
                this.stock.items.push(item)
            }else{
                    let duplicate = 0
                    for(let x = 0 ; x < this.stock.items.length; x++){
                            if(this.stock.items[x].id == item.id ){
                            duplicate = 1
                            break
                        }  

                    
                    }
                if(duplicate==0)  this.stock.items.push(item)
            }

                this.myValue = ''

            
        },
        save: function(){
            this.$store.dispatch('medicine/addstock',this.stock)
                   .then((res)=>{
                   if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                       // this.$store.dispatch('staff/getStaffList',{usertype: 1})
                        this.closethis()
                        this.$swal('New stocks has been added','','success')
                        this.$emit("init")
                    }
            })
            .catch(err=>console.log(err))

        }
    },
     computed: {
         serviceOptions: {
                get: function(){
                    let x = -1
                    return  this.branch.Medicines.map((med)=>{
                        x++
                        return {id: x , text: `${med.medicine} ( ${med.brand} )`} 
                    
                    })

                }
            },
    },
     mounted(){
         let datenow = new Date()
         this.stock.date = this.$helper.formatDate(datenow)
    }
}
</script>