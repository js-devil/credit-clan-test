<template>
    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"> Events on {{event.extendedProps.date_picked.slice(0, 10)}} </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{{ event.title }}</h5>
              <p v-html="event.extendedProps.description"></p>
            </div>
  
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><b>Venue Name:</b> {{ event.extendedProps.venue_name }}</li>
              <li class="list-group-item"><b>City Name:</b> {{ event.extendedProps.city_name }}</li>
              <li class="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props: {
        event: {
            type: Object
        },
    },
    methods: {
      isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
      }
    },
}
</script>

