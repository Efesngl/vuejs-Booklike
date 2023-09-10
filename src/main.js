import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {pinia} from "./pinia.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import router from "./routes.js";
import {ax} from "./axiosInstance"
import AppNavbar from "./components/Shared/AppNavbar.vue";
const app = createApp(App);
app.config.globalProperties.$axios = ax;
app.use(pinia);
app.use(router);
app.component("Navbar", AppNavbar);
app.mount("#app");
