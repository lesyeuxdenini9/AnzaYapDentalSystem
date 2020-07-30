import DashboardComponent from "@/components/patient/DashboardComponent"
import AppointMentComponent from "@/components/patient/appointmentComponent"
import ReservationIndexComponent from "@/components/patient/reservation/indexComponent"
import ReservationViewComponent from "@/components/patient/reservation/ViewComponent"
import FeedbackComponent from "@/components/patient/feedback/indexComponent"
import TransactionComponent from "@/components/patient/records/TransactionComponent"
import transactionformComponent from "@/components/patient/records/transactionForm"
import viewBillComponent from "@/components/patient/records/viewBillComponent"
import landingComponent from "@/components/LoginComponent"
import { frontendmiddleware } from "@/helper/auth"

const routes = [
	{path: `/`,component: landingComponent,name: `landingPage`},
	{path: `/patient`,component: DashboardComponent, beforeEnter: frontendmiddleware,name: 'patientdashboard'},
	{path: `/patient/appointment`,component: AppointMentComponent, beforeEnter: frontendmiddleware,name: 'patientAppointment'},
	{path: `/patient/reservation`,component: ReservationIndexComponent,beforeEnter: frontendmiddleware, name: `patientReservation`},
	{path: `/patient/reservation/:idno`,component: ReservationViewComponent,beforeEnter: frontendmiddleware, name: `patientViewReservation`},
	{path: `/patient/feedbacks`,component: FeedbackComponent, beforeEnter: frontendmiddleware,name: `patientfeedback`},
	{path: `/patient/transactions`,component: TransactionComponent,beforeEnter: frontendmiddleware,name: `patienttransaction`},
	{path: `/patient/transaction/:idno/form`,component: transactionformComponent, beforeEnter: frontendmiddleware,name: `patientTransactionform`},
	{path: `/patient/transaction/bill/:idno`,component: viewBillComponent, beforeEnter: frontendmiddleware,name: `patientViewBill`},

]

export default {
	routes
}
