<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-calendar"></i> Yearly - Treatment</span>
                    <button type="button" @click="back()" class="noprint float-right"><span class="fa fa-times"></span></button>
                    <hr/>

                      <ul class="nav nav-tabs">
            
                                <li class="nav-item" v-for="(branch,index) in branches" :key="index">
                                    <a v-if="index==0" @click="changeFilterbranch(branch.id,index)" class="active navbranch nav-link" href="javascript:void(0)">
                                             {{branch.branch}}
                                    </a>
                                    <a v-else @click="changeFilterbranch(branch.id,index)" class="navbranch nav-link" href="javascript:void(0)">
                                             {{branch.branch}}
                                    </a>
                                    
                                </li>
                             
                            </ul>   

                            
                              <div class="card">

                                <div class="card-body">
                                        <div class="row">
                                            
                                            <div class="col-md-3">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon3">Start Year</span>
                                                    </div>
                                                    <input type="number" class="form-control" v-model="search.startyear">
                                            </div>
                                            </div>

                                            

                                            <div class="col-md-3">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon3">End Year</span>
                                                    </div>
                                                    <input type="number" class="form-control" v-model="search.endyear"/>
                                            </div>
                                            </div>

                                             <div class="col-md-3">
                                                    <button @click="searchProceed" class="form-control btn btn-primary"><span class="fa fa-search"></span> Generate</button>
                                            </div>

                                        </div>
                                        

                                </div>
                              </div>

                                <br/>
                                <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;"/>
                                <div style="text-align:center;color:dimgray;font-size:14pt;font-weight:bold;"><span>EARNINGS FROM {{search.startyear}} TO {{search.endyear}}</span></div>
                                 <column-chart :stacked="graphOptions.stacked" :legend="false" :download="true" :data="graphOptions.data"></column-chart>
                                        <div class="row">
                                        <div class="col-md-10 offset-md-1">
                                            <table class="table table-condensed table-striped table-bordered">
                                                <thead>
                                                    <tr style="background:#343A40;color:white;">
                                                        <th style="width:50%">Date</th>
                                                        <th>Earnings</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr v-for="(sale,index) in sales.graph" :key="index">
                                                        <td>{{sale.yearname}}</td>
                                                        <td>{{sale.totalsales}}</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>Total</th>
                                                        <th>{{computeTotal}}</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                      
                                
                              </div>

                               <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;"/>
                                 <div style="text-align:center;color:dimgray;font-size:14pt;font-weight:bold;"><span>TOP 5 MOST SERVICE DONE BASED ON TRANSACTION DATE FROM  {{search.startyear}} TO {{search.endyear}}</span></div>
                                      <div class="row">
                                  <div class="col-md-12">
                                      <pie-chart :download="true" width="100%" height="500px" :data="pieOptionsMostAvail.data"></pie-chart>
                                  </div>

                                   <div class="col-md-10 offset-md-1">
                                            <table class="table table-condensed table-striped table-bordered">
                                                <thead>
                                                   <tr style="background:#343A40;color:white;">
                                                        <th style="width:50%">Service</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr v-for="(sale,index) in sales.serviceMostavail" :key="index">
                                                        <td>{{sale.service}}</td>
                                                        <td>{{sale.totalcount}} 
                                                            <!-- <span v-if="sale.totalcount == 1">time</span><span v-else>times</span> -->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                               
                                            </table>
                                        </div>
                              </div>
                              <div style="width: 100%;height:10px;background:#3A61D0;margin-bottom:50px;"/>


        </div>
  
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {

    data: function(){
        return {
                activebranchIndex: 0,
                search :{
                    startyear: "",
                    endyear: "",
                    branch: "",
                },
                 graphOptions: {
                    stacked: false,
                    colors: ['#b00', '#666'],
                    data: [],
                },
                pieOptionsMostAvail: {
                    data: [],
                },

        }
    },
    methods: {
        back: function(){
            this.$router.go(-1)
        },
        changeFilterbranch: function(branch,index){
                const navbranch = document.getElementsByClassName('navbranch')
                for(let x = 0 ; x < navbranch.length ; x++){
                    navbranch[x].classList.remove('active')
                }
                navbranch[index].classList.add('active')
                this.activebranchIndex = index
                this.search.branch = this.branches[this.activebranchIndex].id
                this.searchProceed()

         },

         searchProceed: function(){
              this.$store.dispatch("report/sales_yearly",this.search)
                .then(()=>{
                     let data = []
                    this.sales.graph.forEach((sale)=>{
                        data.push([sale.yearname, sale.totalsales])
                    })
                    this.graphOptions.data = data
                    data = []
                     this.sales.serviceMostavail.forEach((sale)=>{
                        data.push([sale.service, sale.totalcount])
                    })
                    this.pieOptionsMostAvail.data = data
                })
                .catch(err=>console.log(err))
         }
    },
    computed: {
        ...mapState({
            branches: state=> state.branch.branches,
            sales: state=> state.report.sales,
        }),
        computeTotal: {
            get: function(){
                let total = 0
             this.sales.graph.forEach((sale)=>{
                 total = total + parseFloat(sale.totalsales)
             })
             return total
            }
        }
    },
    mounted(){
        this.$store.dispatch("activenav","reportnav")
          this.$store.dispatch("branch/getList")
            .then(()=>{
                    const datenow = new Date()
                    this.search.startyear = this.search.endyear = datenow.getFullYear()
                    this.search.branch = this.branches[this.activebranchIndex].id
                    this.searchProceed()
                })
            .catch(err=>console.log(err))
    }

}
</script>