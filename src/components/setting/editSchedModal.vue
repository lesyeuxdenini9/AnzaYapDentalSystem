<template>
    

                  <div class="modal" ref="changePassModal" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"><span class="fa fa-pen"></span> Update {{editsched.day}} Schedule</h5>
                            <button type="button" class="close" @click="closethis()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <div class="row">
                              <div class="col col-md-12">
                                <div class="form-group">
                                  <label>Active</label>
                                  <select class="form-control" v-model="editsched.active">
                                    <option value="0">No Operation</option>
                                    <option value="1">Active</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            
                            <div class="row" v-show="editsched.active == 1">
                                <div class="col col-md-6">
                                    <div class="form-group">
                                      <label>Start Time</label>
                                      <input type="time" class="form-control" v-model="editsched.start"/>
                                    </div>
                                </div>

                                 <div class="col col-md-6">
                                    <div class="form-group">
                                      <label>End Time</label>
                                      <input type="time" class="form-control" v-model="editsched.end"/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="modal-footer">
                          <button @click="updateSched()" class="btn btn-primary"><span class="fa fa-check"></span> Update</button>
                        </div>

                      
                        </div>
                    </div>
                 </div>
</template>

<script>
export default {
    
    props: {
        editSchedInfo: {
            type: Object,
            required: true,
        }
    },
    data: function(){
        return{
            editsched: JSON.parse(JSON.stringify(this.editSchedInfo))
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },
        updateSched: function(){
            this.$store.dispatch("updateSchedule",this.editsched)
            .then(()=>{
                this.closethis()
                this.$emit("refreshschedule",{index:this.editsched.activeindex,branch: this.editsched.activebranch})
            })
      },
    }
}
</script>