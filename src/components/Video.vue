<template>
  <div class="row">
    <div class="col-sm-6 col-md-3" v-for="item in data_list">
      <router-link :to="{name:'Detail', params:{id:item.id,type:item.video_category,video_link:item.video_link}}">
        <img :src="item.video_img" class="video_img" alt="">
        <div class="duration">{{item.duration}}</div>
        <div class="caption">
          <p class="brief">{{item.brief}}</p>
        </div>
      </router-link>
      <div class="author">
        <span class="username">{{item.user.username}}</span>
        <span class="line">|</span>
        <el-icon class="icon"><ChatLineSquare /></el-icon>
        <span class="num">{{item.comment_num}}</span>
      </div>
    </div>
  </div>
  <nav aria-label="Page navigation" class="video_pagination">
    <ul class="pagination">
      <li>
        <a href="#" @click="update_video('pre')" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in total_page">
        <a href="#" @click="update_video(page)">{{page}}</a>
      </li>
      <li>
      <a href="#" @click="update_video('nex')" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "Video",
  data(){
    return {
      data_list:[],
      total_page: 0,
      current_pageNum: 1,
    }
  },
  created() {
    // video组件一创建就往后段发送get请求
    axios.get(this.$settings.base_url + '/video/all').then(response=>{
      this.data_list = response.data['data'];
      this.total_page = response.data['total_num'];
        }
    )
  },

  methods:{
    change_category(data) {
      // 父组件调用方法, 通过header组件点击分类来改变video数据
      axios.get(this.$settings.base_url + '/video/all', {
        params:{
          video_category: data,
        }
      }).then(response=>{
            this.data_list = response.data['data'];
            this.total_page = response.data['total_num'];
          }
      )
    },
    update_video(arg){  //  分页器页码判断处理
      if(arg === 'pre'){
        if(this.current_pageNum > 1){
          this.current_pageNum -= 1
        }
        arg = this.current_pageNum
      }
      if(arg === 'nex'){
        if(this.current_pageNum < this.total_page){
          this.current_pageNum += 1
        }
        arg = this.current_pageNum
      }
      axios.get(this.$settings.base_url + "/video/all/", {
        params:{
          page: arg,
        }
      }).then(res=>{
        this.data_list = res.data['data'];
      })
      this.current_pageNum = arg; // 记录当前所在的页码数
    },
  }
}
</script>

<style scoped>
.row{
  margin-left: 40px;
}

.col-sm-6{
  height: 265px;
  margin-top: 20px;
}

.brief{
  width: 242px;
  margin-top: 10px;
  cursor: pointer;
}

.brief:hover{
  color:#ffc210;
}

.duration{
  position: relative;
  /*right: 10px;*/
  /*bottom: 10px;*/
  width: 30px;
  margin-top: -30px;
  margin-left: 180px;
  /*right: 90px;*/
  z-index: 2;
  padding: 0 5px;
  min-width: 44px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #d7d7d7;
  text-align: center;
  background-color: rgba(0,0,0,0.7);
  border-radius: 2px;
}

.video_img{
  cursor: pointer;
}

.author{
  position: absolute;
  bottom: 0;
}

.username{
  font-size: 12px;
  color: #999;
  cursor: pointer;
}

.username:hover{
  color:#ffc210;
}

.icon{
  color: #999;
  margin-left: 8px;
  top: 3px;
}

.line{
  margin-left: 8px;
  font-size: 10px;
  color: #999;
}

.num{
  margin-left: 5px;
  font-size: 12px;
  color: #999;
}

.video_pagination{
  display: flex;
  justify-content:center;
  align-items:center;
}

</style>