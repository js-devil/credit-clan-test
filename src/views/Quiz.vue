<template>
    <div class="row">
                <!-- <input value='option' ref='option' type='radio' /> option -->
        <div class="row">
            <div class="col-md-6">
                <h3 class="header">Quiz App</h3>
            </div>

            <div class="col-md-6">
                <select class="form-control" @change="displayQues($event)">
                    <option :value="item.id" :selected="item.id == 1" v-for="(item, i) in questions" :key="i">
                        {{item.name}}
                    </option>
                    <label>slsll</label>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <h2 class="header center orange-text">{{ question.name }}</h2>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-12">
            <div v-for="(item, i) in question.questions" :key="i">
                <div v-if="i+1 == currentNo">
                    <span>Question {{i+1}} of {{question.questions.length}}</span>

                    <div v-if="i+1 == currentNo">{{ item.name }}</div>
                    <div v-if="i+1 == currentNo" class="row">
                        <label class="col-sm-6 option" v-for="(option, j) in item.options" :key="j">
                            <input :value='option.name' :name="item.id" ref='options' type='radio' @click="mark(option.isAnswer)" /> {{ option.name }}
                        </label>
                    </div>
                </div>

                <br  v-if="i+1 == currentNo" />

                <div v-if="i+1==question.questions.length" style="display: flex; justify-content: space-evenly; width: 40%;">
                    <button class="btn btn-outline-primary" v-if="currentNo !=1 " @click="currentNo=1">First</button>
                    <button class="btn btn-outline-primary" v-if="currentNo != 1 " @click="currentNo != 1 ? currentNo = currentNo-1 : null">Prev</button>
                    <button class="btn btn-outline-primary" v-if="currentNo<question.questions.length" @click="currentNo = currentNo+1">Next</button>
                    <button class="btn btn-outline-primary" v-if="currentNo<question.questions.length" @click="currentNo=question.questions.length">Last</button>
                </div>
            </div>
                
            <br />

                <div>
                    <button class="btn btn-success btn-lg" @click="showScore(question.questions.length)"> Submit </button>
                </div>
                
            </div>
        </div>
        

    </div>
</template>

<script>
import aspnet from '../assets/json/aspnet.json'
import csharp from '../assets/json/csharp.json'
import design from '../assets/json/designPatterns.json'
import js from '../assets/json/javascript.json'

export default {
    data() {
        return {
            questions: [
                aspnet, csharp, design, js,
            ],
            question: {},
            score: 0,
            currentNo: 1,
        }
    },
    methods: {
        displayQues(event){
            this.score = 0;
            for(let i in this.$refs.options) {
                this.$refs.options[i].checked = false
            }

            this.question = this.questions.filter(key => key.id == event.target.value)[0]
        },
        mark(answer){
            if(answer){
                this.score++;
            }
        },
        showScore(len) {
            alert(`You scored ${this.score} out of ${len}`)
        }
    },
    mounted() {
        this.question = this.questions.filter(key => key.id == 1)[0]
        console.log(this.questions)
    }
}
</script>

<style>
.option {
    background: #f5f5f5;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    max-width: 20%;
}
</style>
