<template>
    <div class="row">
        <h1 class="header center orange-text">Weather Dashboard</h1>
        <div class="col-12">
            <div class="search-wrapper">
                <input id="search" class="form-control" v-model="searchText" placeholder="Search" autocomplete="off">
                <i class="material-icons search-icon">search</i>
            </div>
            <br />
        </div>

        <div class="col s12">
            <!-- {{weatherData}} -->
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Weather</th>
                    <th @click="orderBy('country')">Imperial Temp</th>
                    <th @click="orderBy('area')">Metric Temp</th>
                    <th @click="orderBy('timezone')">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, i) in filterData" :key="i">
                    <td>{{ i+1 }}</td>
                    <td>{{ data.WeatherText }}</td>
                    <td>{{ data.Temperature.Imperial.Value }}<sup>o</sup>{{ data.Temperature.Imperial.Unit }}</td>
                    <td>{{ data.Temperature.Metric.Value }}<sup>o</sup>{{ data.Temperature.Metric.Unit }}</td>
                    <td>{{ new Date(data.EpochTime * 1000).toUTCString() }}</td>
                    
                </tr>
              </tbody>
            </table>
          </div>
        </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            weatherData: [],
            searchText: '',
            ascending: true,
        }
    },
    methods: {
        orderBy(order) {
            this.ascending = !this.ascending
            
        },
        async getData() {
            try {
                let response = await axios.get('http://dataservice.accuweather.com/currentconditions/v1/918392/historical/24?apikey=2NSFANp1wQVzyuCpwqMREzutkihng73x')
                this.weatherData = response.data
                console.log(response)

            } catch (err) {
                console.log(err)
            }
        }
    },
    computed: {
        filterData() {
            return this.weatherData.filter(key => key.WeatherText.toLowerCase().match(this.searchText.toLowerCase()) 
                    || key.Temperature.Metric.Value.toString().match(this.searchText.toString()) 
                    || key.Temperature.Imperial.Value.toString().match(this.searchText.toString()))
        }
    },
    mounted(){
        this.getData()
    }
}
</script>


<style scoped>
.search-wrapper {
    display: flex;
}

.search-icon {
    position: relative;
    top: 10px;
    left: -30px;
}
</style>
