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
        <ul class="nav navbar-nav">
          <li><a href="#">首页</a></li>
          <li><a href="#">生活</a></li>
          <li><a href="#">科技</a></li>
          <li><a href="#">娱乐</a></li>
          <li><a href="#">汽车</a></li>
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
    }
  },
  created() {
    this.username = this.$cookies.get('username');
    this.token = this.$cookies.get('token');
    this.icon = this.$cookies.get('icon');
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
    }
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
</style>
