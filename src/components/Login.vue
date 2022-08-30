<template>
  <div class="login">
    <div class="popup-content">
      <div class="close-btn">
        <el-icon style="color: white; font-size: 20px" @click="close_login"><close-bold /></el-icon>
      </div>
      <div class="signin">
        <ul>
          <li :class="{active: login_method === 'is_pwd'}" @click="change_login_methods('is_pwd')">密码登录</li>
          <li :class="{active: login_method === 'is_sms'}" @click="change_login_methods('is_sms')">短信登录</li>
        </ul>
        <div v-if="login_method === 'is_pwd'">
          <div class="username inputcontain">
            <img src="//hcdn2.luffycity.com/media/frontend/index/shouji@1x_1560849098.2282765.svg" alt="">
            <input type="text" maxlength="20" autocomplete="off" placeholder="用户名/手机号/邮箱" v-model="username">
          </div>
          <div class="password inputcontain">
            <img src="//hcdn2.luffycity.com/media/frontend/index/mima-4@1x_1560849097.9023619.svg" alt="">
            <input maxlength="20" autocomplete="off" placeholder="密码" type="password" v-model="password">
          </div>
          <button @click="login_pwd">登录</button>
        </div>
        <div v-if="login_method === 'is_sms'">
          <div class="mobile inputcontain">
            <img src="//hcdn2.luffycity.com/media/frontend/index/shouji@1x_1560849098.2282765.svg" alt="">
            <input type="text" maxlength="20" placeholder="手机号" v-model="mobile" @blur="check_mobile">
          </div>
          <div class="checkword inputcontain">
            <img src="//hcdn2.luffycity.com/media/frontend/index/yanzhengma-7@1x_1560849098.1486425.svg" alt="">
            <input maxlength="6" placeholder="验证码" type="text" v-model="sms">
            <span class="inline">|</span>
            <span class="link-btn" @click="send_sms">{{sms_interval}}</span>
          </div>
          <button @click="login_sms">登录</button>
        </div>
        <div class="other-way">
          <div @click="change_login_register"><span class="link-btn">立即注册</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      login_method: 'is_pwd',
      username: '',
      password: '',
      sms: '',
      mobile:'',
      sms_interval: '获取验证码',
      is_send: false,
      is_login: false
    }
  },
  methods: {
    close_login() {
      this.$emit('close')
    },
    change_login_methods(method) {
      this.login_method = method;
    },
    send_sms() {
      if(!this.mobile){
        this.$message({
          message: '手机号不能为空',
          type: 'warning',
          duration: 1000,
        });
        return
      }
      if(!this.is_send){
        return
      };
      // 判断手机不能为空
      this.is_send = false;
      axios.get(this.$settings.base_url + '/user/check/',{
        params: {
          'telephone': this.mobile
        }
      }).then(response=>{
        if(response.data.code === 100){
          let sms_interval_time = 60;
          this.sms_interval = '发送中...';
          let timer = setInterval(() => {
            if (sms_interval_time <= 1) {
              clearInterval(timer);
              this.sms_interval = "获取验证码";
              this.is_send = true; // 重新回复点击发送功能的条件
            } else {
              sms_interval_time -= 1;
              this.sms_interval = `${sms_interval_time}s`;
            }
          }, 1000);
          axios.get(this.$settings.base_url + '/user/send/',
              {
                      params: {
                        'telephone': this.mobile
                      }
              }).then(response=>{
          })
        }else{
          this.$message({
            message: '手机号不存在',
            type: 'warning',
            duration: 1000,
            onClose: ()=>{
              this.mobile = '';
            }
          });
        }
      });
    },
    check_mobile() {
      // 当失去焦点后，会字自动执行这个方法
      if (!this.mobile){
        return
      }
      if (!this.mobile.match(/^1[3-9][0-9]{9}$/)){
        this.is_login = false;
        this.$message({
          message: '手机号有误',
          type: 'warning',
          duration: 1000,
          onClose:()=>{
          this.mobile = '';
        }
        });
        return false
      }
      this.is_send = true;
      this.is_login = true;
    },
    login_pwd() {
      if(!this.username || !this.password){
        this.$message({
          message: '账号密码不能为空',
          type: 'warning',
          duration: 1000
        })
        return
      }
      axios.post(this.$settings.base_url + '/user/login/', {
        username: this.username,
        password: this.password,
      }).then(response=> {
        if(response.data.code === 100){
          this.$cookies.set('username', response.data.username, '7d')
          this.$cookies.set('token', response.data.token, '7d')
          let icon = this.$settings.base_url + '/media/' + response.data.icon + '/'
          this.$cookies.set('icon', icon, '7d')
          this.close_login()
          // 给父组件head传递一个事件，让它从cookie中取出来token和username
          this.$emit('loginsuccess')
        }
        if(response.data.code === 0){
          this.$message({
            message: response.data.result['non_field_errors'][0],
            type: 'warning',
            duration: 1000,
            onClose:()=>{
              this.username = '';
              this.password = '';
            }
          })
        }
          });
    },
    login_sms() {
      if(!this.sms){
        this.$message({
          message: '验证码不能为空',
          type: 'warning',
          duration: 1000,
        });
        return false
      }

      if(!this.mobile){
        this.$message({
          message: '手机号不能为空',
          type: 'warning',
          duration: 1000,
        });
        return false
      }
      if(!this.is_login){
        return
      }
      axios.post(this.$settings.base_url + '/user/code/', {
        telephone: this.mobile,
        code: this.sms,
      }).then(response=>{
        if(response.data.code === 100){
          this.$cookies.set('username', response.data.username, '7d')
          this.$cookies.set('token', response.data.token, '7d')
          let icon = this.$settings.base_url + '/media/' + response.data.icon + '/'
          this.$cookies.set('icon', icon, '7d')
          this.close_login()
          this.$emit('loginsuccess')
        }
        if(response.data.code === 0){
          this.$message({
            message: response.data.result['non_field_errors'][0],
            type: 'warning',
            duration: 1000,
            onClose:()=>{
              this.mobile = '';
              this.sms = '';
            }
          })
        }
      });
    },
    change_login_register() {
      this.$emit('change_login_register')
    }
  }
}
</script>

<style scoped>
.login{
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.75);
  z-index: 100;
}

.popup-content{
  width: 400px;
  height: auto;
  background: rgba(0,0,0,.10);
  border-radius: 4px;
  text-align: center;
  padding: 38px 38px 58px;
  box-sizing: border-box;
  position: relative;
}

.close-btn{
  width: 26px;
  height: 26px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

.signin{
  width: 100%;
  height: auto;
}

.signin ul{
  width: 324px;
  display: flex;
  justify-content: center;
}

 ol, ul {
   margin: 0;
   padding: 0;
   list-style: none;
 }

.popup-content .signin ul .active{
  color: #ffc210;
  border-bottom: 1px solid #ffc210;
}

.input_active{
  border: 1px solid #ffc210;
}

.popup-content .signin ul li{
   width: 50%;
   font-size: 16px;
   font-weight: 500;
   color: #4a4a4a;
   cursor: pointer;
   padding-bottom: 20px;
   border-bottom: 1px solid #e9e9e9;
 }

li {
  list-style: none;
}

div, h1, h2, h3, h4, h5, h6, p, section, span {
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
}

.popup-content .signin .username{
  border: 1px solid #ddd;
  padding-left: 15px;
  display: flex;
  align-items: center;
  margin-top: 40px;
  position: relative;
}

.popup-content .signin .username img{
  width: 14px;
}
img {
  border: 0;
  vertical-align: middle;
}
a, img {
  -webkit-touch-callout: none;
}
img {
  border-style: none;
  display: inline-block;
}

*, :after, :before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.popup-content .signin .username input{
  flex: 1;
  margin-left: 12px;
  font-size: 14px;
  height: 34px;
  border: none;
}

button, input, textarea {
  font: inherit;
  background: rgba(0,0,0,.10);
  color: white;
}

input, select, textarea {
  border: none;
  outline: none;
}

.popup-content .signin .password{
  border: 1px solid #ddd;
  padding-left: 15px;
  display: flex;
  align-items: center;
  margin-top: 40px;
  position: relative;
}

.popup-content .signin .password img{
  width: 14px;
}

.popup-content .signin .password input{
  flex: 1;
  margin-left: 12px;
  font-size: 14px;
  height: 34px;
  border: none;
}

.popup-content .signin button{
  width: 324px;
  height: 42px;
  background: #ffc210;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-top: 30px;
  font-family: PingFangSC-Regular;
  letter-spacing: 1px;
}

button {
  outline: none;
}

button {
  cursor: pointer;
  border: none;
  background: transparent;
}

.popup-content .signin .other-way{
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.popup-content .signin .other-way span{
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: #aaa;
  font-family: PingFangSC-Regular;
}

.popup-content .signin .link-btn{
   color: #ffc220!important;
   cursor: pointer;
}

.popup-content .signin .mobile{
  border: 1px solid #ddd;
  padding-left: 15px;
  display: flex;
  align-items: center;
  margin-top: 40px;
  position: relative;
}

.popup-content .signin .mobile input{
  flex: 1;
  margin-left: 12px;
  font-size: 14px;
  height: 34px;
  border: none;
}

.popup-content .signin .checkword{
  border: 1px solid #ddd;
  padding-left: 15px;
  display: flex;
  align-items: center;
  margin-top: 40px;
  position: relative;
}

.popup-content .signin .checkword img{
  width: 14px;
}

.popup-content .signin .checkword input{
  flex: 1;
  margin-left: 12px;
  font-size: 14px;
  height: 34px;
  border: none;
}

.popup-content .signin .checkword span{
  font-size: 14px;
  font-weight: 400;
  color: #d8d8d8;
  margin-right: 15px;
}
</style>