<template>
  <div class="home">
      主页
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";

export default {
  name: 'Home',
  components: {

  },
  data() {

  },
  created() {
    axios.get('http://127.0.0.1:8000/user/test/', {
      params: {
        'name': 'william',
        'age': 27,
      }
    }).then(response=>{
      console.log(response)
    })
  },
}
</script>
