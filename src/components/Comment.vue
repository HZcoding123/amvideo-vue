<template>
  <div class="main-text">
    <img src="http://127.0.0.1:8000/media/default.png" class="comment_icon">
    <textarea class="text" placeholder="说点什么吧..." v-model="this.content" ref="textarea"></textarea>
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
</template>

<script>
import axios from "axios";

export default {
  name: "Comment",
  components:{

  },

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
    }
  },

  methods:{
    pickEmoji(idx) {
      console.log(this.emoji_icon[idx])
      console.log(this.$refs.textarea.selectionStart)
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
    send_content(){
      // console.log(this.content)
      axios.post(this.$settings.base_url + '/video/comment/',{
        content:this.content,
      })
    },
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
  margin-bottom: 10px;
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


</style>