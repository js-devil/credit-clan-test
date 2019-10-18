<template>
    <!-- Modal -->
<div class="modal fade" id="exampleTwoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"> Events on {{date_picked.slice(0, 10)}} </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="row">
            <br />
            <div class="col sm-3" v-for="(item, i) in events" :key="i">
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">{{ item.title }}</h5>
                  <p v-html="item.extendedProps.description"></p>
                </div>
      
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><b>Venue Name:</b> {{ item.extendedProps.venue_name }}</li>
                  <li class="list-group-item"><b>City Name:</b> {{ item.extendedProps.city_name }}</li>
                </ul>
              </div>
            <br />

            </div>
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
        events: {
          type: Array
        },
        date_picked: {
          type: String
        }
    },
}
</script>

