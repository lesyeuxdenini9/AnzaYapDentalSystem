<template>
      <div class="modal">
            <div class="modal-content" style="padding: 40px;">
                <span @click="closemodal" class="close-modal">&times;</span>

                <div style="text-align:center;margin-bottom:20px;">
                    <button @click="printPDF()" class="btn btn-danger" style="float:left;"><span class="fa fa-file-pdf"></span> PDF</button>
                    <span style="color:dimgray;font-size:20pt;font-weight:bold">{{service.service}} By Gender {{range}}</span>
                </div>

                <column-chart :library="columnlibrary" :stacked="graphOptions.stacked" :legend="true" :download="true" :data="graphOptions.data"></column-chart>

                   <table class="table table-condensed table-striped table-bordered">
                                                <thead>
                                                    <tr style="background:#343A40;color:white;">
                                                        <th>Date</th>
                                                        <th>Male</th>
                                                        <th>Female</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr v-for="(data,index) in byGender.genderData" :key="index">
                                                        <td>
                                                            <span v-if="flag==1">{{data.transactionDate}}</span>
                                                            <span v-else-if="flag==2">{{`${months[data.monthname-1].des} ${data.yearname}`}}</span>
                                                            <span v-else>{{data.yearname}}</span>
                                                            
                                                        </td>
                                                        <td>{{$helper.roundToDecimal(data.MaleCount,2)}}</td>
                                                        <td>{{$helper.roundToDecimal(data.FemaleCount,2)}}</td>
                                                        <td>{{$helper.roundToDecimal(data.FemaleCount+data.MaleCount,2)}}</td>
                                                    </tr>
                                                </tbody>

                                                <tfoot>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td>{{$helper.roundToDecimal(totalcount[0],2)}}</td>
                                                        <td>{{$helper.roundToDecimal(totalcount[1],2)}}</td>
                                                        <td>{{$helper.roundToDecimal(totalcount[2],2)}}</td>
                                                    </tr>

                                                </tfoot>
                   </table>
            </div>
     </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        search: {
            type: Object,
            required: true
        },
        service: {
            type: Object,
            required: true
        },
        flag: {
            type: Number,
            required: true,
        },
        branch: {
            type: String,
            required: false,
        }
    },
    data: function(){
        return {
            months: [
                    {index: 1 , des: "JAN"},
                    {index: 2 , des: "FEB"},
                    {index: 3 , des: "MAR"},
                    {index: 4 , des: "APR"},
                    {index: 5 , des: "MAY"},
                    {index: 6 , des: "JUN"},
                    {index: 7 , des: "JUL"},
                    {index: 8 , des: "AUG"},
                    {index: 9 , des: "SEP"},
                    {index: 10 , des: "OCT"},
                    {index: 11 , des: "NOV"},
                    {index: 12 , des: "DEC"},
                ],
            graphOptions: {
                stacked: false,
                colors: ['#b00', '#666'],
                data :[]
            },
            columnlibrary: {
                    animation: {
                        onComplete: this.doneChart
                    }
                },
            columnimg: null,
        }
    },
    computed:{
        ...mapState({
            byGender: state=>state.report.byGender,
        }),
        totalcount:{
            get: function(){
                let maletotal = 0
                let femaletotal = 0
                 this.byGender.genderData.forEach((data)=>{
                        maletotal = maletotal + data.MaleCount
                        femaletotal = femaletotal + data.FemaleCount
                 })

                 return [maletotal,femaletotal,(maletotal+femaletotal)]
            }
        },
        range: {
            get: function(){
                let des
                switch(this.flag){
                    case 1:
                       des = `From ${this.$helper.formatBdayDate(this.search.start)} To ${this.$helper.formatBdayDate(this.search.end)}`
                       break
                    case 2:
                        des = `From ${this.months[this.search.startmonth-1].des} ${this.search.startyear} To ${this.months[this.search.endmonth-1].des} ${this.search.endyear}`
                        break
                    case 3:
                        des = `From ${this.search.startyear} To ${this.search.endyear}`
                        break
                    default:
                        break
                }
                return des
            }
        },
    },
    methods: {
        printPDF: function(){
            let data = this.byGender.genderData.map((data)=>{
                if(this.flag == 1){
                    return [data.transactionDate,this.$helper.roundToDecimal(data.MaleCount,2),this.$helper.roundToDecimal(data.FemaleCount,2),this.$helper.roundToDecimal((data.FemaleCount+data.MaleCount),2)]
                }else if(this.flag == 2){
                    return [`${this.months[data.monthname-1].des} ${data.yearname}`,this.$helper.roundToDecimal(data.MaleCount,2),this.$helper.roundToDecimal(data.FemaleCount,2),this.$helper.roundToDecimal((data.FemaleCount+data.MaleCount),2)]
                }else{
                    return [data.yearname,this.$helper.roundToDecimal(data.MaleCount,2),this.$helper.roundToDecimal(data.FemaleCount,2),this.$helper.roundToDecimal((data.FemaleCount+data.MaleCount),2)]
                }
            })
            data.unshift(['Date','Male','Female','Count'])
            data.push(['Total',this.$helper.roundToDecimal(this.totalcount[0],2),this.$helper.roundToDecimal(this.totalcount[1],2),this.$helper.roundToDecimal(this.totalcount[2],2)])
            var docDefinition = {  
                 
                    // header: {text: 'Simple Text', margin: 10 , alignment: 'center'},  
                watermark: { text: 'AnzaYap Dental Clinic', color: 'blue', opacity: 0.1, bold: true, italics: false },
                footer: function(currentPage, pageCount) { 
                  return { text: currentPage.toString() + ' of ' + pageCount , alignment: 'center'}; 
                  },
                pageOrientation: 'landscape',
               content: [
                 {
                   text: `${this.branch} ${this.service.service} By Gender ${this.range}`, alignment: 'center', margin: [0,0,0,20]
                 },
                {
                     image: this.columnimg,
                     height:400,
                     width:750,
                     pageBreak: 'after'
                 },
                   {
                 table: {
                   widths: ['*','*','*','*'],
                   body: data,
                //    pageBreak: 'after'
                 }
               },

               ]
            }

             this.$pdfMake.createPdf(docDefinition).open();
        },
        doneChart: function(){
            let charts = document.getElementsByClassName('chartjs-render-monitor')
<<<<<<< HEAD
            this.columnimg = charts[2].toDataURL()
=======
            this.columnimg = charts[3].toDataURL()
>>>>>>> version5
        },
        closemodal: function(){
            this.$emit("closemodal")
        },
        init: function(){
            
             this.$store.dispatch("report/getByGender",{search: this.search,service: this.service,flag: this.flag}).then(()=>{
                 
                this.graphOptions.data = []
                this.graphOptions.data.push({name: 'Male', data: {}})
                this.graphOptions.data.push({name: 'Female', data: {}})

                if(this.flag == 1) {
                    this.byGender.genderData.map((data)=>{
                        this.graphOptions.data[0].data[`${data.transactionDate}`] = data.MaleCount
                        this.graphOptions.data[1].data[`${data.transactionDate}`] = data.FemaleCount
                    })
                }else if(this.flag == 2){
                     this.byGender.genderData.map((data)=>{
                        this.graphOptions.data[0].data[`${this.months[data.monthname-1].des} ${data.yearname}`] = data.MaleCount
                        this.graphOptions.data[1].data[`${this.months[data.monthname-1].des} ${data.yearname}`] = data.FemaleCount
                    })
                }else{
                      this.byGender.genderData.map((data)=>{
                        this.graphOptions.data[0].data[`${data.yearname}`] = data.MaleCount
                        this.graphOptions.data[1].data[`${data.yearname}`] = data.FemaleCount
                    })
                }

              
             })

        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.init()
        })
    }
}
<<<<<<< HEAD
</script>
=======
</script>
>>>>>>> version5
