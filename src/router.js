import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/weather",
      name: "weather",
      component: () =>
        import("./views/Weather.vue")
    },
    {
      path: "/weather-dashboard",
      name: "weatherdash",
      component: () =>
        import("./views/WeatherDashboard.vue")
    },
    {
      path: "/games",
      name: "games",
      component: () =>
        import("./views/Games.vue")
    },
    {
      path: "/quiz",
      name: "quiz",
      component: () =>
        import("./views/Quiz.vue")
    },
    {
      path: "/events",
      name: "events",
      component: () =>
        import("./views/Event.vue")
    }
  ]
});
