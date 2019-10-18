<template>
    <div class="row">
        <div class="col sm-12">
            <h3> {{ gameMeta.current_page }} of {{gameMeta.total_pages}}</h3>
        </div>
        <div class="col-sm-4" v-for="(data, i) in gameData" :key="i">
            <!-- <div class="card"> -->
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">{{ data.home_team.full_name }} ({{ data.home_team_score }}) - ({{ data.visitor_team_score }}) {{ data.visitor_team.full_name }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ data.status }}</h6>
                        <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                        <!-- <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a> -->
                    </div>
                <!-- </div> -->
            </div>
            <br />
        </div>
        
       <div class="row">
            <div class="col-sm-6">
                <select @change="getPerPage($event)" class="form-control">
                    <option v-for="i in numbers" :key="i">{{ i }}</option>
                </select>
                <label>Select the number of data you want</label>
            </div>

            <div class="col-sm-6">
                <button class="btn btn-primary" v-if="gameMeta.next_page != gameMeta.total_pages" @click="getGameData(gameMeta.next_page, gameMeta.per_page)"> Next
                    <i class="material-icons right">send</i>
                </button>
            </div>   
        </div> 
        
    </div>
</template>

<style scoped>
.card .card-title {
    font-size: 18px;
    /* font-weight: 600; */
}

.s6{

}
</style>

<script>
const Endpoint = `https://free-nba.p.rapidapi.com/games`
import axios from 'axios'

export default {
    data() {
        return {
            gameData: [],
            gameMeta: [],
        }
    },
    computed: {
        numbers() {
            return Array.from(Array(100), (_,x) => x).filter((key => key%5 == 0 && key != 0))
        }
    },
    methods: {
        async getGameData (page, per_page) {
            if(!page){
                page = this.gameMeta.current_page || 1
            }

            if(!per_page) {
                per_page = 25
            }
            let response = await axios.get(`${Endpoint}?page=${page}&per_page=${per_page}`, {
                headers: {
                    'x-rapidapi-host': 'free-nba.p.rapidapi.com',
                    'x-rapidapi-key': 'bdac755d78msha920a8d278fd596p1adacbjsn1b1b384e667b'
                }
            })

            this.gameData = response.data.data
            this.gameMeta = response.data.meta
        },
        getPerPage(event){
            console.log(event.target.value)
            this.getGameData(this.gameMeta.current_page, event.target.value)
        }   
    },
    mounted() {
        this.getGameData()
    }
}
</script>

