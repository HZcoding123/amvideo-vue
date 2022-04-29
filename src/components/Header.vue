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
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a>
            <ul class="dropdown-menu">
              <li><a @click="put_login"><el-icon style="font-size: 18px;top: 2px"><avatar /></el-icon> 账号登录</a></li>
              <li><a href="#"><el-icon style="font-size: 18px;top: 2px"><chat-dot-round/></el-icon> 微信登录</a></li>
              <li><a href="#"><el-icon style="font-size: 18px;top: 3px"><chat-dot-square /></el-icon> QQ登录</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#"><el-icon style="font-size: 18px;top: 2px"><edit /></el-icon> 注册</a></li>
            </ul>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
  <Login v-if="is_login" @close="close_login"/>
</template>

<script>
import Login from "./Login";
export default {
  name: "Header",
  components: {Login},
  data() {
    return {
      url_path: sessionStorage.url_path || '/',
      isClick: false,
      is_login: false,
    }
  },
  methods: {
    close_login() {
      this.is_login = false;
    },
    put_login() {
      this.is_login = true;
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
</style>
