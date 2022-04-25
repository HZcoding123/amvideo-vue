import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局配置axios
const app = createApp(App)
import axios from 'axios'
app.config.globalProperties.$axios = axios

// 全局配置vue-cookies
import VueCookies from 'vue-cookies'
app.config.globalProperties.$cookies = VueCookies;

// 全局配置setttings
import settings from "./assets/js/settings"
app.config.globalProperties.$settings = settings;

// 配置element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

//配置bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap-theme.min.css'

app.use(store).use(router).mount('#app')
