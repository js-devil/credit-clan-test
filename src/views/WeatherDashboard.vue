<template>
    <div class="row">
        <h1 class="header center orange-text">Weather Two</h1>
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
                    <th>Region Name</th>
                    <th @click="orderBy('country')">Country Name</th>
                    <th @click="orderBy('area')">Administrative Area Name</th>
                    <th @click="orderBy('timezone')">Timezone</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, i) in filterData" :key="i">
                    <td>{{ i+1 }}</td>
                    <td>{{ data.Region.EnglishName }}</td>
                    <td>{{ data.Country.EnglishName }}</td>
                    <td>{{ data.AdministrativeArea.EnglishName }}</td>
                    <td>{{ data.TimeZone.GmtOffset }}</td>
                    <td>{{ data.GeoPosition.Latitude }}</td>
                    <td>{{ data.GeoPosition.Longitude }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
</template>

<script>
import json from '../assets/json/weather.json'
import { filter } from 'minimatch';
export default {
    data() {
        return {
            weatherData: json,
            searchText: '',
            ascending: true,
        }
    },
    methods: {
        orderBy(order) {
            this.ascending = !this.ascending
            console.log(order)
            if(this.ascending){
                ( order == 'country') ?
                this.weatherData.sort((a, b) => (a.Country.EnglishName.toUpperCase()) > (b.Country.EnglishName.toUpperCase()) ? 1 : -1)
                : (order == 'area') ? this.filterData.sort((a, b) => (a.AdministrativeArea.EnglishName.toUpperCase()) > (b.AdministrativeArea.EnglishName.toUpperCase()) ? 1 : -1)
                : this.weatherData.sort((a, b) => (a.TimeZone.GmtOffset.toUpperCase()) > (b.TimeZone.GmtOffset.toUpperCase()) ? 1 : -1)
            }
            else {
                ( order == 'country') ?
                this.weatherData.sort((a, b) => (a.Country.EnglishName.toUpperCase()) < (b.Country.EnglishName.toUpperCase()) ? 1 : -1)
                : (order == 'area') ? this.filterData.sort((a, b) => (a.AdministrativeArea.EnglishName.toUpperCase()) < (b.AdministrativeArea.EnglishName.toUpperCase()) ? 1 : -1)
                : this.weatherData.sort((a, b) => (a.TimeZone.GmtOffset.toUpperCase()) < (b.TimeZone.GmtOffset.toUpperCase()) ? 1 : -1)
            }
        }
    },
    computed: {
        filterData() {
            return this.weatherData.filter(key => key.Region.EnglishName.toLowerCase().match(this.searchText.toLowerCase()) || key.AdministrativeArea.EnglishName.toLowerCase().match(this.searchText.toLowerCase()) || key.Country.EnglishName.toLowerCase().match(this.searchText.toLowerCase()))
        }
    },
    mounted(){
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
