<template>
    <div class="word-list">
            <div class="wordList-til">单词本</div>
            <div class="wordList-main">
                <div class="wordList-nav">
                    <ul>
                        <li><router-link to="/word/collect" active-class="wordList-navAction">重难点单词<i class="bi bi-star-fill"></i></router-link>
                        </li>
                        <li><router-link to="/word/learn" active-class="wordList-navAction">已学会的单词<i class="bi bi-tags-fill"></i></router-link></li>
                    </ul>
                    <div class="wordList-search">
                        <div class="wordSearch-container">
                            <i class="bi bi-search"></i>
                            <input type="text" placeholder="查找单词" v-model="searchWords" />
                        </div>
                    </div>
                </div>
                <!-- <keep-alive> -->
                <router-view :searchWords="this.searchWords"></router-view>
                <!-- </keep-alive> -->
            </div>
        </div>
</template>

<script>
export default {
  name:'Word',
  data() {
    return {
      searchWords:'',
    }
  },
}
</script>

<style>
.word-list{
  width: 600px;
  height: 720px;
  margin: 0 auto;
  transform: translate(4%, -2%);
}

.word-list .wordList-til {
  margin: 32px 16px 24px;
  color: #2c3143;
  font-size: 22px;
}

.word-list .wordList-main {
  height: 510px;
  width: 100%;
  background-color: #fff;
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 2px 4px 8px 0 rgb(0 0 0 / 20%);
  overflow: hidden;
  transition: all 0.4s;
}

.word-list .wordList-main .wordList-nav{
  width: 100%;
  height: 14%;
  background-color: #eef0f4;
}

.word-list .wordList-main .wordList-nav ul{
  float: left;
  width: 50%;
  height: 100%;
}

.word-list .wordList-main .wordList-nav ul li{
  float: left;
  width: 50%;
  height: 100%;
  
}

.word-list .wordList-main .wordList-nav ul li a{
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 71px;
  color: #626c91;
  border-right: 1px solid #d5dbe5;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.25s;
}

.word-list .wordList-main .wordList-nav ul li a.wordList-navAction{
  background-color: #fff;
}

.word-list .wordList-main .wordList-nav ul li a.wordList-navAction > i{
  color: #faaa5a;
}

.word-list .wordList-main .wordList-nav .wordList-search{
  float: left;
  width: 50%;
  height: 100%;
  padding: 23px 38px;
}

.word-list .wordList-main .wordList-nav .wordList-search .wordSearch-container{
  width: 224px;
  height: 28px;
  border:#dcdcdc 1px solid;
  border-radius: 6px;
  line-height: 25px;
}

.word-list .wordList-main .wordList-nav .wordList-search .wordSearch-container i {
  color: #808080;
  margin: 0 4px 0 8px;
  font-size: 15px;
}
.word-list .wordList-main .wordList-nav .wordList-search .wordSearch-container input{
  width: 189px;
  height: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: 500;
}

.word-list .wordList-main .wordList-content {
  width: 100%;
  height: 86%;
  padding: 3% 3%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  align-content: flex-start;
}

.word-list .wordList-main .wordList-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
}

/*定义滚动条轨道 内阴影+圆角*/
.word-list .wordList-main .wordList-content::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  border-radius: 8px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
.word-list .wordList-main .wordList-content::-webkit-scrollbar-thumb {
  border-radius: 8px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  background-color: #c8c8c8;
}

.word-list .wordList-main .wordList-content .wordItem{
  float: left;
  width: 32%;
  min-height: 65px;
  max-height: 200px;
  margin-right: 2%;
  margin-bottom: 2%;
  padding: 0.5% 2%;
  border:#e5e5e5 1px solid;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.25s;
}

.word-list .wordList-main .wordList-content .wordItem:nth-child(3n){
  margin-right: 0;
}

.word-list .wordList-main .wordList-content .wordItem .wordItem-word{
  height: 36px;
  font-size: 20px;
  color: #037889;
}

.word-list .wordList-main .wordList-content .wordItem .wordItem-word>i:nth-of-type(2) {
  color: #037889;
  cursor: pointer;
  font-size: 20px;
}

.word-list .wordList-main .wordList-content .wordItem .wordItem-word > i:nth-child(2){
  float: right;
  font-size: 16px;
  color: #b9bbc0;
  line-height: 36px;
  cursor: pointer;
  transition: all 0.25s;
}

.word-list .wordList-main .wordList-content .wordItem .wordItem-word>i:nth-child(2):hover {
  color: #037889;
}

.word-list .wordList-main .wordList-content .wordItem .wordItem-tran{
  height: 21px;
  color: #2c312c;
}

.word-list .wordList-main .wordList-content .wordItem .wordItem-tran i{
  float: right;
  cursor: pointer;
}

.word-list .wordList-main .wordList-content .wordItem .wordItem-details{
  font-size: 12px;
  color: #2c312c;
}

</style>