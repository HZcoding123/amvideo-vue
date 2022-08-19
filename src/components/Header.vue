<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <a class="navbar-brand" href="#">
          <img class="logo" src="../assets/img/Amvideo.png">
        </a>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav" v-if="is_categoryShow">
          <li v-for="item in title">
            <span @click="page(item['id'])" :class="{active1:is_categoryClick[item['id']] === true, active2:is_categoryClick[item['id']] === false}">{{item['name']}}</span>
          </li>
        </ul>
        <form class="navbar-form navbar-left">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="搜索">
          </div>
          <a class="glyphicon glyphicon-search" aria-hidden="true"></a>
        </form>
            <img :src="icon" class="icon_1"  v-if="username">
            <ul class="nav navbar-nav navbar-right" v-else>
              <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a>
                <ul class="dropdown-menu">
                  <li><a @click="put_login"><el-icon style="font-size: 18px;top: 2px"><avatar /></el-icon> 账号登录</a></li>
                  <li><a href="#"><el-icon style="font-size: 18px;top: 2px"><chat-dot-round/></el-icon> 微信登录</a></li>
                  <li><a href="#"><el-icon style="font-size: 18px;top: 3px"><chat-dot-square /></el-icon> QQ登录</a></li>
                  <li role="separator" class="divider"></li>
                  <li><a @click="put_register"><el-icon style="font-size: 18px;top: 2px"><edit /></el-icon> 注册</a></li>
                </ul>
              </li>
            </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
  <Login v-if="is_login" @close="close_login" @loginsuccess="login_success" @change_login_register="change_login_register"/>
  <Register v-if="is_register" @close="close_register" @change_login_register="change_login_register" @loginsuccess="login_success"/>
</template>

<script>
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
export default {
  name: "Header",
  components: {
    Login,
    Register,
  },
  data() {
    return {
      url_path: sessionStorage.url_path || '/',
      isClick: false,
      is_login: false,
      is_register: false,
      username: '',
      token: '',
      icon: '',
      title: [],
      is_categoryShow: false,
      is_categoryClick: [false,],
      last_click: 0,
      default_cate:0,
    }
  },
  created() {
    this.username = this.$cookies.get('username');
    this.token = this.$cookies.get('token');
    this.icon = this.$cookies.get('icon');
  },
  beforeCreate() {
    // 组件一创建之前就发送请求给后台获取分类名称
    axios.get(this.$settings.base_url + '/video/category/').then(response=>{
      this.title = response.data['data'];
      this.is_categoryShow = true;
      for (let i = 0; i < this.title.length; i++) { // 遍历拿到的数据，往记录是否点击分类按钮的列表里面写入对应的false标记
        this.is_categoryClick[i+1] = false
        this.is_categoryClick[this.default_cate] = true
        if (this.default_cate !== 0){
          this.last_click = this.default_cate;
        }
      }
    })
  },
  methods: {
    close_login() {
      this.is_login = false;
    },
    put_login() {
      this.is_login = true;
    },
    login_success() {
      this.username = this.$cookies.get('username');
      this.token = this.$cookies.get('token');
      this.icon = this.$cookies.get('icon');
    },
    put_register() {
      this.is_register = true;
    },
    close_register() {
      this.is_register = false;
    },
    change_login_register() {
      if(this.is_login) {
        this.is_login = false;
        this.is_register = true;
        return
      }
      if(!this.is_login) {
        this.is_register = false;
        this.is_login = true;
      }
    },
    page(number){
      this.is_categoryClick[this.last_click] = false  // 将最后一个点击的分离按钮变成否
      this.is_categoryClick[number] = true   // 将正在点击的分类按钮变成真
      this.last_click = number  // 记录最后一次点击的是哪个按钮
      // 子组件传值给父组件
      this.$emit('change_page', number)
    },
    default_pick(type){
      this.default_cate = type
    },
  }
}
</script>

<style scoped>
.logo{
  margin-top: 10px;
}
.navbar-brand{
  padding-top: 0px;
}

.glyphicon{
  color: darkgray;
  font-size: 19px;
  margin-left: 10px;
  padding-bottom: -10px;
  top: 6px;
  text-decoration: none;
  cursor: pointer;
}

.glyphicon:hover{
  color: aliceblue;
}

.navbar-right{
  margin-right: 0px;
}

.glyphicon-user{
  margin-left: 0px;
}

.icon_1{
  float: right;
  margin-top: 5px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
}

.navbar{
  margin-bottom: 0px;
}

.active1{
  color: #ffc210;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.active2{
  color: white;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.active2:hover{
  color: #ffc210;
}

.navbar-nav{
  position: relative;
  top: 13px;
}
</style>
