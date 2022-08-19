<template>
  <div class="home">
    <Header @change_page="change_data($event)"/>
    <Banner/>
    <br>
    <br>
    <Video ref="child"/>
    <Footer/>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Video from "../components/Video";
import Footer from "../components/Footer";

export default {
  name: 'Home',
  components: {
    Header,
    Banner,
    Video,
    Footer,
  },
  data() {

  },
  created() {
    // axios.get('http://127.0.0\.1:8000/user/test/', {
    //   params: {
    //     'name': 'william',
    //     'age': 27,
    //   }
    // }).then(response=>{
    //   console.log(response)
    // })
  },
  methods:{
    change_data(data){
      // 父组件接受一个子组件传递过来的值，调用另外一个子组件里面的值
      this.$refs.child.change_category(data)
    }
  }
}
</script>
