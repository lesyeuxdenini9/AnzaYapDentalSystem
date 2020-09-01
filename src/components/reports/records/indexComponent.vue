<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-file-alt"></i> Records Search</span>
                    <hr/>

                          <div class="row">

                                <!-- Earnings (Monthly) Card Example -->
                                <div @click="changerecord('record_transactionlist')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-success shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-success text-uppercase mb-1">Transactions</div>
                                        <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">4</div> -->
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-file-alt fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>


                                      <!-- Earnings (Monthly) Card Example -->
                                <div @click="changerecord('dataReservationList')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-info shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-info text-uppercase mb-1">Appointments</div>
                                        <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">4</div> -->
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-file-alt fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                          </div>

                          <hr/>

                            <div class="row">

                                <!-- Earnings (Monthly) Card Example -->
                                <div @click="changerecord('record_pharmacyPurchaselist')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-success shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-success text-uppercase mb-1">Pharmacy Purchase Receipt</div>
                                        <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">4</div> -->
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-file-alt fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                        <div @click="changerecord('record_billinglist')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-info shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-info text-uppercase mb-1">Billings</div>
                                        <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">4</div> -->
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-file-alt fa-2x text-gray-500"></i>
                                        </div>
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

    methods: {
        changerecord: function(routename){
          this.$router.push({name: routename})
      },
    },
    mounted(){
        this.$store.dispatch("activenav","reportnav")
    }
}
</script>

<style scoped>
    .reports {
        cursor: pointer;
    }
</style>