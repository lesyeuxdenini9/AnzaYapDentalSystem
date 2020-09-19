<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-dollar-sign"></i> Reports</span>
                    <hr/>
              
                     <span class="reporttitle"><span class="fa fa-calendar"></span> Appointments</span>
                  <div class="row">
                               
                                <!-- Earnings (Daily) Card Example -->
                                <div @click="changesale('appointment_daily')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-warning shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-warning text-uppercase mb-1">Daily / Weekly (Date Range)</div>
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
                                <div @click="changesale('appointment_monthly')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-warning shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-warning text-uppercase mb-1">Monthly</div>
                                        <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">4</div> -->
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-file-alt fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                          <!-- Earnings (Yearly) Card Example -->
                                <div @click="changesale('appointment_yearly')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-warning shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-warning text-uppercase mb-1">Yearly</div>
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
                     <span class="reporttitle"><span class="fa fa-wrench"></span> Services & Treatments</span>
                  <div class="row">
                               
                                <!-- Earnings (Daily) Card Example -->
                                <div @click="changesale('sale_daily')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-success shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-success text-uppercase mb-1">Daily / Weekly (Date Range)</div>
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
                                <div @click="changesale('sale_monthly')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-success shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-success text-uppercase mb-1">Monthly</div>
                                        <!-- <div class="h5 mb-0 font-weight-bold text-gray-800">4</div> -->
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-file-alt fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                          <!-- Earnings (Yearly) Card Example -->
                                <div @click="changesale('sale_yearly')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-success shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-success text-uppercase mb-1">Yearly</div>
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

                      <span class="reporttitle"><span class="fas fa-file-prescription"></span> Pharmacy Earnings</span>
                  <div class="row"> 
                               
                        
                                <div @click="changesale('pharmacy_daily')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">Daily / Weekly (Date Range)</div>
                                    
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-file-alt fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>


                             
                                <div @click="changesale('pharmacy_monthly')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">Monthly</div>
                      
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-file-alt fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                        
                                <div @click="changesale('pharmacy_yearly')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">Yearly</div>
                                
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

                               <!-- <span class="reporttitle"><span class="fa fa-medkit"></span> Dental Clinic Item Reports</span>
                  <div class="row"> 
                               
                        
                                <div @click="changesale('dentalitem_daily')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-danger shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-danger text-uppercase mb-1">Daily / Weekly (Date Range)</div>
                                    
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-file-alt fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>


                             
                                <div @click="changesale('dentalitem_monthly')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-danger shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-danger text-uppercase mb-1">Monthly</div>
                      
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-file-alt fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                        
                                <div @click="changesale('dentalitem_yearly')" class="col-xl-3 col-md-6 mb-4 reports">
                                <div class="card border-left-danger shadow h-100 py-2">
                                    <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                        <div class="text-lg font-weight-bold text-danger text-uppercase mb-1">Yearly</div>
                                
                                        </div>
                                        <div class="col-auto">
                                        <i class="fas fa-file-alt fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>


                  </div>
                  <hr/> -->

        </div>
  
    </div>
</template>

<script>

export default {
    methods: {
        changesale: function(routename){
             this.$router.push({name: routename})
        }
    },
    mounted(){
        this.$store.dispatch("activenav","reportnav")
    }
}
</script>

<style scoped>
.reporttitle {
    font-size:18pt;
    color:dimgray;
}
.reports {
    cursor: pointer;
}
</style>