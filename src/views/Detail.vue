<template>
  <Header ref="head"/>
  <div class="videoWrap">
    <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions">
<!--        @play="onPlayerPlay($event)"-->
<!--        @pause="onPlayerPause($event)"-->
<!--        @ended="onPlayerEnded($event)"-->
<!--        @waiting="onPlayerWaiting($event)"-->
<!--        @playing="onPlayerPlaying($event)"-->
<!--        @loadeddata="onPlayerLoadeddata($event)"-->
<!--        @timeupdate="onPlayerTimeupdate($event)"-->
<!--        @canplay="onPlayerCanplay($event)"-->
<!--        @canplaythrough="onPlayerCanplaythrough($event)"-->
<!--        @statechanged="playerStateChanged($event)"-->
<!--        @ready="playerReadied">-->
    </video-player>
  </div>
  <br><br><br><br>
  <comment/>
  <Footer class="foot"/>

</template>

<script>
import Header from "../components/Header";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import axios from "axios";


export default {
  name: "Detail",
  components:{
    Header,
    Comment,
    Footer,
  },

  data() {
    return {
      id: this.$route.params.id,
      type: this.$route.params.type,
      playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4", // 类型
          src: this.$settings.base_url + '/' + this.$route.params.video_link, //url地 this.$settings.base_url + '/' + this.$route.params.video_link
        }],
        poster: "", // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 时间分割线
          durationDisplay: true, // 总时间
          remainingTimeDisplay: true, // 剩余播放时间
          progressControl: true, // 进度条
          fullscreenToggle: true  // 全屏按钮
        }
      }
    }
  },

  mounted() {  // 组件挂载后 真实dom被渲染出来 这个时候才能操作dom
    this.send_header()
  },

  beforeUnmount() {
    this.$refs.videoPlayer.dispose() // 离开播放页面后将视频子组件消亡
  },

  methods:{
    send_header(){
      this.$refs.head.default_pick(this.type);
    }
  },
}
</script>

<style scoped>
.videoWrap{
  width: 800px;
  height: 450px;
  margin: 0 auto;
  margin-top: 30px;
}

.foot{
  margin-top: 200px;
}
</style>