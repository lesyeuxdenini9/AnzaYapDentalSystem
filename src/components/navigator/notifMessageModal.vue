<template>
        <div class="modal" ref="bankModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fa fa-envelope"></span> Notification Message</h5>
                    <button type="button" class="close" @click="closethis()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                            <h3>{{notifdata.message}}</h3>
                            <hr/>
                            <small>{{dateandTime}}</small>

          
                </div>

                <div class="modal-footer">
                
                </div>
                </div>
            </div>
            </div>
</template>

<script>
import { formatBdayDate, format12Hour } from '@/helper/helper'
export default {

    props: {
        notifdata: {
            type: Object,
            required: true,
        }
    },
    data: function(){
         return {
            errormsg: [],
         }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
          //  this.$store.dispatch("notification/getPendingNotification",{admin: 0})
        },

    },
    computed: {
        dateandTime: {
            get: function(){
                return `${formatBdayDate(this.notifdata.createdAt)} ${format12Hour(this.notifdata.createdAt)}`
            }
        }
    },
    mounted(){
      this.$store.dispatch("notification/messageMarkasRead",this.notifdata.id)
    }
}
</script>
