<template>
    <div class="choice">
        <div class="choice-til">
            <div class="choice-nav">
                <router-link to="/choice/sentence" active-class="choiceNav-active">句子</router-link>
                <router-link to="/choice/fill" active-class="choiceNav-active">词语</router-link>
            </div>
        </div>
        <div class="choice-main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name:'Choice'

}
</script>

<style>
/* #region */
.choice{
  width: 800px;
  height: 635px;
  margin: 0 auto;
  transform: translate(4%, -2%);
}

.choice .choice-til{
  margin: 32px 16px 24px;
  color: #2c3143;
  font-size: 16px;
}

.choice .choice-til .choice-nav{
  width: 128px;
  height: 50px;
  margin: 0 auto;
}

.choice .choice-til .choice-nav a{
  display: block;
  float: left;
  height: 100%;
  text-align: center;
  line-height: 50px;
  color: #626c91;
  margin: 0 16px;
  font-weight: 600;
}

.choice .choice-til .choice-nav a.choiceNav-active{
  color: #2c3143;
  border-bottom: #43d281 2px solid;
}

.choice .choice-til .choice-nav a.choiceNav-active:hover {
  border-bottom: #43d281 2px solid;
  color: #2c3143;
}

.choice .choice-til .choice-nav a:hover{
  border-bottom: rgba(67, 210, 129, .2) 2px solid;
  color: #2c3143;
}

.choice .choice-main{
  height: 550px;
  width: 100%;
  background-color: #fff;
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 2px 4px 8px 0 rgb(0 0 0 / 20%);
  overflow: hidden;
  transition: all 0.4s;
}

.choice .choice-main .choice-sentence{
  width: 100%;
  height: 100%;
}

.choice .choice-main .choice-sentence .choice-top{
  width: 100%;
  height: 60px;

}

.choice .choice-main .choice-sentence .choice-top > button{
  float: left;
  width: 8%;
  height: 30px;
  font-size: 12px;
  outline: none;
  border: #e5e5e5 2px solid;
  transition: all 0.25s;
  cursor: pointer;
  user-select: none;
  border-radius: 18px;
  padding: 4px 6px;
  color: #afafaf;
  border-color: #e5e5e5;
  background-color: #fff;
  margin: 15px 1px 15px 9px; 
  box-shadow: 0 2px 0 #e5e5e5;
  font-weight: 600;
}

.choice .choice-main .choice-sentence .choice-top>button:hover {
  background-color: #e5e5e5;
  border: #cecece 2px solid;
  box-shadow: 0 2px 0 #cecece;
}

.choice .choice-main .choice-sentence .choice-top .choice-barBtn {
  float: left;
  width: 8%;
  height: 30px;
  font-size: 12px;
  outline: none;
  border: #e5e5e5 2px solid;
  transition: all 0.25s;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 18px;
  padding: 4px 6px;
  color: #afafaf;
  border-color: #e5e5e5;
  background-color: #fff;
  margin: 15px 1px 15px 9px;
  box-shadow: 0 2px 0 #e5e5e5;
  font-weight: 600;
  float: right;
  margin: 15px 9px 15px 1px;
}

.choice .choice-main .choice-sentence .choice-top .choice-barBtn:hover{
  background-color: #e5e5e5;
  border: #cecece 2px solid;
  box-shadow: 0 2px 0 #cecece;
}

.choice .choice-main .choice-sentence .choice-top .choice-schedule{
  float: left;
  width: 81%;
  margin: 22px 2px;
}

.choice .choice-main .choice-sentence .choice-top .choice-schedule >div{
  float: left;
  width: 2%;
  margin: 0 3px 0 8px;
  line-height: 16px;
}

.choice .choice-main .choice-sentence .choice-top .choice-schedule .choice-progressBar {
  width: 90%;
  height: 16px;
  /* max-width: 550px; */
  background: #e5e5e5;
  border-radius: 16px;
  overflow: hidden;
}
     
.choice .choice-main .choice-sentence .choice-top .choice-schedule .choice-progressBar .choice-bar{
  position: relative;
  /* background-color: #58cc02; */
  /* background-color: #4154f1; */
  /* background-color: #00a8ff; */
  background-color: #43d281;
  width: 50%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  padding: 0 10px;
  transition: all 0.25s;
}

.choice .choice-main .choice-sentence .choice-top .choice-schedule .choice-progressBar .choice-bar .progressBar-shadow {
  position: absolute;
  height: 30%;
  opacity: .2;
  top: 25%;
  left: 9px;
  width: 96%;
  max-width: 565px;
  /* background-color: #79d635; */
  background-color: #fff;
  border-radius: inherit;
}

.choice .choice-main .choice-sentence .choice-finish{
  width: 100%;
  height: 390px;
  overflow: hidden;
  padding: 0 60px;
}

.choice .choice-main .choice-sentence .choice-finish > .choice-finish-tool{
  position: relative;
  top: 50%;
  left: 50%;
  width: 64%;
  transform: translate(-50%,-50%);
}

.choice .choice-main .choice-sentence .choice-finish > .choice-finish-tool > div{
  color: #f56c6c;
  text-align: center;
}

.choice .choice-main .choice-sentence .choice-content {
  width: 100%;
  height: 390px;
  overflow: hidden;
  padding: 0 60px;
}

.choice .choice-main .choice-sentence .choice-content .choice-prompt {
  width: 100%;
  height: 40px;
  margin: 15px 0 20px;
}

.choice .choice-main .choice-sentence .choice-content .choice-prompt > h2 {
  float: left;
  color: #3c3c3c;
}

.choice .choice-main .choice-sentence .choice-content .choice-prompt .choice-skilled {
  position: relative;
  top: -3px;
  float: left;
  height: 100%;
  width: 38%;
  padding: 19px;
  margin-left: 20px;
  background-color: #fff;
  border-radius: 12px;
  transition: all 0.5s;
  cursor: pointer;
}

.choice .choice-main .choice-sentence .choice-content .choice-prompt .choice-skilled:hover{
  background-color: #f7f7f7;
}

.choice .choice-main .choice-sentence .choice-content .choice-prompt .choice-skilled .stripes {
  float: left;
  display: flex;
  padding-right: 4px;
}

.choice .choice-main .choice-sentence .choice-content .choice-prompt .choice-skilled .stripes > .stripe {
  width: 16px;
  height: 4px;
  background: #ececec;
  border-radius: 2px;
  margin: 0 2px;
}

.choice .choice-main .choice-sentence .choice-content .choice-prompt .choice-skilled .stripes>.one {
  background-color: #ff934d;
}

.choice .choice-main .choice-sentence .choice-content .choice-prompt .choice-skilled .stripes>.two {
  background-color: #bed7d7;

}
.choice .choice-main .choice-sentence .choice-content .choice-prompt .choice-skilled .stripes>.three {
  background-color: #68aeb8;
}
.choice .choice-main .choice-sentence .choice-content .choice-prompt .choice-skilled .stripes>.four {
  background-color: #037889;
}
.choice .choice-main .choice-sentence .choice-content .choice-prompt .choice-skilled .stripes>.five {
  background-color: #43d281;
}

.choice .choice-main .choice-sentence .choice-content .choice-prompt .choice-skilled .repeat-description{
  float: left;
  font-size: 12px;
  line-height: 4px;
  margin-left: 4px;
}

.choice .choice-main .choice-sentence .choice-content .choice-tips{
  float: left;
}

.choice .choice-main .choice-sentence .choice-content .choice-tips .choice-dialog{
  position: relative;
  height: 66px;
  border-radius: 20px;
  border: 2px solid #e5e5e5;
  margin: 0 auto;
  padding: 12px 24px;
  font-size: 19px;
  color: #3c3c3c;
  line-height: 37px;
  margin-left: 140px;
}

.choice .choice-main .choice-sentence .choice-content .choice-tips .choice-dialog::before {
  content: "";
  width: 10px;
  height: 10px;
  background: #fff;
  position: absolute;
  top: -7.5px;
  left: 20px;
  transform: rotate(45deg);
  border-top: 2px solid #e5e5e5;
  border-left: 2px solid #e5e5e5;
}

.choice .choice-main .choice-sentence .choice-content .choice-row{
  float: left;
  width: 100%;
  height: 60px;
  margin-top: 42px;
  border-top: 2px solid #e5e5e5;
  border-bottom: 2px solid #e5e5e5;
  transition: all 0.25s;
}

.choice .choice-main .choice-sentence .choice-content .choice-row .choice-item {
  float: left;
  height: 37px;
  border-radius: 15px;
  box-shadow: 0 2px 0 #e5e5e5;
  border: 2px solid #e5e5e5;
  margin: 9px 2px;
  margin-bottom: 10px;
  overflow: hidden;
  font-size: 18px;
  padding: 4px 10px;
  color: #4B4B4B;
  cursor: pointer;
}


.choice .choice-main .choice-sentence .choice-content .choice-itemlist {
  float: left;
  width: 100%;
  height: 92px;
  margin-top: 28px;
}

.choice .choice-main .choice-sentence .choice-content .choice-itemlist .choice-makeCenter {
  display: flex;
  flex-flow:row wrap;
  justify-content: center;
  transition: all 0.2s;
  /* align-content: space-between; */
  /* position: relative; */
  /* left: 50%; */
  /* float: left; */
  /* transform: translateX(-50%); */
}

.choice .choice-main .choice-sentence .choice-content .choice-itemlist .choice-makeCenter .choice-item{
  height: 37px;
  border-radius: 15px;
  box-shadow:0 2px 0 #e5e5e5;
  border: 2px solid #e5e5e5;
  margin: 0 2px;
  margin-bottom: 10px;
  overflow: hidden;
  font-size: 18px;
  padding: 4px 10px;
  color: #4B4B4B;
  cursor: pointer;
  user-select: none;
}

.choice .choice-main .choice-sentence .choice-content .choice-itemlist .choice-makeCenter .choice-itemLeave {
  background-color: #e5e5e5;
  color: #e5e5e5;
  box-shadow: 0 2px 0 #cecece;
  pointer-events: none;
}

.choice .choice-main .choice-sentence .choice-content .choice-itemlist .choice-makeCenter .choice-item button {
  width: 100%;
  height: 100%;
  background: none;
  border: solid transparent;
  font-size: 18px;
  padding: 4px 10px;
  color: #4B4B4B;
  cursor: pointer;
}


.choice .choice-main .choice-sentence .choice-check {
  width: 100%;
  height: 100px;
  border-top: 2px solid #e5e5e5;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft {
  float: left;
  width: 70%;
  height: 100%;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-skipBtn {
  width: 120px;
  height: 38px;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-skipBtn > button {
  width: 100%;
  height: 100%;
  font-size: 16px;
  outline: none;
  border: #e5e5e5 2px solid;
  transition: all 0.25s;
  cursor: pointer;
  user-select: none;
  border-radius: 12px;
  padding: 4px 6px;
  color: #afafaf;
  border-color: #e5e5e5;
  background-color: #fff;
  margin: 30px 1px 15px 32px;
  box-shadow: 0 2px 0 #e5e5e5;
  font-weight: 600;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-skipBtn>button:hover {
  background-color: #e5e5e5;
  border: #cecece 2px solid;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-rightTip{
  margin: 20px 0 0 32px;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-rightTip .choice-checkIco{
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  text-align: center;
  line-height: 60px;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-rightTip .choice-checkIco > i{
  color: #8dbc00;
  font-size: 58px;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-rightTip .choice-checkInfo {
  float: left;
  width: 80%;
  height: 100%;
  margin-left: 18px;
}


.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-rightTip .choice-checkInfo .choice-verygood{
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 7px;
  color: #58a700;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-rightTip .choice-checkInfo .choice-answer {
  font-size: 14px;
  font-weight: 500;
  color: #85ce38;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-wrongTip {
  margin: 20px 0 0 32px;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-wrongTip .choice-wrongIco {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  text-align: center;
  line-height: 60px;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-wrongTip .choice-wrongIco>i {
  color: #ec0b1b;
  font-size: 58px;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-wrongTip .choice-wrongInfo {
  float: left;
  width: 80%;
  height: 100%;
  margin-left: 18px;
}


.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-wrongTip .choice-wrongInfo .choice-trueAnswersIs {
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 7px;
  color: #ec0b1b;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnLeft .choice-wrongTip .choice-wrongInfo .choice-rightAnswer {
  font-size: 14px;
  font-weight: 500;
  color: #f06162;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnRight {
  float: left;
  width: 30%;
  height: 100%;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnRight > button{
  float: right;
  width: 120px;
  height: 38px;
  outline: none;
  border: none;
  background-color: #e5e5e5;
  color: #afafaf;
  transition: all 0.25s;
  cursor: pointer;
  user-select: none;
  border-radius: 12px;
  margin: 30px 32px 15px 1px;
  font-weight: 600;
  font-size: 16px;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnRight .whenPass {
  /* background-color: #00a8ff; */
  /* background-color: #43d281; */
  background-color: #58cc02;
  color: #fff;
  box-shadow: 0 2px 0 #58a700;
  transition: all 0.25s;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnRight .whenPass:hover {
  background-color: #61e002;
  box-shadow: 0 2px 0 #61b800;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnRight .whenPassWrong {
  background-color: #ff4b4b;
  box-shadow:0 2px 0 #ea2b2b;
  color: #fff;
  transition: all 0.25s;
}

.choice .choice-main .choice-sentence .choice-check .choice-checkBtnRight .whenPassWrong:hover {
  box-shadow:0 2px 0 #ff2f2f;
  background-color:#ff5252;
}



.choice .choice-main .choice-fill {
  width: 100%;
  height: 100%;
}

.choice .choice-main .choice-fill .choice-top {
  width: 100%;
  height: 60px;

}

.choice .choice-main .choice-fill .choice-top>button {
  float: left;
  width: 8%;
  height: 30px;
  font-size: 12px;
  outline: none;
  border: #e5e5e5 2px solid;
  transition: all 0.25s;
  cursor: pointer;
  user-select: none;
  border-radius: 18px;
  padding: 4px 6px;
  color: #afafaf;
  border-color: #e5e5e5;
  background-color: #fff;
  margin: 15px 1px 15px 9px;
  box-shadow: 0 2px 0 #e5e5e5;
  font-weight: 600;
}

.choice .choice-main .choice-fill .choice-top>button:hover {
  background-color: #e5e5e5;
  border: #cecece 2px solid;
  box-shadow: 0 2px 0 #cecece;
}

.choice .choice-main .choice-fill .choice-top .choice-barBtn {
  float: right;
  margin: 15px 9px 15px 1px;
  width: 8%;
  height: 30px;
  font-size: 12px;
  outline: none;
  border: #e5e5e5 2px solid;
  transition: all 0.25s;
  cursor: pointer;
  user-select: none;
  border-radius: 18px;
  padding: 4px 6px;
  color: #afafaf;
  border-color: #e5e5e5;
  background-color: #fff;
  box-shadow: 0 2px 0 #e5e5e5;
  font-weight: 600;
}

.choice .choice-main .choice-fill .choice-top .choice-schedule {
  float: left;
  width: 81%;
  margin: 22px 2px;
}

.choice .choice-main .choice-fill .choice-top .choice-schedule>div {
  float: left;
  width: 2%;
  margin: 0 3px 0 8px;
  line-height: 16px;
}

.choice .choice-main .choice-fill .choice-top .choice-schedule .choice-progressBar {
  width: 90%;
  height: 16px;
  /* max-width: 550px; */
  background: #e5e5e5;
  border-radius: 16px;
  overflow: hidden;
}

.choice .choice-main .choice-fill .choice-top .choice-schedule .choice-progressBar .choice-bar {
  position: relative;
  /* background-color: #58cc02; */
  /* background-color: #4154f1; */
  /* background-color: #00a8ff; */
  background-color: #43d281;
  width: 50%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  padding: 0 10px;
  transition: all 0.25s;
}

.choice .choice-main .choice-fill .choice-top .choice-schedule .choice-progressBar .choice-bar .progressBar-shadow {
  position: absolute;
  height: 30%;
  opacity: .2;
  top: 25%;
  left: 9px;
  width: 96%;
  max-width: 565px;
  /* background-color: #79d635; */
  background-color: #fff;
  border-radius: inherit;
}

.choice .choice-main .choice-fill .choice-content {
  width: 100%;
  height: 390px;
  overflow: hidden;
  padding: 0 60px;
}

.choice .choice-main .choice-fill .choice-content>h2 {
  margin: 15px 0 30px;
  color: #3c3c3c;
}

.choice .choice-main .choice-fill .choice-content .choice-tips {
  float: left;
}

.choice .choice-main .choice-fill .choice-content .choice-tips .choice-dialog {
  position: relative;
  height: 66px;
  border-radius: 20px;
  border: 2px solid #e5e5e5;
  margin: 0 auto;
  padding: 12px 24px;
  font-size: 19px;
  color: #3c3c3c;
  line-height: 37px;
  margin-left: 140px;
}

.choice .choice-main .choice-fill .choice-content .choice-tips .choice-dialog > i {
  margin-left: 4px;
  cursor: pointer;
}

.choice .choice-main .choice-fill .choice-content .choice-tips .choice-dialog::before {
  content: "";
  width: 10px;
  height: 10px;
  background: #fff;
  position: absolute;
  top: -7.5px;
  left: 20px;
  transform: rotate(45deg);
  border-top: 2px solid #e5e5e5;
  border-left: 2px solid #e5e5e5;
}


.choice .choice-main .choice-fill .choice-content .choice-itemlist {
  float: left;
  width: 100%;
  height: 92px;
  margin-top: 28px;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter {
  display: flex;
  flex-flow: row wrap;
  /* justify-content: center; */
  transition: all 0.2s;
  /* align-content: space-between; */
  /* position: relative; */
  /* left: 50%; */
  /* float: left; */
  /* transform: translateX(-50%); */
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item {
  position: relative;
  height: 83px;
  width: 49%;
  border-radius: 15px;
  box-shadow: 0 2px 0 #e5e5e5;
  border: 2px solid #e5e5e5;
  margin: 0 2px;
  margin-bottom: 10px;
  /* overflow: hidden; */
  font-size: 18px;
  padding: 4px 10px;
  color: #4B4B4B;
  cursor: pointer;
  user-select: none;
  transition: all 0.25s;
  transform-style: preserve-3d;
  background: #fff;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item:hover{
    background-color: #e5e5e5;
    border: #cecece 2px solid;
    box-shadow: 0 2px 0 #cecece;
    /* transform: rotateX(-180deg); */
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item-flip{
  transform: rotateX(-180deg);
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item .choice-item-positive{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  /* background: #fff; */
  border-radius: 15px;
  margin-top: 2px;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item .choice-item-positive> .choice-letter{
  float: left;
  height: 100%;
  width: 6%;
  font-size: 24px;
  color: #43d281;
  margin: 0 7px 0 9px;
  z-index: 10;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item .choice-item-positive>.choice-option {
  float: left;
  width: 86%;
  height: 96%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  z-index: 10;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item .choice-item-reverse{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotateX(180deg);
  /* background: #fff; */
  border-radius: 15px;
  margin-bottom: 2px;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item .choice-item-reverse> .choice-letter{
  float: left;
  height: 100%;
  width: 6%;
  font-size: 24px;
  color: #43d281;
  margin: 0 7px 0 9px;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item .choice-item-reverse>.choice-option {
  float: left;
  width: 86%;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item .choice-item-reverse>.choice-option p:nth-child(1) {
  margin-top: 1px;
  font-size: 24px;
  color: #291515;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item .choice-item-reverse>.choice-option p:nth-child(1) > i {
  font-size: 20px;
  margin-left: 2px;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item .choice-item-reverse>.choice-option p:nth-child(2) {
  font-size: 16px;
  color: #4B4B4B;
}
.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-itemLeave {
  background-color: #e5e5e5;
  color: #e5e5e5;
  box-shadow: 0 2px 0 #cecece;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-itemSelected {
  background-color: #e5e5e5;
  border: #cecece 2px solid;
  box-shadow: 0 2px 0 #cecece;
}

.choice .choice-main .choice-fill .choice-content .choice-itemlist .choice-fillCenter .choice-item button {
  width: 100%;
  height: 100%;
  background: none;
  border: solid transparent;
  font-size: 18px;
  padding: 4px 10px;
  color: #4B4B4B;
  cursor: pointer;
}


.choice .choice-main .choice-fill .choice-check {
  width: 100%;
  height: 100px;
  border-top: 2px solid #e5e5e5;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft {
  float: left;
  width: 70%;
  height: 100%;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-skipBtn {
  width: 120px;
  height: 38px;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-skipBtn>button {
  width: 100%;
  height: 100%;
  font-size: 16px;
  outline: none;
  border: #e5e5e5 2px solid;
  transition: all 0.25s;
  cursor: pointer;
  user-select: none;
  border-radius: 12px;
  padding: 4px 6px;
  color: #afafaf;
  border-color: #e5e5e5;
  background-color: #fff;
  margin: 30px 1px 15px 32px;
  box-shadow: 0 2px 0 #e5e5e5;
  font-weight: 600;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-skipBtn>button:hover {
  background-color: #e5e5e5;
  border: #cecece 2px solid;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-rightTip {
  margin: 20px 0 0 32px;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-rightTip .choice-checkIco {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  text-align: center;
  line-height: 60px;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-rightTip .choice-checkIco>i {
  color: #8dbc00;
  font-size: 58px;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-rightTip .choice-checkInfo {
  float: left;
  width: 80%;
  height: 100%;
  margin-left: 18px;
}


.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-rightTip .choice-checkInfo .choice-verygood {
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #58a700;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-rightTip .choice-checkInfo .choice-answer {
  font-size: 14px;
  font-weight: 500;
  color: #85ce38;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-wrongTip {
  margin: 20px 0 0 32px;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-wrongTip .choice-wrongIco {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  text-align: center;
  line-height: 60px;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-wrongTip .choice-wrongIco>i {
  color: #ec0b1b;
  font-size: 58px;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-wrongTip .choice-wrongInfo {
  float: left;
  width: 80%;
  height: 100%;
  margin-left: 18px;
}


.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-wrongTip .choice-wrongInfo .choice-trueAnswersIs {
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #ec0b1b;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnLeft .choice-wrongTip .choice-wrongInfo .choice-rightAnswer {
  font-size: 14px;
  font-weight: 500;
  color: #f06162;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnRight {
  float: left;
  width: 30%;
  height: 100%;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnRight>button {
  float: right;
  width: 120px;
  height: 38px;
  outline: none;
  border: none;
  background-color: #e5e5e5;
  color: #afafaf;
  transition: all 0.25s;
  cursor: pointer;
  user-select: none;
  border-radius: 12px;
  margin: 30px 32px 15px 1px;
  font-weight: 600;
  font-size: 16px;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnRight .whenPass {
  /* background-color: #00a8ff; */
  /* background-color: #43d281; */
  background-color: #58cc02;
  color: #fff;
  box-shadow: 0 2px 0 #58a700;
  transition: all 0.25s;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnRight .whenPass:hover {
  background-color: #26cf6f;
  box-shadow: 0 2px 0 #1bbd61;
}


.choice .choice-main .choice-fill .choice-check .choice-checkBtnRight .whenPassRight {
  color: #fff;
  transition: all 0.25s;
  background-color: #58cc02;
  box-shadow:0 2px 0 #58a700;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnRight .whenPassRight:hover {
  box-shadow:0 2px 0 #61b800;
  background-color:#61e002;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnRight .whenPassWrong {
  background-color: #ff4b4b;
  box-shadow:0 2px 0 #ea2b2b;
  color: #fff;
  transition: all 0.25s;
}

.choice .choice-main .choice-fill .choice-check .choice-checkBtnRight .whenPassWrong:hover {
  box-shadow:0 2px 0 #ff2f2f;
  background-color:#ff5252;
}


/* #endregion */

</style>