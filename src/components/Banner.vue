<template>
    <el-carousel :interval="3000" arrow="always" v-if="is_show">
      <el-carousel-item v-for="item in banner_list" :key="item">
        <img :src="item.img" class="banner">
      </el-carousel-item>
    </el-carousel>
</template>

<script>
import axios from "axios";

export default {
  name: "Banner",
  data() {
    return{
      banner_list: [],
      is_show: false,
    }
  },
  beforeCreate() {
    axios.get(this.$settings.base_url + '/home/banner/').then(response=>{
      this.banner_list = response.data['data']
      this.is_show = true
    })
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}


.banner{
  height: 300px;
}
</style>