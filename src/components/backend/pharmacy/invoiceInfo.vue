<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader noprint"><i class="fa fa-file-alt"></i> Invoice No 
                    <router-link :to="{name: 'pharmacySale'}"><button class="float-right"><span class="fa fa-times"></span></button></router-link>
                  </span>
                  
                    <hr/>

        </div>
  
    </div>
</template>

<script>

export default {

    mounted(){
        this.$store.dispatch("activenav","pharmacynav")
    }
}
</script>