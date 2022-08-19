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
import settings from "./assets/js/settings";
app.config.globalProperties.$settings = settings;

// 全局引入element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

import * as Icons from '@element-plus/icons-vue'
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})

// 全局引入videoplayer
import VideoPlayer from "vue-video-player/src";
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css'
app.use(VideoPlayer)


// 全局引入评论组件库
// import DiscordPicker from 'vue3-discordpicker'
// app.use(DiscordPicker)


//配置bootstrap
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

app.use(store).use(router).mount('#app')
