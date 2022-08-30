<template>
  <div class="main-text">
    <img :src="comment_icon" class="comment_icon">
    <textarea class="text" placeholder="说点什么吧..." v-model="this.content" ref="textarea" @focus="start_edit"></textarea>
    <span @click="change_bg" :class="{addface1:is_clickFace === false, addface2:is_clickFace === true}"></span>
    <button class="el-button el-button--success" aria-disabled="false" type="button" @click="send_content">
      <span class="">发表</span>
    </button>
  </div>
  <div class="emoji-Bigbox" v-if="is_faceShow">
    <span class="glyphicon glyphicon-triangle-top"></span>
    <el-scrollbar ref="emojiScroll" class="emojiScroll">
      <div class="emoji-box"
           v-for="(item, index) in emoji_icon"
           :key="index"
           @click="pickEmoji(index)">
        {{ item }}
      </div>
    </el-scrollbar>
  </div>
  <div class="comment_list">
    <span class="comment_title">热门评论</span>
    <div class="comment_detail" v-for="item in comment_data">
      <img  :src="item.user.icon" class="comment_list_icon">
      <span class="comment_username">{{item.user.username}}</span>
      <span class="comment_content">{{item.content}}</span>
      <span class="comment_time">{{item.comment_time.substring(0,9) + ' ' + item.comment_time.substring(11,16)}}</span>
      <el-icon class="edit" @click="start_son_comment"><Edit/></el-icon>
<!--      <div class="son-text" v-if="is_showTextarea">-->
<!--        <textarea class="text" placeholder="说点什么吧..." v-model="this.son_comment" ref="textarea" @focus="start_edit"></textarea>-->
<!--        <span @click="change_bg" :class="{addface1:is_clickFace === false, addface2:is_clickFace === true}"></span>-->
<!--        <button class="el-button el-button&#45;&#45;success" aria-disabled="false" type="button" @click="send_content">-->
<!--          <span class="">发表</span>-->
<!--        </button>-->
<!--      </div>-->
      <hr/>
    </div>
  </div>
  <Login v-if="is_showLogin" @close="close_login" @loginsuccess="login_success"/>
</template>

<script>
import axios from "axios";
import Login from "./Login";
export default {
  name: "Comment",
  components:{
    Login,
  },

  props: ['videoId'], // 子组件里面声明数据，用于父组件传值给子组件

  data(){
    return{
      emoji_icon: ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "😍", "🤩", "😘",
        "😗", "😚", "😙", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶",
        "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴","😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😵", "🤯",
        "🤠", "😎", "🤓", "🧐", "😕", "😟", "🙁", "😮", "😯", "😲", "😳", "😦", "😧", "😨", "😰", "😥", "😢", "😭",
        "😱", "😖", "😣", "😞", "😓", "😩", "😫", "😤", "😡", "😠", "🤬",
      ],
      is_clickFace: false,
      is_faceShow: false,
      content:'',
      is_showLogin: false,
      comment_icon: this.$settings.base_url + '/media/default.png',
      is_showTextarea:false,
      son_comment:'',
      comment_data:[],
    }
  },

  created() {
    if(this.$cookies.get('icon')){
      this.comment_icon = this.$cookies.get('icon')
    }
    axios.get(this.$settings.base_url + '/video/getcomment/',{
      params: {
        'video': this.videoId
      }
    }).then(res=>{
      // let data_list = res.data['data']
      // for (let i = 0; i < data_list.length; i++) {
      //   data_list[i].comment_time = data_list[i].comment_time[:9]
      // }
      this.comment_data = res.data['data']
    })
  },

  methods:{
    pickEmoji(idx) { // 选择表情后将表情显示在评论框内, 并且不让光标自动回到最后
      this.content = this.content.substring(0,this.$refs.textarea.selectionStart) + this.emoji_icon[idx] + this.content.substring(this.$refs.textarea.selectionStart)
      setTimeout(this.pick_mouse_pos, 100, this.$refs.textarea.selectionStart+2,this.$refs.textarea.selectionStart+2)
    },
    change_bg(){
      if (this.is_clickFace === false){
        this.is_clickFace = true
        this.is_faceShow = true
      }else {
        this.is_clickFace = false
        this.is_faceShow = false
      }
    },
    pick_mouse_pos(start,end){
      this.$refs.textarea.focus()
      this.$refs.textarea.setSelectionRange(start,end)
    },
    send_content(){ //  发送评论
      if(this.$cookies.get('token') === null){// 判断是否登录
        this.is_showLogin = true
        return
      }
      if(this.content === ''){ // 判断是否为空
        this.$message({
          message: '评论内容不能为空',
          type: 'warning',
          duration: 1000
        })
        return
      }
      axios.post(this.$settings.base_url + '/video/savecomment/',{// 判断通过后开始发送请求
        content:this.content,
        video: this.videoId,
      },{headers:{'Authorization': 'JWT' + ' ' + this.$cookies.get('token')}}).then(res=>{
        console.log(res) // 评论发表成功后回调， 清空评论框内容，刷新评论组件，显示最新评论
      })
    },
    start_edit(){
      if(this.$cookies.get('token') === null){
        this.is_showLogin = true  // 如果编辑框被聚焦，那么就直接显示登录框
      }
    },
    close_login(){
      this.is_showLogin = false
    },
    login_success(){  // 登录成功后会自动回调
      this.comment_icon = this.$cookies.get('icon')
      this.$emit('comment_login_success')
    },
    start_son_comment(){
      this.is_showTextarea = !this.is_showTextarea
    }
  },
}
</script>

<style scoped>
.text{
  width: 800px;
  height: 65px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  padding: 10px;
  border: 1px solid #d7d7d7;
  outline:none;
}

.main-text{
  height: 65px;
  width: 900px;
  /*position: absolute;*/
  left: 0;
  right: 0;
  margin: auto;
}

.son-text{
  height: 65px;
  width: 800px;
  /*position: absolute;*/
  left: 0;
  right: 0;
  margin: auto;
}

.comment_icon{
  display: inline;
  margin-top: 10px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
}

.emoji-Bigbox {
  position: absolute;
  /*display: flex;*/
  height: 220px;
  background: #f0f0f0;
  border-radius: 10px;
  width: 800px;
  top: 730px;
  left: 0;
  right: 0;
  margin: auto;
  /*margin-top: 50px;*/
  z-index: 2;
  /*// display: flex;*/
  /*// flex-direction: row;*/
  /*// flex-wrap: wrap;*/
  /*// overflow-y: scroll;*/
}

el-scrollbar {
  overflow-y: hidden !important;
}

.emojiScroll{
  height: 220px;
}

.emoji-box {
  display: inline-block;
  width: 40px;
  height: 40px;
  font-size: 28px;
  /*// border: 1px solid red;*/
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
}

.glyphicon{
  color: #f0f0f0;

  /*display: block;*/
  /*margin-left: 100px;*/
  /*margin-bottom: -8px;*/
  font-size: 30px;
  margin-top: -30px;
  margin-left: 10px;
}

.addface1{
  width: 20px;
  height: 20px;
  display: block;
  margin-left: 65px;
  margin-top: 25px;
  background-image: url(../assets/img/img_1.png);
  background-repeat: no-repeat;
  background-size: 20px auto;
  background-position: 0 -40px;
  cursor: pointer;
}

.addface2{
  width: 20px;
  height: 20px;
  display: block;
  margin-left: 65px;
  margin-top: 25px;
  background-image: url(../assets/img/img_1.png);
  background-repeat: no-repeat;
  background-size: 20px auto;
  background-position: 0 -62px;
  cursor: pointer;
}


.exam{
  margin-top: 50px;
}

.el-button{
  margin-left: 790px;
  margin-top: -18px;
}

.comment_list{
  width: 800px;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 100px;
}

.comment_title{
  display: block;
  text-align: center;
}

.comment_list_icon{
  display: inline;
  margin-top: 10px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
}

.comment_username{
  display: inline;
  margin-left: 15px;
  color: #ffc210;
}

.comment_content{
  display: block;
  margin-left: 50px;
  margin-top: -8px;
}

.comment_time{
  display: inline-block;
  color: #999999;
  font-size: 10px;
  margin-left: 50px;
  margin-top: 10px;
}


.edit{
  float: right;
  cursor: pointer;
}

</style>