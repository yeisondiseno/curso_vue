import  { createApp } from "vue";
// router
import router from "@/router";
// components
import App from "./App.vue";
// assets 
import filters from "@/filters";
// styles
import "@/assets/css/tailwind.css";

const app = createApp(App).use(router)
app.config.globalProperties.$filters = filters
app.mount("#app");