<template>
    <div>
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-chart-pie"></i> Dashboard</span><hr/>

             

                    <ul class="nav nav-tabs">
            
                        <li class="nav-item" v-for="(branch,index) in branches" :key="index">
                            <a v-if="index==0" @click="changeFilterbranch(index)" class="active navbranch nav-link" href="javascript:void(0)">
                                      {{branch.branch}}
                            </a>
                            <a v-else @click="changeFilterbranch(index)" class="navbranch nav-link" href="javascript:void(0)">
                                      {{branch.branch}}
                            </a>
                            
                        </li>
                      
                    </ul>   

                    <!-- Content Row -->
          <div class="row">

             <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Earnings (Annual)</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                          <small style="font-weight:bold;cursor:pointer;" @click="redirect('pharmacy_yearly',{dash: 1})">Pharmacy: {{$helper.roundToDecimal(data.pyearsales,2)}}</small><br/>
                         <small style="font-weight:bold;cursor:pointer;" @click="redirect('sale_yearly',{dash: 1})">Services & Treatment: {{$helper.roundToDecimal(data.yearsales,2)}}</small><br/>
                         <small style="font-weight:bold;">Total: {{$helper.roundToDecimal(data.yearsales + data.pyearsales,2)}}</small>   
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Earnings (Monthly)</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                         <small style="font-weight:bold;cursor:pointer;" @click="redirect('pharmacy_monthly',{dash: 1})">Pharmacy: {{$helper.roundToDecimal(data.pmonthsales,2)}}</small><br/>
                         <small style="font-weight:bold;cursor:pointer;" @click="redirect('sale_monthly',{dash: 1})">Services & Treatment: {{$helper.roundToDecimal(data.monthsales,2)}}</small><br/>
                         <small style="font-weight:bold;">Total: {{$helper.roundToDecimal(data.monthsales + data.pmonthsales,2)}}</small>   
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

     

            <!-- Pending Requests Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Earnings (Today)</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                         <small style="font-weight:bold;cursor:pointer;" @click="redirect('pharmacy_daily',{dash: 1})">Pharmacy: {{$helper.roundToDecimal(data.ptodaysales,2)}}</small><br/>
                         <small style="font-weight:bold;cursor:pointer;" @click="redirect('sale_daily',{dash: 1})">Services & Treatment: {{$helper.roundToDecimal(data.todaysales,2)}}</small><br/>
                         <small style="font-weight:bold;">Total: {{$helper.roundToDecimal(data.todaysales + data.ptodaysales,2)}}</small> 
                        </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-check fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                  
            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4" style="cursor:pointer;" @click="redirect('appointment')">
              <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Appointments Today</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{{$helper.roundToDecimal(data.appointmenttoday,2)}}</div>
        
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="row">
              <div class="col-md-4" style="text-align:center;">
                  <span @click="redirect('sale_yearly',{dash: 1})" style="font-size:14pt; font-weight:bold;color:dimgray;cursor:pointer;">SERVICES DONE COUNT YEARLY BASED ON TRANSACTION DATE</span>
                  <pie-chart :download="true" width="100%" height="500px" :data="serviceYear"></pie-chart>

              </div>

                 <div class="col-md-4" style="text-align:center;">
                  <span @click="redirect('sale_monthly',{dash: 1})" style="font-size:14pt; font-weight:bold;color:dimgray;cursor:pointer;">SERVICES DONE COUNT MONTHLY BASED ON TRANSACTION DATE</span>
                  <pie-chart :download="true" width="100%" height="500px" :data="serviceMonth"></pie-chart>

              </div>

                <div class="col-md-4" style="text-align:center;">
                  <span @click="redirect('sale_daily',{dash: 1})" style="font-size:14pt; font-weight:bold;color:dimgray;cursor:pointer;">SERVICES DONE COUNT TODAY BASED ON TRANSACTION DATE</span>
                  <pie-chart :download="true" width="100%" height="500px" :data="serviceToday"></pie-chart>
               

              </div>

          </div>

    
        </div>



          <div class="col-md-12">
            <div class="card">
              <div class="card-header" style="text-align:center;"><span style="font-size:20pt;" class="card-title">EARNINGS LAST 7 DAYS</span></div>
              <div class="card-body">
                 <line-chart :download="true"  :curve="false" :data="weekSalesData"></line-chart>
              </div>
            </div>
          </div>



          
          <div class="col-md-6" style="margin-top:40px;">

                <div class="card">
              <div class="card-header" style="text-align:center;background:orange;"><span style="font-size:20pt;color:white !important;" class="card-title">ITEM LOW STOCKS</span></div>
              <div class="card-body">
                  
                  <table class="table table-condensed table-striped">
                       <thead>
                     <tr style="cursor:pointer"  @click="redirect('medicinelist',{type: 0, stock: 'LOW'})">
                        <th colspan="2">     <span>Dental Clinic Items - {{$helper.roundToDecimal(medicinesLow.length,2)}} item(s)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(med,index) in medicinesLow" :key="index">
                          <td style="font-size:12pt;font-weight:normal;">{{med.medicine}} ( {{med.brand}} )</td>
                          <td style="font-size:12pt;font-weight:normal;">{{med.stocks}} {{med.uom}} remaining</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr/>
                
                  <table class="table table-condensed table-striped">
                         <thead>
                      <tr style="cursor:pointer"  @click="redirect('medicinelist',{type: 1,stock: 'LOW'})">
                        <th colspan="2">     <span>Pharmacy Medicines - {{$helper.roundToDecimal(pharmacyLow.length,2)}} item(s)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(med,index) in pharmacyLow" :key="index">
                          <td style="font-size:12pt;font-weight:normal;">{{med.medicine}} ( {{med.brand}} )</td>
                          <td style="font-size:12pt;font-weight:normal;">{{med.stocks}} {{med.uom}} remaining</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
               <div class="col-md-6"  style="margin-top:40px;">

                <div class="card">
              <div class="card-header" style="text-align:center;background:maroon;"><span style="font-size:20pt;color:white !important;" class="card-title">ITEM OUT OF STOCKS</span></div>
              <div class="card-body">
                    
                  <table class="table table-condensed table-striped">
                    <thead>
                      <tr style="cursor:pointer"  @click="redirect('medicinelist',{type: 0, stock: 'NO STOCKS'})">
                        <th colspan="2">  <span>Dental Clinic Items - {{$helper.roundToDecimal(medicinesZero.length,2)}} item(s)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(med,index) in medicinesZero" :key="index">
                          <td style="font-size:12pt;font-weight:normal;">{{med.medicine}} ( {{med.brand}} )</td>
                          <td style="font-size:12pt;font-weight:normal;">{{med.stocks}} {{med.uom}} remaining</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr/>
               
                  <table class="table table-condensed table-striped">
                     <thead>
                      <tr style="cursor:pointer"  @click="redirect('medicinelist',{type: 1, stock: 'NO STOCKS'})">
                        <th colspan="2">  <span>Pharmacy Medicines - {{$helper.roundToDecimal(pharmacyZero.length,2)}} item(s)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(med,index) in pharmacyZero" :key="index">
                          <td style="font-size:12pt;font-weight:normal;">{{med.medicine}} ( {{med.brand}} )</td>
                          <td style="font-size:12pt;font-weight:normal;">{{med.stocks}} {{med.uom}} remaining</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>

       

        <!-- <column-chart :stacked="stacked" :legend="true" :colors="['#b00', '#666']" :download="true" :data="seriesData"></column-chart>
        -->

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'dashboard',
    data: function(){
      return {
        activebranchIndex: 0,
        stacked: false,
        chartData: [["Tue (July 14, 2020)", 4],["Wed (July 15, 2020)", 4],["Thu (July 16, 2020)", 4], ["Fri (July 17, 2020)", 2], ["Sat (July 18, 2020)", 10], ["Sun (July 19, 2020)", 5], ["Mon (July 20, 2020)", 3]],
       seriesData: [
        {name: 'Workout', data: {'2017-01-01': 3, '2017-01-02': 4}},
        // {name: 'Call parents', data: {'2017-01-01': 5, '2017-01-02': 3}}
      ],
        weekSalesData:[],
        options: {
          type: 'verticalBar'
        },
        medicinesLow: [],
        medicinesZero: [],
        pharmacyLow: [],
        pharmacyZero: [],
        serviceToday: [],
        serviceYear: [],
        serviceMonth: [],
      }
    },
    computed: {
        ...mapState({
              branches: state => state.branch.branches,
              data: state=>state.dashboard.data,
              categories: state=>state.service.categories,
        })

    },
    methods: {
         redirect: function(route, params={}){
           this.$router.push({name: route, params: params})
         },
         initializeStockItems: function(){

            this.medicinesLow = this.branches[this.activebranchIndex].Medicines.filter((med)=>{
                if(med.stocks > 0 && med.stocks <= med.limitMin && med.type == 0) return med
            })

            this.medicinesZero = this.branches[this.activebranchIndex].Medicines.filter((med)=>{
                  if(med.stocks == 0 && med.type == 0) return med
            })

            this.pharmacyLow = this.branches[this.activebranchIndex].Medicines.filter((med)=>{
                if(med.stocks > 0 && med.stocks <= med.limitMin && med.type == 1) return med
            })

              this.pharmacyZero = this.branches[this.activebranchIndex].Medicines.filter((med)=>{
                  if(med.stocks == 0 && med.type == 1) return med
            })
         },
         changeFilterbranch: function(index){
            const navbranch = document.getElementsByClassName('navbranch')
            for(let x = 0 ; x < navbranch.length ; x++){
                 navbranch[x].classList.remove('active')
            }
            navbranch[index].classList.add('active')
            this.activebranchIndex = index
             this.$store.dispatch("dashboard/getData",this.branches[this.activebranchIndex].id).then(()=>{
               this.weekSalesData = []
             this.weekSalesData.push({name: 'Pharmacy', data: {}})
             this.weekSalesData.push({name: 'Services & Treatments', data: {}})
             this.weekSalesData.push({name: 'Total', data: {}})
             this.data.weeksales.forEach((sale)=>{
                  // this.weekSalesData.push([`${sale.day} (${sale.date})`, sale.treatment])
                 this.weekSalesData[0].data[`${sale.day} (${sale.date})`] = sale.pharmacy
                 this.weekSalesData[1].data[`${sale.day} (${sale.date})`] = sale.treatment
                 this.weekSalesData[2].data[`${sale.day} (${sale.date})`] = parseFloat(sale.treatment) + parseFloat(sale.pharmacy)
            })
         }).catch(err=>console.log(err))

          this.initializeStockItems()
        },  
    },
    mounted(){
       this.$store.dispatch("activenav","dashboardnav")
       this.$store.dispatch("branch/getListMedicine","All").then(()=>{
         this.$store.dispatch("dashboard/getData",this.branches[this.activebranchIndex].id).then(()=>{
             this.weekSalesData = []
             this.weekSalesData.push({name: 'Pharmacy', data: {}})
             this.weekSalesData.push({name: 'Services & Treatments', data: {}})
             this.weekSalesData.push({name: 'Total', data: {}})
             this.data.weeksales.forEach((sale)=>{
                  // this.weekSalesData.push([`${sale.day} (${sale.date})`, sale.treatment])
                 this.weekSalesData[0].data[`${sale.day} (${sale.date})`] = sale.pharmacy
                 this.weekSalesData[1].data[`${sale.day} (${sale.date})`] = sale.treatment
                 this.weekSalesData[2].data[`${sale.day} (${sale.date})`] = parseFloat(sale.treatment) + parseFloat(sale.pharmacy)
            })

            let serviceToday = this.categories.map((category)=>{
              return [category , 0]
            })
            let serviceMonth = this.categories.map((category)=>{
              return [category , 0]
            })

            let serviceYear = this.categories.map((category)=>{
              return [category , 0]
            })

            this.data.servicetodaycount.forEach((data)=>{
                if(data.category == "Esthetic Dentistry") serviceToday[0][1] = data.totalcount
                if(data.category == "Preventive Dentistry") serviceToday[1][1] = data.totalcount
                if(data.category == "Periodontics & Endodontics") serviceToday[2][1] = data.totalcount
                if(data.category == "Oral Surgery") serviceToday[3][1] = data.totalcount
                if(data.category == "Orthodontics") serviceToday[4][1] = data.totalcount
                if(data.category == "Dental Roentology") serviceToday[5][1] = data.totalcount
            })

            this.serviceToday = serviceToday

            this.data.servicemonthcount.forEach((data)=>{
                if(data.category == "Esthetic Dentistry") serviceMonth[0][1] = data.totalcount
                if(data.category == "Preventive Dentistry") serviceMonth[1][1] = data.totalcount
                if(data.category == "Periodontics & Endodontics") serviceMonth[2][1] = data.totalcount
                if(data.category == "Oral Surgery") serviceMonth[3][1] = data.totalcount
                if(data.category == "Orthodontics") serviceMonth[4][1] = data.totalcount
                if(data.category == "Dental Roentology") serviceMonth[5][1] = data.totalcount
            })

            this.serviceMonth = serviceMonth

              this.data.serviceyearcount.forEach((data)=>{
                if(data.category == "Esthetic Dentistry") serviceYear[0][1] = data.totalcount
                if(data.category == "Preventive Dentistry") serviceYear[1][1] = data.totalcount
                if(data.category == "Periodontics & Endodontics") serviceYear[2][1] = data.totalcount
                if(data.category == "Oral Surgery") serviceYear[3][1] = data.totalcount
                if(data.category == "Orthodontics") serviceYear[4][1] = data.totalcount
                if(data.category == "Dental Roentology") serviceYear[5][1] = data.totalcount
            })

            this.serviceYear = serviceYear

        
         }).catch(err=>console.log(err))

          this.initializeStockItems()

       }).catch(err=>console.log(err))
       
    }
}
</script>

<style scoped>
    .ditem {
        position:relative;
    }
  
  .dashboard-item {
        margin-left: 20px;
        font-weight: bold;
        font-size: 24pt;
        position: absolute;
        top: 15pt;
    }

    .dashboard-item-count {
        position: absolute;
        top: 20px;
        right: 15px;
        font-weight: bold;
        font-size: 24pt;
    }

    tbody tr td {
        font-size: 20pt;
        font-weight: bold;
    }
</style>
