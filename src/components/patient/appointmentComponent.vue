<template>
    <div> 
         <!-- Begin Page Content -->
        <div class="container-fluid">
                  <span class="pageheader"><i class="fa fa-handshake"></i> Appointment List</span>
                    <hr/>
                    <div class="card">
                        <div class="card-body">
                            <!-- <button @click="toggleWeekends">toggle weekends</button> -->
                               <FullCalendar ref="fullCalendar" :options="calendarOptions" />
                        </div>
                    </div>
                  

        </div>
  
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
// import { formatDate } from '@fullcalendar/vue';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { INITIAL_EVENTS, createEventId } from '@/event-utils'
// import { formatDate } from '@fullcalendar/core'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          //left: 'prev,next today',
          left: 'title',
        //   right: 'prev,next custom1',
          right: 'prev,next',
        },
        footerToolbar: {
            left: 'today dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        // contentHeight: 600,
        contentHeight: "auto",
        // height: "1000px",
        height: "auto",
        navLinks: true,
        initialView: 'dayGridMonth', // timeGridDay // timeGridWeek
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
       eventRemove: this.removeEvent,
        selectConstraint: {
            start: new Date(),
            end: new Date().setDate(new Date().getDate()+8),
        },
        // hiddenDays: [0, 1, 3, 5 ],
        customButtons: {
                custom1: {
                    text: 'custom 1',
                    click: function() {
                        alert('clicked custom button 1!');
                    }
             },
        },
      },
      currentEvents: [],
      calendarApi: null,
    }
  },
  methods: {
    removeEvent: function(){
      alert("removed")
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo) {
  

        let check = new Date(selectInfo.start)
        let datetoday = new Date()
        let date_aweek =  new Date().setDate(datetoday.getDate()+7)
        date_aweek = new Date(date_aweek)
   
        if(check > date_aweek || check <= datetoday){
          alert("bawal lumabas")
        }else{
          alert("yehey")
        }
 
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          display: 'background',
          color: '#ff9f89'
        })
      }
    },
    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events) {
      this.currentEvents = events
      // console.log(events)
      //  let calendarApi = this.$refs.fullCalendar.getApi()
      //  console.log(calendarApi.getDate())
      //  console.log(calendarApi.view.activeStart)
      //  console.log(calendarApi.view.activeEnd)
    }
  },
  mounted(){
    this.$store.dispatch("activenav","reservationnav")
    this.calendarApi = this.$refs.fullCalendar.getApi()

    // console.log(this.calendarApi.getDate())
    // console.log(this.calendarApi)
    // console.log(this.calendarApi.view.activeStart)
    // console.log(this.calendarApi.view.activeEnd)


        let datetoday = new Date()
        let date_lweek =  new Date().setDate(datetoday.getDate()+7)
        let date_fweek = new Date().setDate(datetoday.getDate()+1) 
        date_lweek = new Date(date_lweek)
        date_fweek = new Date(date_fweek)

        console.log(date_fweek)
        console.log(date_lweek)

  }
}
</script>