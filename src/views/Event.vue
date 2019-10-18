<template>
    <div>
        {{events}}
    </div>
</template>

<script>
import axios from 'axios'
let parseString = require('xml2js').parseString;

export default {
    data() {
        return {
            events: [],
        }
    },
    methods: {
        getEvents () {
            axios('events.xml')
            .then(response => {
                let self = this;
                
                parseString(response.data, function (err, result) {
                  self.events = result
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

