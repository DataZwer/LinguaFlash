<template>
  <div class="left-nav">
    <ul>
      <!-- <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
				<el-button>右边</el-button>
			</el-tooltip> -->
      <li>
        <a href="javascript:"
          ><i class="bi bi-box"></i><strong>LinguaFlash</strong></a
        >
      </li>
      <li class="left-nav-li">
        <el-tooltip
          class="item"
          effect="dark"
          content="控制台"
          placement="right"
          transition="ease-in"
        >
          <router-link to="/control" active-class="active">
            <i class="bi bi-house"></i><strong>控制台</strong>
          </router-link>
        </el-tooltip>
      </li>
      <li class="left-nav-li">
        <el-tooltip
          class="item"
          effect="dark"
          content="词卡"
          placement="right"
          transition="ease-in"
        >
          <router-link to="/card" active-class="active">
            <i class="bi bi-card-checklist"></i><strong>词卡</strong>
          </router-link>
        </el-tooltip>
      </li>
      <li class="left-nav-li">
        <el-tooltip
          class="item"
          effect="dark"
          content="拼写练习"
          placement="right"
          transition="ease-in"
        >
          <router-link to="/spell" active-class="active">
            <i class="bi bi-spellcheck"></i><strong>拼写练习</strong>
          </router-link>
        </el-tooltip>
      </li>
      <li class="left-nav-li">
        <el-tooltip
          class="item"
          effect="dark"
          content="选词填空"
          placement="right"
          transition="ease-in"
        >
          <router-link to="/choice" active-class="active">
            <!-- <i class="bi bi-terminal"></i> -->
            <i class="bi bi-list-task"></i>
            <strong>选词填空</strong>
          </router-link>
        </el-tooltip>
      </li>
      <li class="left-nav-li">
        <el-tooltip
          class="item"
          effect="dark"
          content="帐户"
          placement="right"
          transition="ease-in"
        >
          <router-link to="/user" active-class="active">
            <i class="bi bi-person"></i><strong>帐户</strong>
          </router-link>
        </el-tooltip>
      </li>

      <li class="left-nav-li">
        <el-tooltip
          class="item"
          effect="dark"
          content="常见问题"
          placement="right"
          transition="ease-in"
        >
          <a href="javascript:">
            <i class="bi bi-question-circle"></i><strong>常见问题</strong>
          </a>
        </el-tooltip>
      </li>
      <li class="left-nav-li">
        <el-tooltip
          class="item"
          effect="dark"
          content="重难点单词"
          placement="right"
          transition="ease-in"
        >
          <router-link to="/word/collect" active-class="active">
            <div class="span">
              <i class="bi bi-star-fill"></i
              ><span>{{ userInfo.collect_words }}</span>
            </div>
            <strong>重难点单词</strong>
            <!-- <i class="bi bi-star-fill"></i><span>{{userInfo.collect_words}}</span><strong>重难点单词</strong> -->
          </router-link>
        </el-tooltip>
      </li>
      <li class="left-nav-li">
        <el-tooltip
          class="item"
          effect="dark"
          content="已学会的单词"
          placement="right"
          transition="ease-in"
        >
          <router-link to="/word/learn" active-class="active">
            <!-- <i class="bi bi-tags-fill"></i><span>{{userInfo.learned_words}}</span><strong>已学会的单词</strong> -->
            <div class="span">
              <i class="bi bi-tags-fill"></i
              ><span>{{ userInfo.learned_words }}</span>
            </div>
            <strong>已学会的单词</strong>
          </router-link>
        </el-tooltip>
      </li>
      <li class="left-nav-li">
        <el-tooltip
          class="item"
          effect="dark"
          content="设置"
          placement="right"
          transition="ease-in"
        >
          <a href="javascript:">
            <i class="bi bi-gear"></i><strong>设置</strong>
          </a>
        </el-tooltip>
      </li>
      <li>
        <a href="javascript:">
          <i class="bi bi-arrow-right-short"></i><strong>隐藏面板</strong>
        </a>
      </li>
    </ul>
    <!--<i class="bi bi-arrow-left-short"></i> -->
  </div>
</template>

<script>
  import { mapState } from "vuex";
import { leftSlide, NavSwitch } from "../../js/HomeNav/index";
export default {
  name: "HomeNav",
  props: {
    msg: String,
  },
  mounted() {
    leftSlide(), NavSwitch();
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 65px;
  height: 100%;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 8%);
  transition: all 0.3s;
  overflow: hidden;
  z-index: 999;
}

.left-nav ul {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.left-nav ul::-webkit-scrollbar {
  width: 6px; 
  height: 6px; 
  border-radius: 8px; 
  background-color: rgba(255, 255, 255, 0.1); 
}

/*定义滚动条轨道 内阴影+圆角*/
.left-nav ul::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5); 
  border-radius: 8px; 
  background-color: #f5f5f5;  
}

/*定义滑块 内阴影+圆角*/
.left-nav ul::-webkit-scrollbar-thumb {
  border-radius: 8px; 
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5); 
  background-color: #c8c8c8; 
}

.left-nav ul li {
  width: 100%;
  height: 63px;
  line-height: 63px;
}

.left-nav ul li i {
  position: relative;
  left: 19px;
}

.left-nav ul li:nth-child(1) {
  border-bottom: 1px #d5dbe5 solid;
}

.left-nav ul li:nth-child(8) {
  height: 74px;
  line-height: 54px;
  border-top: 1px #d5dbe5 solid;
}

.left-nav ul li:nth-child(8) a i {
  color: #faaa5a;
}

.left-nav ul li:nth-child(9) {
  height: 79px;
  line-height: 54px;
  border-top: 1px #d5dbe5 solid;
}

.left-nav ul li:nth-child(9) a i {
  color: #faaa5a;
}

.left-nav ul li a {
  position: relative;
  height: 100%;
  display: block;
  transition: all 0.3s;
  color: #000;
}

.left-nav ul li a.active {
  color: #4154f1;
  background-color: #f2f4f7;
}

.left-nav ul li a:hover {
  background-color: #f2f4f7;
}

.left-nav ul li:nth-child(1) a:hover {
  background-color: #fff;
}

/* .left-nav ul li:nth-child(7) a:hover{
	background-color:#fff;
}

.left-nav ul li:nth-child(8) a:hover{
	background-color:#fff;
} */

.left-nav ul li a i {
  font-size: 25px;
}

.left-nav ul li a strong {
  position: absolute;
  left: 68px;
  white-space: nowrap;
  font-size: 18px;
}

.left-nav ul li a .span {
  position: absolute;
  top: 15px;
  left: -28px;
  color: #878eaa;
  text-align: center;
  height: 40px;
  width: 80px;
  line-height: 0px;
}

.left-nav ul li a .span span {
  display: block;
  height: 20px;
  width: 146%;
  line-height: 20px;
  text-align: center;
}

.left-nav ul li:nth-child(10) {
  /* position: absolute; */
  /* bottom: 65px; */
  border-top: 1px #d5dbe5 solid;
}

.left-nav ul li:nth-child(10) a {
  height: 103%;
}

.left-nav ul li:nth-child(11) {
  /* position: absolute;
  bottom: 0;
  left: 0; */
}
</style>
