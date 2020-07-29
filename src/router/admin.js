import DashboardComponent from "@/components/DashboardComponent"
import settingComponent from "@/components/setting/indexComponent"
import staffComponent from "@/components/setting/staff/indexComponent"
import adminComponent from "@/components/setting/admin/indexComponent"
import superadminComponent from "@/components/setting/superadmin/indexComponent"
import serviceComponent from "@/components/setting/service/indexComponent"
import dentistComponent from "@/components/setting/dentist/indexComponent"
import medicineComponent from "@/components/setting/medicine/indexComponent"
import stocksComponent from "@/components/setting/medicine/stocksComponent"
import viewItemComponent from "@/components/setting/medicine/viewItemComponent"
import branchComponent from "@/components/setting/branch/indexComponent"

import newPatientComponent from "@/components/backend/patient/newPatientComponent"
import listPatientComponent from "@/components/backend/patient/indexComponent"
import patientInfoComponent from "@/components/backend/patient/viewComponent"
import transactionComponent from "@/components/backend/transaction/indexComponent"
import printPrescriptComponent from "@/components/backend/transaction/printPrescriptComponent"
import setPasswordComponent from "@/components/setting/resetPassComponent"

import appointmentComponent from "@/components/backend/reservation/appointmentComponent"
import pendingReservationComponnent from "@/components/backend/reservation/pendingComponent"
import viewReservationComponent from "@/components/backend/reservation/viewReservationComponent"
import listReservationComponent from "@/components/backend/reservation/listComponent"
import datalistComponent from "@/components/backend/reservation/datalistComponent"

import pharmacyComponent from "@/components/backend/pharmacy/pharmacyComponent"
import invoiceComponent from "@/components/backend/pharmacy/invoiceInfo"

import reportRecordComponent from "@/components/reports/records/indexComponent"
import reportSaleComponent from "@/components/reports/sales/indexComponent"
import viewBillComponent from "@/components/backend/transaction/viewBillComponent"
import backendFeedbackComponent from "@/components/backend/backendFeedbackComponent"
import medicalCertificateComponent from "@/components/backend/transaction/medicalCertificateComponent"
import transactionformComponent from "@/components/backend/transaction/transactionformComponent"
import transactionreportRecordComponent from "@/components/reports/records/transactionComponent"
import billingreportRecordComponent from "@/components/reports/records/billingComponent"
import dailySaleComponent from "@/components/reports/sales/treatment/daily"
import monthlySaleComponent from "@/components/reports/sales/treatment/monthly"
import yearlySaleComponent from "@/components/reports/sales/treatment/yearly"

import { backendmiddleware } from "@/helper/auth"

const routes = [
	{path: `/setpassword/:token`,component: setPasswordComponent,name: 'setPassword'},
	{path: `/backend`,component: DashboardComponent, beforeEnter: backendmiddleware,name: 'dashboard'},
	{path: `/backend/settings`,component: settingComponent,beforeEnter: backendmiddleware,name: 'settings'},
	{path: `/backend/stafflist`,component: staffComponent, beforeEnter: backendmiddleware,name: 'stafflist'},
	{path: `/backend/adminlist`,component: adminComponent,beforeEnter: backendmiddleware, name: 'adminlist'},
	{path: `/backend/superadminlist`,component: superadminComponent,beforeEnter: backendmiddleware,name : 'superadminlist'},
	{path: `/backend/servicelist`,component: serviceComponent,beforeEnter: backendmiddleware, name: 'servicelist'},
	{path: `/backend/dentistlist`,component: dentistComponent,beforeEnter: backendmiddleware, name: 'dentistlist'},
	{path: `/backend/medicinelist`,component: medicineComponent,beforeEnter: backendmiddleware,name: 'medicinelist'},
	{path: `/backend/medicinelist/stocksin/:branch`,component: stocksComponent, beforeEnter: backendmiddleware, name: 'stocksin'},
	{path: `/backend/medicinelist/item/:idno`,component: viewItemComponent,beforeEnter: backendmiddleware, name: 'viewItemDetails'},

	{path: `/backend/patient/list`,component: listPatientComponent,beforeEnter: backendmiddleware,name: `listPatient`},
	{path: `/backend/patient/new`,component: newPatientComponent,beforeEnter: backendmiddleware,name: `newPatient`},	
	{path: `/backend/patient/info/:idno`,component: patientInfoComponent,beforeEnter: backendmiddleware,name: `patientinfo`},
	{path: `/backend/transaction/:idno`,component: transactionComponent,beforeEnter: backendmiddleware,name: `transactioninfo`},
	{path: `/backend/transaction/:idno/medicalCertificate`,component: medicalCertificateComponent,beforeEnter: backendmiddleware,name: `medicalCertificate`},
	{path: `/backend/transaction/:idno/form`,component: transactionformComponent,beforeEnter: backendmiddleware,name: `transactionform`},

	{path: `/backend/branchlist`,component: branchComponent,beforeEnter:backendmiddleware,name: `branchlist`},

	{path: `/backend/appointment`,component: appointmentComponent,beforeEnter: backendmiddleware,name: `appointment`},
	{path: `/backend/transaction/prescript/:idno`,component:printPrescriptComponent,beforeEnter: backendmiddleware,name: `prescriptPrint`},

	{path: `/backend/reservation/pending`,component: pendingReservationComponnent,beforeEnter: backendmiddleware,name: `pendingReservation`},
    {path: `/backend/reservation/:idno`,component: viewReservationComponent,beforeEnter: backendmiddleware,name: `viewReservation`},
	{path: `/backend/reservation/list`,component: listReservationComponent,beforeEnter: backendmiddleware, name: `listReservation`},
	{path: `/backend/reservation/data/list`,component: datalistComponent,beforeEnter: backendmiddleware,name: `dataReservationList`},


	{path:`/backend/pharmacy/sale`,component: pharmacyComponent,beforeEnter: backendmiddleware,name: `pharmacySale`},
	{path:`/backend/pharmacy/sale/invoice/:idno`,component: invoiceComponent,beforeEnter: backendmiddleware,name: `invoiceInfo`},

	{path: `/backend/reports/records`,component: reportRecordComponent,beforeEnter: backendmiddleware,name: `report_records`},
	{path: `/backend/reports/sales`,component: reportSaleComponent,beforeEnter: backendmiddleware,name: `report_sales`},
	{path: `/backend/bill/:idno`,component: viewBillComponent,beforeEnter: backendmiddleware,name: `billinfo`},
	{path: `/backend/feedbacks`,component: backendFeedbackComponent,beforeEnter: backendmiddleware,name: `backendfeedback`},
	{path: `/backend/reports/records/transaction`,component: transactionreportRecordComponent,beforeEnter: backendmiddleware, name: `record_transactionlist`},
	{path: `/backend/reports/records/billing`,component: billingreportRecordComponent,beforeEnter: backendmiddleware, name: `record_billinglist`},


	{path: `/backend/reports/sales/daily`,component: dailySaleComponent,beforeEnter: backendmiddleware,name: `sale_daily`},
	{path: `/backend/reports/sales/monthly`,component: monthlySaleComponent,beforeEnter: backendmiddleware,name: `sale_monthly`},
	{path: `/backend/reports/sales/yearly`,component: yearlySaleComponent,beforeEnter: backendmiddleware,name: `sale_yearly`},


	

]

export default {
	routes
}
