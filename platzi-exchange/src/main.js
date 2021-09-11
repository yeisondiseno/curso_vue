import { createApp } from "vue";
// router
import router from "@/router";
// libraries
import VueChartkick from "vue-chartkick";
import { VueSpinners } from "@saeris/vue-spinners";
import "chartkick/chart.js";
// components
import App from "./App.vue";
// assets
import filters from "@/filters";
// styles
import "@/assets/css/tailwind.css";

const app = createApp(App).use(router);
app.use(VueChartkick);
app.use(VueSpinners);
app.config.globalProperties.$filters = filters;
app.mount("#app");
