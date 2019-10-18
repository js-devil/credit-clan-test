<template>
    <div>
        <FullCalendar @dateClick="handleDateClick" defaultView="dayGridMonth" :plugins="calendarPlugins" :events="events" />
        <button type="button" class="btn btn-primary" id="eventModal" style="display: none" data-toggle="modal" data-target="#exampleModal"></button>
        <button type="button" class="btn btn-primary" id="eventModalTwo" style="display: none" data-toggle="modal" data-target="#exampleTwoModal"></button>
        <EventModalTwo :events='multipleEvents' :date_picked='date' v-if="multipleEvents.length"/>
        <EventModal :event='event' v-if="event.title"/>

    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios'

import EventModal from '@/components/EventModal'
import EventModalTwo from '@/components/EventModalTwo'
let parseString = require('xml2js').parseString;

export default {
    components: {
        FullCalendar, EventModal, EventModalTwo
    },
    data() {
        return {
            event: {},
            events: [],
            multipleEvents: [],
            data: [],
            date: '',
            calendarPlugins: [ dayGridPlugin, interactionPlugin ]
        }
    },
    methods: {
        handleDateClick(arg){
            let array = []
            for (let i in arg.view.props.eventStore.defs){
                array.push(arg.view.props.eventStore.defs[i])
            }


            let event = array.filter(key => String(key.extendedProps.date_picked.slice(0, 10)) === String(arg.dateStr))
            if(event.length==1) {
                this.event = event[0]
                document.getElementById('eventModal').click()
            }
            else {
                this.multipleEvents = event
                this.date = arg.dateStr
                console.log(event)
                document.getElementById('eventModalTwo').click()
            }
        },
        getEvents () {
            axios('events.xml')
            .then(response => {
                let self = this;
                
                parseString(response.data, function (err, result) {
                    self.data = result.search.events[0].event

                    self.events = self.data.map(element => {
                        return { 
                            title: element.title.join(), 
                            id: element.$.id, 
                            date: element.start_time.join(), 
                            description: element.description.join(),
                            venue_name: element.venue_name.join(),
                            city_name: element.city_name.join() ,
                            date_picked: element.start_time.join() || null
                        }
                    });
                });
            }).catch(error => {
                console.log(error)
            })
        }
    },
    mounted(){
        this.getEvents()
    }
}
</script>

<style lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

</style>
