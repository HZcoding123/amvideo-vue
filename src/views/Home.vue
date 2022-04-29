<template>
  <div class="home">
    <Header/>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header";

export default {
  name: 'Home',
  components: {
    Header,
  },
  data() {

  },
  created() {
    // axios.get('http://127.0.0.1:8000/user/test/', {
    //   params: {
    //     'name': 'william',
    //     'age': 27,
    //   }
    // }).then(response=>{
    //   console.log(response)
    // })
  },
}
</script>
