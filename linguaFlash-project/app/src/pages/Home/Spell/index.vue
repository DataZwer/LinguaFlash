<template>
    <div class="spell-exercise">
        <div class="title-card">拼写练习</div>
        <div class="card-container">
            <div class="card-main">
                <div class="card-input">
                    <div contenteditable="true" class="card-input-util">
                        <input type="text" v-model="inputEnValue" @keyup.enter="focusInputEnter" ref="inputAnswer" :disabled="this.inputdisabled" />
                        <label id="label-util" ref="labelutil"></label>
                    </div>
                    <div class="determine-input"><button :disabled="btnDisabledBoolean" @click="submitBtn">输入</button></div>
                </div>
                <div class="main-left">
                    <div class="card-btn" @click="!btnDisabledBoolean&&chang()">查看解析<i class="bi bi-chevron-right"></i></div>
                    <div class="card-collect">
                      <!-- <i data-iscollect="false" class="bi bi-star-fill" title="标记为重难点单词"></i> -->
                      <i class="bi bi-check-circle-fill" v-show="showCheck"></i>
                      <i class="bi bi-x-circle-fill" style="color:#fc7670" v-show="showCheck2"></i>
                    </div>
                </div>
                <div class="main-right">
                    <div class="card-answer" v-show="flag">
                        <p class="card-translate">{{this.showTranslation()}}</p><span style="color: #117484;">{{this.showPhonetic()}}</span>
                        <p class="card-notes">
                            {{this.showNotes()}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="translation-tip">{{this.showTranslation()}}</div>
                <div class="switchover-word">
                    <div class="last-word" v-if="!returnNextBtn" @click="looklast" title="查看上一个单词">
                        <i class="bi bi-chevron-double-left"></i>
                    </div>
                    <div class="next-word" v-if="returnNextBtn" @click="returnNextBtn && returnlast()" title="返回下一个单词">
                        <i class="bi bi-chevron-double-right"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-schedule">
            <div class="set-progress">
                <div class="progress-number">{{this.finishNumber}}</div>
                <div class="progress-background">
                    <div class="progress-bar" ref="progressbar" :style="'width: 0'+this.progressWid+'%'"></div>
                </div>
                <div class="progress-number">{{this.planNumber}}</div>
            </div>
            <div class="finish-more" v-if="btnDisabledBoolean">
                <i class="bi bi-check-circle-fill"></i>
                <p>恭喜你已完成今日所有任务，你可以选择</p>
            </div>
            <div class="more-review">
                <button @click="again">重新开始</button>&nbsp;
                <el-button @click="dialogShowChange(true);ChangeDialogTitle('计划')">更改计划</el-button>
            </div>
        </div>
        <Dialog ref="dialog" :dialogShow="dialogShow" @dialogShowChange="dialogShowChange" :titlename="this.titlename"></Dialog>
        <audio controls="controls" hidden :src="this.audioSrc" ref="audio"></audio>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Dialog from '../../../components/Dialog/index.vue'
import {star, input, trim} from '../../../js/Spell/index'
import {setSpellNumber, clearSpellNumber, getSpellNumber} from '../../../utils/spellNumber'
export default {
  name:'Spell',
  components: {
    Dialog,
  },
  data() {
    return {
      flag:false,
      planNumber: 0,
      finishNumber:0,
      indexNumber:0,//步
      inputEnValue:'',
      btnDisabledBoolean: false,//是否禁用按钮
      progressWid:0,//进度条
      inputdisabled:false,//是否禁用input输入框
      returnNextBtn:false,//返回下一个的按钮
      showCheck:false,
      showCheck2:false,
      form: {
          subject: 'all',
          spellPlan:''
      },
      titlename:'',//diolog对话框title
      dialogShow: false,//diolog对话框

    }
  },
  methods: {
    //播放单词读音
    playWordMusic() {
      this.$refs.audio.currentTime = 0;//从头开始播放
      this.$refs.audio.play(); //播放
      // setTimeout(()=>{
      //     this.$refs.audio.pause();//停止
      // },5000);
    },
    //显示dialog
    dialogShowChange(val) {
      this.dialogShow = val
    },
    //修改Dialog的title
    ChangeDialogTitle(titlename){
      this.titlename = titlename
    },
    //更改计划的回调
    async spellPlanData({ spellPlan }){
      if(parseInt(spellPlan) == this.planNumber){
        this.$message({
          message: '当前计划已是'+spellPlan+'个，请选择其他计划！',
          type: 'error',
          customClass:'messageError',
          duration:2500
        })
      }else{
        this.$message({
          message: '更改计划成功！',
          type: 'success',
          customClass:'collectSuccess',
          duration:2500
        })
        this.form.spellPlan = spellPlan
        if(parseInt(spellPlan) <= this.finishNumber){
          this.finishNumber = 0
          setSpellNumber({
            planNumber:parseInt(spellPlan),
            finishNumber:this.finishNumber
          })
        }else{
          setSpellNumber({
            planNumber:parseInt(spellPlan),
            finishNumber:this.finishNumber
          })
        }
        this.planNumber = parseInt(getSpellNumber().planNumber)
        if (this.planNumber-this.finishNumber !== 0) {
          await this.$store.dispatch('spell/GetLearnWordBySelect',{number: this.planNumber-this.finishNumber})
        }
        this.indexNumber = 0
      }
      
    },
    //查看解析按钮
    chang(){
      this.flag = !this.flag
    },
    //创建返回随机数组
    randomArray(args) {
        let orderArrayLength = args.length;
        // 创建一个长度为orderArrayLength的从 0 ~ orderArrayLength-1 的数组
        let orderArray = Array.apply(null, { length: orderArrayLength }).map((item,index)=>{
            return index;
        });
        // 打乱上述数组
        return orderArray.sort(() => Math.random() - 0.5).slice(0, orderArrayLength);
    },
    //input 回车
    focusInputEnter() {
        this.submitBtn();
    },
    //输入按钮
    async submitBtn() {
        
        if(this.inputEnValue == this.showWord()){
            this.playWordMusic()
            this.$refs.inputAnswer.style.backgroundColor = '#f0fbf5'
            this.$refs.inputAnswer.style.color = '#9ae7bb'
            this.inputdisabled = true
            this.showCheck=true
            this.finishNumber++
            if(this.flag==false){
              this.chang()
            }
            setTimeout(() =>{
              this.$refs.inputAnswer.style.backgroundColor = '#f5f5f5'
              this.$refs.inputAnswer.style.color = '#037889'
              this.inputdisabled = false
              this.showCheck=false
              this.inputEnValue = '';
              this.indexNumber++;
              if(this.flag==true){
                this.chang()
              }
              //自动获取焦点
              this.$nextTick(()=>{ 
                this.$refs.inputAnswer.focus()
              })
              setSpellNumber({
                planNumber:this.planNumber,
                finishNumber:this.finishNumber
              })
            },  1800)
            // 判断当中英文匹配正确时弹出 “回答正确” 消息
            // await this.successMessageLayer();
            // alert('回答正确')
            //  当最后一题时，弹窗提示，同时按钮置为不可点击
            if(this.finishNumber == this.planNumber){
              this.$message({
                message: '恭喜你，完成了全部回答',
                type: 'success',
                customClass:'messageError',
              });
              this.btnDisabledBoolean = true;
              return;
            }
            
        } else if(this.inputEnValue !== this.showWord() && this.finishNumber !== this.planNumber) {
            //  判断中英文匹配错误时
            this.playWordMusic()
            this.$refs.inputAnswer.style.color = '#fc7670'
            this.showCheck2=true
            if(this.flag==false){
              this.chang()
            }
            setTimeout(() =>{
              this.$refs.inputAnswer.style.color = '#f9a9a5'
              if(this.flag==true){
                this.chang()
              }
              this.showCheck2=false
            },1800)
            this.inputdisabled = true
            this.inputEnValue = this.showWord();
            this.$refs.labelutil.innerText=this.showWord()
            setTimeout(() =>{
              this.$refs.inputAnswer.style.color = '#037889'
              this.inputdisabled = false
              this.inputEnValue = '';
              this.$refs.labelutil.innerText=''
              //自动获取焦点
              this.$nextTick(()=>{ 
                this.$refs.inputAnswer.focus()
              })
            },3200)
        }
        // 无论回答正确还是错误输入框置空
    },
    async successMessageLayer(){
      this.$refs.inputAnswer.style.backgroundColor = '#f0fbf5'
      // const that = this
      setInterval(() =>{
        this.$refs.inputAnswer.style.backgroundColor = '#f5f5f5'
      },2000)
    },
    showWord(){
      if(this.conditions){
        return this.LearnWordBySelect[this.word[this.indexNumber]].words
      }
    },
    showTranslation(){
      if(this.conditions){
        return this.LearnWordBySelect[this.word[this.indexNumber]].translation
      }
    },
    showPhonetic(){
      if(this.conditions){
        return this.LearnWordBySelect[this.word[this.indexNumber]].phonetic
      }
    },
    showOtherforms(){
      if(this.conditions){
        return this.LearnWordBySelect[this.word[this.indexNumber]].otherforms
      }
    },
    showNotes(){
      if(this.conditions){
        return this.LearnWordBySelect[this.word[this.indexNumber]].notes
      }
    },
    //重新开始
    async again(){
      setSpellNumber({
        planNumber:this.planNumber,
        finishNumber:0
      })
      this.finishNumber = parseInt(getSpellNumber().finishNumber)
      // window.location()
      await this.$store.dispatch('spell/GetLearnWordBySelect',{number: this.planNumber})
      this.indexNumber = 0
      this.btnDisabledBoolean=false
    },
    //查看上一个
    looklast(){
      if (this.indexNumber !== 0) {
        this.indexNumber--
        this.inputEnValue = this.showWord()
        this.$refs.inputAnswer.style.backgroundColor = '#f0fbf5'
        this.$refs.inputAnswer.style.color = '#9ae7bb'
        this.returnNextBtn = true
        this.inputdisabled = true
        this.showCheck=true
        if(this.flag==false){
          this.chang()
        }
      }
    },
    //返回下一个
    returnlast(){
      this.indexNumber++
      this.inputEnValue=''
      this.$refs.inputAnswer.style.backgroundColor = '#f5f5f5'
      this.$refs.inputAnswer.style.color = '#037889'
      this.returnNextBtn = false
      this.inputdisabled = false
      this.showCheck=false
      if(this.flag==true){
        this.chang()
      }
    }
  },
  async mounted() {
    star();
    input();
    trim()
    if(getSpellNumber()){
      this.planNumber = parseInt(getSpellNumber().planNumber)
      this.finishNumber = parseInt(getSpellNumber().finishNumber)
    }else{
      // console.log(22);
      setSpellNumber({
        planNumber:5,
        finishNumber:0
      })
      this.planNumber = parseInt(getSpellNumber().planNumber)
    }
      // console.log(this.planNumber-this.finishNumber);
      if (this.planNumber-this.finishNumber !== 0) {
        await this.$store.dispatch('spell/GetLearnWordBySelect',{number: this.planNumber-this.finishNumber})
      }else{
        this.btnDisabledBoolean = true;
      }

    this.$refs.dialog.$on('spellPlanData',this.spellPlanData)


  },
  computed:{
    ...mapState('spell',['LearnWordBySelect']),
    //随机数组
    word(){
      return this.randomArray(this.LearnWordBySelect)
    },
    //打乱数组时显示的条件
    conditions(){
      return this.LearnWordBySelect[this.word[this.indexNumber]]
    },
    audioSrc(){
      return `https://dict.youdao.com/dictvoice?audio=${this.showWord()}&type=1`
    }
  },
  watch:{
    finishNumber(newvaule){
        this.progressWid = newvaule / this.planNumber * 100
        if(this.$refs.progressbar){
          if(this.progressWid === 100){
            this.$refs.progressbar.style.backgroundColor = '#43d281'
          }else{
            this.$refs.progressbar.style.backgroundColor = '#2c3143'
          }
        }
    },
    planNumber(newvaule){
      this.progressWid = this.finishNumber / newvaule * 100
      // console.log(this.progressWid);
      if(this.$refs.progressbar){
        if(this.progressWid === 100){
          this.$refs.progressbar.style.backgroundColor = '#43d281'
        }else{
          this.$refs.progressbar.style.backgroundColor = '#2c3143'
        }
      }
    }
    // inputEnValue(newvaule){
    //   if(this.inputEnValue == ''){
    //     this.$refs.inputButton.innerText = '学习单词'
    //   }else{
    //     this.$refs.inputButton.innerText = '输入'
    //   }
    // }
  }
}
</script>

<style>
.spell-exercise {
  width: 648px;
  height: 671px;
  margin: 0 auto;
  transform: translate(4%, -2%);
  overflow: hidden;
}

.spell-exercise .title-card {
  margin: 32px 16px 24px;
  color: #2c3143;
  font-size: 22px;
}

.spell-exercise .card-container {
  width: 100%;
  height: 340px;
  background-color: #fff;
  margin-bottom: 0;
  min-height: 318px;
  border-radius: 10px;
  overflow: hidden;
}

.spell-exercise .card-container .card-main {
  width: 100%;
  height: 80%;
  padding: 24px;
}

.spell-exercise .card-container .card-main .card-input {
  float: left;
  width: 100%;
  height: 20%;
  margin-bottom: 30px;
  font-size: 40px;
  color: #037889;
  text-align: left;
  white-space: nowrap;
  padding: 4px 0;
}

.spell-exercise .card-container .card-main .card-input .card-input-util{
  position: relative;
  display: inline-block;
  outline: none;
  border: none;
}

.spell-exercise .card-container .card-main .card-input .card-input-util > input{
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: content-box;
  background-color: #f5f5f5;
  outline: none;
  border: none;
  display: inline;
  width: 100%;
  height: 100%;
  color: #037889;
  margin: 0;
  padding: 0 0.25em;
  font-size: 36px;
  border-radius: 4px;
  transition: all 0.25s;
}

.spell-exercise .card-container .card-main .card-input .card-input-util > label {
  display: inline-block;
  font-size: 36px;
  max-width: 400px;
  min-width: 86px;
  height: 46px;
  padding: 0 0.25em;
  overflow: hidden;
}

.spell-exercise .card-container .card-main .card-input .determine-input{
  float: right;
  height: 46px;
  line-height: 40px;
}

.spell-exercise .card-container .card-main .card-input .determine-input > button {
  width: 80px;
  height: 30px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #2c3143;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;
  user-select: none;
}

.spell-exercise .card-container .card-main .card-input .determine-input>button:hover {
  background-color: #565a69;
}

.spell-exercise .card-container .card-main .main-left {
  float: left;
  width: 25%;
  height: 80%;
}

.spell-exercise .card-container .card-main .main-left .card-btn {
  width: 128px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #000;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  user-select: none;
  transition: all 0.45s;
}

.spell-exercise .card-container .card-main .main-left .card-btn:hover {
  box-shadow: 0 5px 14px 0 rgb(82 63 105 / 20%);
}

.spell-exercise .card-container .card-main .main-left .card-collect {
  margin-top: 10px;
}

.spell-exercise .card-container .card-main .main-left .card-collect i {
  color: #65d898;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.25s;
}

.spell-exercise .card-container .card-main .main-right {
  float: left;
  width: 75%;
  height: 80%;
}

.spell-exercise .card-container .card-main .main-right .card-answer {
  font-size: 16px;
}

.spell-exercise .card-container .card-main .main-right .card-answer .card-translate {
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  font-size: 18px;
  margin-bottom: 5px;
}

.spell-exercise .card-container .card-footer {
  width: 100%;
  height: 20%;
  padding: 24px;
  background-color: #f7f8fa;
  font-weight: 500;
}

.spell-exercise .card-container .card-footer .translation-tip{
  float: left;
  font-weight: 500;
  user-select: none;
  font-size: 20px;
  color: #2c3143;
}

.spell-exercise .card-container .card-footer .switchover-word{
  float: right;
}

.spell-exercise .card-container .card-footer .switchover-word>div {
  float: left;
  width: 32px;
  height: 32px;
  color: #2c3143;
  font-size: 16px;
  text-align: center;
  line-height: 32px;
  background-color: #eef0f4;
  transition: all 0.25s;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
}

.spell-exercise .card-container .card-footer .switchover-word>div:hover {
  background-color: #2c3143;
  color: #fff;
}

.spell-exercise .card-schedule {
  width: 100%;
  height: 50px;
  background-color: #fff;
  margin-top: 195px;
  border-radius: 10px;
  opacity: .8;
  padding: 8px;
  overflow: hidden;
}

.spell-exercise .card-schedule>div.set-progress {
  float: left;
  margin: 11.2px 0;
  max-width: 260px;
}

.spell-exercise .card-schedule .set-progress>div.progress-number {
  float: left;
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: #2c3143;
  margin: -2px 8px;
  opacity: 1;
  transition: opacity .25s;
  width: 10px;
  text-align: end;
  line-height: .8;
  user-select: none;
}

.spell-exercise .card-schedule div.set-progress>div.progress-background {
  float: left;
  width: 172px;
  height: 10px;
  max-width: 550px;
  background: #eef0f4;
  border-radius: 4px;
}

.spell-exercise .card-schedule div.set-progress div.progress-background>div.progress-bar {
  height: 10px;
  background: #2c3143;
  border-radius: 4px;
  transition: width .5s;
  min-width: 6px;
  max-width: 100%;
}

.spell-exercise .card-schedule>div.finish-more {
  float: left;
  /* margin: 11.2px 0; */
  line-height: 34px;
}

.spell-exercise .card-schedule>div.finish-more>i {
  position: relative;
  top: -1px;
  float: left;
  width: 16px;
  color: #43d281;
  margin: 0 5px;
}

.spell-exercise .card-schedule>div.finish-more>p {
  float: left;
  font-size: 14px;
}

.spell-exercise .card-schedule>div.finish-more>button,
.spell-exercise .card-schedule>div.more-review>button {
  float: left;
  width: 60px;
  height: 30px;
  font-size: 12px;
  outline: none;
  border: none;
  transition: all 0.25s;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  padding: 4px 6px;
  color: #2c3143;
  border-color: #d5dbe5;
  background-color: #d5dbe5;
  margin-top: 2px;
  margin-left: 4px;
}

.spell-exercise .card-schedule>div.more-review {
  float: right;
}

.spell-exercise .card-schedule>div.more-review>button {
  float: none;
  margin-left: 0;
}

.spell-exercise .card-schedule>div.finish-more>button:hover,
.spell-exercise .card-schedule>div.more-review>button:hover {
  background-color: #2c3143;
  color: #fff;
}
</style>