<template>
    <div class="card-grid">
        <div class="title-card">词卡学习</div>
        <!-- 单词学习模块 --> 
        <div class="card-container" v-if="showCard" v-show="!this.changeModule">
          <div id="disabled-card" v-if="!look"><i class="bi bi-emoji-smile-upside-down"></i></div>
            <div class="card-main">
                <div class="card-word-top">
                    <div class="card-word" v-if="this.IsShowWord">{{this.showWord()}}</div>
                    <div class="card-word" v-else>你已完成今日所有任务!</div>
                    <span class="card-phonetic" v-if="IsShowPhonetic"><i class="el-tooltip bi bi-volume-down-fill" @click="playWordMusic()"></i>{{this.showPhonetic()}}</span>
                    <span class="card-phonetic" v-else></span>
                </div>
                <div class="main-left">
                    <div class="card-btn" @click="changFlag()">查看解析<i class="bi bi-chevron-right"></i></div>
                    <div class="card-collect" ><i ref="littleStar" @click="look&&CollectWord()" class="bi bi-star-fill" title="标记为重难点单词"></i></div>
                             <!-- :data-iscollect="this.showState()" -->
                </div>
                <div class="main-right" >
                    <div class="card-answer" v-show="flag" >
                        <p class="card-translate">{{this.showTranslation()}}</p>
                        <p class="card-cixing">{{this.showOtherforms()}}</p>
                        <p class="card-notes">
                            {{this.showNotes()}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button class="yes" @click="yes" :disabled="btnDisabledBoolean">会</button>
                <button class="no" v-if="flag2" @click="changFlag2()" :disabled="btnDisabledBoolean">不会</button>
                <button class="no" v-else @click="no" :disabled="btnDisabledBoolean">不会</button>
                <div class="switchover-word">
                    <div class="last-word" @click="looklastflag && looklast()" ref="lastwordbutton" title="查看上一个单词(6s)">
                        <i class="bi bi-chevron-double-left"></i>
                    </div>
                    <!-- <div class="next-word">
                        <i class="bi bi-chevron-double-right"></i>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- 所有单词学完时 -->
        <div class="card-container" v-else v-show="!this.changeModule">
                <div class="card-main">
                    <div class="card-word-top">
                        <div class="card-word">恭喜你已完成所有课程单词的学习</div>
                        <span class="card-phonetic youcanchange">你可以选择：</span>
                    </div>
                    <div class="main-left buymorecourse">
                        <button @click="buyMoreCoursebtn">前往购买更多课程</button>
                    </div>
                    <div class="main-right restudy">
                        <button>重新学习已购课程</button>
                    </div>
                </div>
                <div class="card-footer">
                </div>
        </div>
        <!-- 单词学习模块进度条 -->
        <div class="card-schedule" v-show="!this.changeModule">
            <div class="set-progress">
                <div class="progress-number">{{this.learningWords}}</div>
                <div class="progress-background">
                    <div class="progress-bar" ref="progressbar" :style="'width: '+this.progressWid+'%'"></div>
                </div>
                <div class="progress-number" v-if="this.userPlan[0] && this.StudyMoreBtn=='false'">{{userPlan[0].plan_complete}}</div>
                <div class="progress-number" v-else>{{StudyMoreWordsNumber}}</div>
            </div>
            <div class="finish-more" v-if="!look">
                <i class="bi bi-check-circle-fill"></i>
                <p>恭喜你已完成今日所有任务，你可以选择</p>
                <el-button @click="dialogShowChange(true);ChangeDialogTitle('学习')">学习更多</el-button>
            </div>
            <div class="more-review">
                <el-button v-if="!(this.ModuleSwitch == 'true')" @click="dialogShowChange(true);ChangeDialogTitle('复习')">复习单词</el-button>
                <el-button v-else @click="ChangeModule()">复习单词</el-button>
            </div>
            <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
        </div>
        <!-- 复习模块 -->
        <div class="card-container" v-if="this.ModuleSwitch == 'true'" v-show="this.changeModule">
          <div id="disabled-card" style="height:80%" v-if="this.indexReview == this.form.wordsNumber"><i class="bi bi-emoji-smile-upside-down"></i></div>
            <div class="card-main">
                <div class="card-word-top">
                    <div class="card-word">{{this.showReviewWord()}}</div>
                    <span class="card-phonetic" ref="phonetic"><i class="el-tooltip bi bi-volume-down-fill" @click="playReviewWordMusic()"></i>{{this.showReviewPhonetic()}}</span>
                </div>
                <div class="main-left">
                    <div class="card-btn" @click="changFlag()">查看解析<i class="bi bi-chevron-right"></i></div>
                    <div class="card-collect" ><i  ref="ReviewLittleStar" @click="CollectReviewWord()" class="bi bi-star-fill"
                            title="标记为重难点单词"></i></div>
                </div>
                <div class="main-right" >
                    <div class="card-answer" v-show="flag" >
                        <p class="card-translate">{{this.showReviewTranslation()}}</p>
                        <p class="card-cixing">{{this.showReviewOtherforms()}}</p>
                        
                        <p class="card-notes">
                            {{this.showReviewNotes()}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button class="yes" @click="ReviewLast">上一个</button>
                <button class="no" v-if="flag2" @click="changFlag2()">下一个</button>
                <button class="no" v-else @click="ReviewNext">下一个</button>
                
            </div>
        </div>
        <!-- 复习模块进度条 -->
        <div class="card-schedule" v-if="this.ModuleSwitch == 'true'" v-show="this.changeModule">
            <div class="set-progress">
                <div class="progress-number">{{this.indexReview}}</div>
                <div class="progress-background">
                    <div class="progress-bar" ref="progressReviewbar" :style="'width: '+this.progressReviewWid+'%'"></div>
                </div>
                <div class="progress-number">{{this.form.wordsNumber}}</div>
            </div>
            <div class="finish-more" ref="rightIco" style="display:none;">
                <i class="bi bi-check-circle-fill"></i>
            </div>
            <div class="more-review">
                <el-button @click="dialogShowChange(true);ChangeDialogTitle('复习')">重新开始</el-button>&nbsp;&nbsp;
                <el-button @click="changToLearnModule()">学习单词</el-button>
            </div>
            <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
            
        </div>
        <!-- <Dialog :visible.sync="detailsVisible" :numberScope.sync="numberScope"></Dialog> -->
        <Dialog ref="dialog" :dialogShow="dialogShow" @dialogShowChange="dialogShowChange" :titlename="this.titlename"></Dialog>
        <audio controls="controls" hidden :src="this.audioSrc" ref="audio"></audio>
        <audio controls="controls" hidden :src="this.audioReviewSrc" ref="audio2"></audio>
    </div>
    
</template>

<script>
// import {star, trim} from '../../../js/Spell/index'
import {mapState} from 'vuex'
import Dialog from '../../../components/Dialog/index.vue'
import {setModuleSwitch, clearModuleSwitch, getModuleSwitch} from '../../../utils/moduleSwitch'
import {setStudyMore, clearStudyMore, getStudyMore} from '../../../utils/studyMore'
export default {
  name:'Card',
  components: {
    Dialog,
  },
  data() {
    return {
      flag:false,
      flag2:true,
      // NoLearnWord:[],
      indexNumber:0,//记步
      btnDisabledBoolean: false,//会与不会的按钮
      learningWords:0,//今日已学会的单词数
      showCard:true,//词卡
      look:true,//查看解析按钮
      progressWid:0,//进度条
      looklastflag:true,//查看上一个单词开关
      dialogShow: false,//diolog对话框
      // detailsVisible:false,
      //子组件传递的参数
      // numberScope: {},
      form: {
          subject: 'all',
          wordsNumber: '',//复习单词数
          studyMoreNumber:'',//学习更多单词数
      },
      ModuleSwitch:getModuleSwitch().btn,//当确定复习模块时 按钮要变
      changeModule:false,//当确定复习模块时，切换模块
      indexReview:0,//记步(复习)
      progressReviewWid:0,//进度条(复习)
      titlename:'',//diolog对话框title
      StudyMoreSwitch:'',//当确定学习更多时为true
      StudyMoreBtn:getStudyMore().btn,
      StudyMoreWordsNumber:getStudyMore().wordsNumber,
      IsShowWord:true,//用于学习计划完成时显示提示
      IsShowPhonetic:true,//用于学习计划完成时显示提示
    }
  },
  methods: {
    // showCard(){
    //   return this.GetUserNoLearn
    // },
    //播放单词读音
    playWordMusic() {
      this.$refs.audio.currentTime = 0;//从头开始播放
      this.$refs.audio.play(); //播放
      // setTimeout(()=>{
      //     this.$refs.audio.pause();//停止
      // },5000);
    },
    //播放单词读音(复习模块)
    playReviewWordMusic() {
      this.$refs.audio2.currentTime = 0;//从头开始播放
      this.$refs.audio2.play(); //播放
      // setTimeout(()=>{
      //     this.$refs.audio.pause();//停止
      // },5000);
    },
    //显示dialog
    dialogShowChange(val) {
        // if(this.ModuleSwitch == 'true'){
        //   this.changeModule = true
        //   console.log(11111);
        // }else{
          this.dialogShow = val
          // console.log(22222)
        // }
    },
    success(){
      this.$message({
        type:'success',
        message: '今日任务已完成',
        customClass:'messageSuccess',
        duration:3500
      });
    },
    //显示单词解析
    changFlag(){
      this.flag = !this.flag
      this.flag2 = !this.flag2
    },
    //no按钮时先显示单词解析
    changFlag2(){
      if(this.flag === false){
        this.flag = true
        this.flag2 = false
      }
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
    //传递wordId给this.getUserWordState
    sendWordId(){
      if(this.conditions){
        return this.needNoLearnWords[this.word[this.indexNumber]].id
      }
    },
    showWord(){
      if(this.conditions){
        return this.needNoLearnWords[this.word[this.indexNumber]].words
      }
    },
    showTranslation(){
      if(this.conditions){
        return this.needNoLearnWords[this.word[this.indexNumber]].translation
      }
    },
    showPhonetic(){
      if(this.conditions){
        return this.needNoLearnWords[this.word[this.indexNumber]].phonetic
      }
    },
    showOtherforms(){
      if(this.conditions){
        return this.needNoLearnWords[this.word[this.indexNumber]].otherforms
      }
    },
    showNotes(){
      if(this.conditions){
        return this.needNoLearnWords[this.word[this.indexNumber]].notes
      }
    },
    //传递ReviewWordId给this.getUserWordState
    sendReviewWordId(){
      if(this.ReviewConditions){
        return this.LearnWordBySelect[this.indexReview].id
      }
    },
    showReviewWord(){
      if(this.ReviewConditions){
        return this.LearnWordBySelect[this.indexReview].words
      }
    },
    showReviewTranslation(){
      if(this.ReviewConditions){
        return this.LearnWordBySelect[this.indexReview].translation
      }
    },
    showReviewPhonetic(){
      if(this.ReviewConditions){
        return this.LearnWordBySelect[this.indexReview].phonetic
      }
    },
    showReviewOtherforms(){
      if(this.ReviewConditions){
        return this.LearnWordBySelect[this.indexReview].otherforms
      }
    },
    showReviewNotes(){
      if(this.ReviewConditions){
        return this.LearnWordBySelect[this.indexReview].notes
      }
    },
    next(){
      this.flag = false
      this.indexNumber++
      // this.$nextTick(() => {
      //   this.playWordMusic()
      // })
    },
    last(){
      this.indexNumber--
    },
    async yes(){
      this.next()
      this.learningWords++//yes的次数
      // console.log(this.learningWords);
      //查询的数据不为空
      if(this.word[this.indexNumber-1] !== null){
        console.log('学会')
        //将user_word表中的单词标记为已学会
        let id = this.needNoLearnWords[this.word[this.indexNumber-1]].id
        // console.log(id);
        try {
          await this.$store.dispatch('card/UpdateWordLearning',{id})
        } catch (error) {
          console.log(error);
        }

        if(getStudyMore().btn == 'true'){
          await this.$store.dispatch('card/UpdatePlanComlete',{complete:this.learningWords+parseInt(this.StudyMoreWordsNumber)})
        }else{
          //修改plan表中实际学会的单词
          if(this.learningWords){
            await this.$store.dispatch('card/UpdatePlanComlete',{complete:this.learningWords})
          }
        }
        //判断是否收藏并显示
        await this.getUserWordState(this.sendWordId())
        this.judgeIsCollect()
      }else{
        // console.log('testmesssssssssssss');
      }

  if(getStudyMore().btn == 'true'){
    if(this.learningWords == parseInt(this.StudyMoreWordsNumber)){
      console.log('已完成');
      this.success()
      this.btnDisabledBoolean = true;
      await this.last()//显示最后一个单词
      this.getNeedNoLearnWords()
      return;
    }
  }else{
    if(this.learningWords == this.userPlan[0].plan_complete){//学会 学习计划中的计划单词数则完成今日任务
      console.log('已完成');
      this.success()
      // if(this.learningWords){
      //   await this.$store.dispatch('card/UpdatePlanComlete',{complete:this.learningWords})
      // }
      this.btnDisabledBoolean = true;
      await this.last()//显示最后一个单词
      this.getNeedNoLearnWords()
      return;
    }
  }
      
      
      //步 已完成 重新查询
      if(this.word.length == this.indexNumber ){
        
        if(getStudyMore().btn == 'true'){
          //修改plan表中实际学会的单词
          if(this.learningWords){
            await this.$store.dispatch('card/UpdatePlanComlete',{complete:this.learningWords+parseInt(this.StudyMoreWordsNumber)})
            await this.$store.dispatch('card/GetUserNoLearnWordBySelect',{number:parseInt(getStudyMore().wordsNumber)-this.learningWords})
          }
          console.log('重头');
          
        }else{
          //修改plan表中实际学会的单词
          if(this.learningWords){
            await this.$store.dispatch('card/UpdatePlanComlete',{complete:this.learningWords})
          }
          console.log('重头');
          await this.$store.dispatch('card/GetNeedNoLearnWord')//重头获取今天需学的单词
          
        }
        this.indexNumber = 0//步 归零
        // 判断是否收藏并显示
        await this.getUserWordState(this.sendWordId())
        this.judgeIsCollect()
        
      }
      
      // console.log('word:',this.word);
      // console.log('index_number:',this.indexNumber);
      // console.log(this.word[this.indexNumber-1]);
      
      
    },
    async no(){
      this.next()
      this.flag2 = true
      if(this.word.length == this.indexNumber){
        if(getStudyMore().btn == 'true'){
          if(this.learningWords){
            await this.$store.dispatch('card/UpdatePlanComlete',{complete:this.learningWords+parseInt(this.StudyMoreWordsNumber)})
            await this.$store.dispatch('card/GetUserNoLearnWordBySelect',{number:parseInt(getStudyMore().wordsNumber)-this.learningWords})
          }
        }else{
          if(this.learningWords){
            await this.$store.dispatch('card/UpdatePlanComlete',{complete:this.learningWords})
          }
          await this.$store.dispatch('card/GetNeedNoLearnWord')
        }
          console.log('重头');
          this.indexNumber = 0
          // this.$nextTick(() => {
          //   this.playWordMusic()
          // })
           // 判断是否收藏并显示
          await this.getUserWordState(this.sendWordId())
          this.judgeIsCollect()
      }
       // 判断是否收藏并显示
      await this.getUserWordState(this.sendWordId())
      this.judgeIsCollect()
    },
    //今天的学习计划
    today(){
      // console.log(this.learningWords);
      this.learningWords = this.userPlan[0].complete
      // console.log(this.learningWords);
    },
    //今天的学习计划(学习更多时)
    todayStudyMord(){
      // console.log(this.learningWords);
      if(this.userPlan[0].complete - this.userPlan[0].plan_complete >= 0){
        this.learningWords = this.userPlan[0].complete - this.userPlan[0].plan_complete
      }
      // console.log(this.learningWords);
    },
    //查看上一个单词(6s)
    looklast(){
      if(this.indexNumber == 0){
        return ;
      }
      this.indexNumber--;
      this.btnDisabledBoolean = true
      // console.log(this.indexNumber);
      this.looklastflag = false
      for (let i = 0; i < 7; i++) {
        setTimeout(() => {
            this.$refs.lastwordbutton.innerHTML = i
        }, i * 1000);
      }
      let timeout = setTimeout(() => {
        this.indexNumber++;
        this.btnDisabledBoolean = false
        this.looklastflag = true
        this.$refs.lastwordbutton.innerHTML = '<i class="bi bi-chevron-double-left"></i>'
        // console.log(this.indexNumber);
      }, 6000);
      
      
    },
    //获取用户所有还未学会的单词
    async getUserNoLearnWords(){
      try {
        await this.$store.dispatch('card/GetUserNoLearn')
      } catch (error) {
        this.showCard = false
        // console.log(error);
      }
    },
    //获取用户当天所需的未学会的单词（根据用户学习计划 随机获取）
    async getNeedNoLearnWords(){
      try{
        await this.$store.dispatch('card/GetNeedNoLearnWord')
      } catch (error){
        this.btnDisabledBoolean = true
        this.look = false
        // if (this.$refs.word && this.$refs.phonetic) {
          this.IsShowWord = false
          this.IsShowPhonetic = false
        // }

      }
    },
    //计算时间戳
    calculateDiffTime(start_time) {
      if(!parseInt(start_time)) return "-";
      var endTime = Math.round(new Date() / 1000);

      var timeDiff = endTime - start_time
      var day = parseInt(timeDiff / 86400);
      // var hour = parseInt((timeDiff % 86400) / 3600);
      // var minute = parseInt((timeDiff % 3600) / 60);
      // day = day?(day+'天'):'';
      // hour = hour?(hour+"时"):'';
      // minute = minute?(minute+"分"):'';
      // return day + hour + minute;
      return day
	  },
    //判断时间是不是以前的
    isFormer(start_time){
      if (!parseInt(start_time)) return "-";
      const newdate = new Date();
      const olddate = new Date(start_time * 1000);

      const newdateyears = newdate.getFullYear()
      const olddateyears = olddate.getFullYear()

      const newdatemonth = newdate.getMonth() + 1
      const olddatemonth = olddate.getMonth() + 1 

      const newdateday = newdate.getDate() 
      const olddateday = olddate.getDate() 

      if(newdateyears == olddateyears ){
          if (newdatemonth == olddatemonth) {
              if (newdateday - olddateday > 0) {
                  return true
              } else {
                  return false
              }
          } else {
              if (newdatemonth - olddatemonth > 0) {
                  return true
              } else {
                  return false
              }
          }
      }else{
          if(newdateyears - olddateyears > 0){
              return true
          }else{
              return false
          }
      }
    },
    
    //复习单词的回调
    async getFormdata({ wordsNumber, changeModule, ModuleSwitch, indexReview}){
      // this.form.subject = subject
      this.form.wordsNumber = wordsNumber
      this.changeModule = changeModule
      this.ModuleSwitch = ModuleSwitch
      this.indexReview = indexReview
      setModuleSwitch({
        btn:'true',
        reviewWordsNumber:parseInt(wordsNumber),
        timeStamp:new Date() / 1000,
      })
      await this.$store.dispatch('card/GetLearnWordBySelect',{number:wordsNumber})
      //判断是否收藏并显示(复习版)
      await this.getUserReviewWordState(this.sendReviewWordId())
      this.judgeReviewIsCollect()
    },
    //学习更多单词的回调
    async getStudyMoreNumber({studyMoreNumber}){
      this.form.studyMoreNumber = studyMoreNumber
      await this.$store.dispatch('card/GetUserNoLearnWordBySelect',{number:studyMoreNumber})
      setStudyMore({
        btn:'true',
        wordsNumber:this.form.studyMoreNumber,
        timeStamp:new Date() / 1000,
      })
      this.StudyMoreSwitch = getStudyMore().btn
      this.look = true
      this.IsShowWord = true
      this.IsShowPhonetic = true
      this.btnDisabledBoolean = false
      this.indexNumber = 0//步 归零
      this.learningWords=0
      // 判断是否收藏并显示
      await this.getUserWordState(this.sendWordId())
      this.judgeIsCollect()

    },
    //切换为学习模块
    changToLearnModule(){
      this.changeModule = false
    },
    //上一个(复习)
    async ReviewLast(){
      this.flag = false
      if(this.indexReview !== 0){
        this.indexReview--
        //判断是否收藏并显示(复习版)
        if(this.indexReview >= 0  && this.indexReview < parseInt(this.form.wordsNumber)){
          await this.getUserReviewWordState(this.sendReviewWordId())
          this.judgeReviewIsCollect()
        }
      }
    },
    //下一个(复习)
    async ReviewNext(){
      this.flag = false
      this.flag2 = true
      if(this.indexReview != this.form.wordsNumber){
        this.indexReview++
        //判断是否收藏并显示(复习版)
        if(this.indexReview > 0  && this.indexReview < parseInt(this.form.wordsNumber)){
          await this.getUserReviewWordState(this.sendReviewWordId())
          this.judgeReviewIsCollect()
        }
      }
    },
    //复习单词按钮变为切换复习模块
    ChangeModule(){
      this.changeModule = true
    },
    //收藏单词
    async CollectWord(){
      if(this.userWordStateById[0].iscollect == 0){
        this.$refs.littleStar.style.color = '#faaa5a'
        await this.$store.dispatch('card/UpdateUserWordIscollect',{id:this.sendWordId()})
        await this.getUserWordState(this.sendWordId())
        this.$message({
          message: '收藏单词成功',
          type: 'success',
          customClass:'collectSuccess',
          duration:2500
        })
      }else if(this.userWordStateById[0].iscollect == 1){
        this.$refs.littleStar.style.color = '#eef0f4'
        await this.$store.dispatch('card/UpdateUserWordNotcollect',{id:this.sendWordId()})
        await this.getUserWordState(this.sendWordId())
        this.$message({
          message: '取消收藏成功',
          type: 'success',
          customClass:'collectSuccess',
          duration:2500
        })
      }
    },
    //收藏单词(复习版)
    async CollectReviewWord(){
      if(this.indexReview !== parseInt(this.form.wordsNumber)){
          if(this.userReviewWordStateById[0].iscollect == 0){
            this.$refs.ReviewLittleStar.style.color = '#faaa5a'
            await this.$store.dispatch('card/UpdateUserWordIscollect',{id:this.sendReviewWordId()})
            await this.getUserReviewWordState(this.sendReviewWordId())
            this.$message({
              message: '收藏单词成功',
              type: 'success',
              customClass:'collectSuccess',
              duration:2500
            })
          }else if(this.userReviewWordStateById[0].iscollect == 1){
            this.$refs.ReviewLittleStar.style.color = '#eef0f4'
            await this.$store.dispatch('card/UpdateUserWordNotcollect',{id:this.sendReviewWordId()})
            await this.getUserReviewWordState(this.sendReviewWordId())
            this.$message({
              message: '取消收藏成功',
              type: 'success',
              customClass:'collectSuccess',
              duration:2500
            })
          }
      }
    },
    //获取用户单词状态
    async getUserWordState(id){
      try {
        await this.$store.dispatch('card/GetUserWordStateById',{id})
      } catch (error) {
        console.log(error);
      }
    },
    //获取用户单词状态(复习版)
    async getUserReviewWordState(id){
      try {
        await this.$store.dispatch('card/GetUserReviewWordStateById',{id})
      } catch (error) {
        console.log(error);
      }
    },
    //判断是否收藏
    judgeIsCollect(){
      if(this.userWordStateById[0]){
        if(this.userWordStateById[0].iscollect == 0){
          this.$refs.littleStar.style.color = '#eef0f4'
        }else if(this.userWordStateById[0].iscollect == 1){
          this.$refs.littleStar.style.color = '#faaa5a'
        }
      }
    },
    // 判断是否收藏(复习版)
    judgeReviewIsCollect(){
      if(this.userReviewWordStateById[0]){
        if(this.userReviewWordStateById[0].iscollect == 0){
          this.$refs.ReviewLittleStar.style.color = '#eef0f4'
        }else if(this.userReviewWordStateById[0].iscollect == 1){
          this.$refs.ReviewLittleStar.style.color = '#faaa5a'
        }
      }
    },
    // 跳转到control
    buyMoreCoursebtn(){
      this.$router.push({
          path:'/control'
        })
    },
    // 修改Dialog的title
    ChangeDialogTitle(titlename){
      this.titlename = titlename
    },
    // getStudyMore() localStorage 初始化
    // async getStudyMore_initialize(){
    //   if(!localStorage.hasOwnProperty("studyMore")){
    //     console.log("getStudyMore_initialize");
    //     setStudyMore({
    //       btn:'false',
    //       wordsNumber:0,
    //       timeStamp:new Date() / 1000,
    //     })
    //   }
    // },
    // // getModuleSwitch() localStorage 初始化
    // async getModuleSwitch_initialize(){
    //   if(!localStorage.hasOwnProperty("moduleSwitch")){
    //     console.log("getModuleSwitch_initialize");
    //     setModuleSwitch({
    //       btn:'false',
    //       reviewWordsNumber:0,
    //       timeStamp:new Date() / 1000,
    //     })
    //   }
    // },

  },
  beforeCreate() {
    // 初始化
    if(!localStorage.hasOwnProperty("studyMore")){
      console.log("getStudyMore_initialize");
      setStudyMore({
        btn:'false',
        wordsNumber:0,
        timeStamp:new Date() / 1000,
      })
    }
    if(!localStorage.hasOwnProperty("moduleSwitch")){
        console.log("getModuleSwitch_initialize");
        setModuleSwitch({
          btn:'false',
          reviewWordsNumber:0,
          timeStamp:new Date() / 1000,
        })
      }
  },
  async mounted() {
    // 初始化
    // await this.getStudyMore_initialize()
    // await this.getModuleSwitch_initialize()
    
    
    //读取studyMore的时间戳并判断
    if(getStudyMore()){
      const oldtimeStamp = getStudyMore().timeStamp
      // const newtimeStamp = new Date() / 1000
      // console.log(this.isFormer(oldtimeStamp));
      if(this.isFormer(oldtimeStamp) == true){
        // clearStudyMore()
        setStudyMore({
          btn:'false',
          wordsNumber:0,
          timeStamp:new Date() / 1000,
        })
      }
    }
    //读取moduleSwitch的时间戳并判断
    if(getModuleSwitch()){
      const oldtimeStamp = getModuleSwitch().timeStamp
      // const newtimeStamp = new Date() / 1000
      // console.log(this.isFormer(oldtimeStamp));
      if(this.isFormer(oldtimeStamp) == true){
        // clearStudyMore()
        setModuleSwitch({
          btn:'false',
          reviewWordsNumber:0,
          timeStamp:new Date() / 1000,
        })
      }else{
        if (getModuleSwitch().reviewWordsNumber && parseInt(getModuleSwitch().reviewWordsNumber) !== 0) {
          this.form.wordsNumber = getModuleSwitch().reviewWordsNumber
          // console.log(parseInt(getModuleSwitch().reviewWordsNumber));
          await this.$store.dispatch('card/GetLearnWordBySelect',{number:parseInt(getModuleSwitch().reviewWordsNumber)})
          //判断是否收藏并显示(复习版)
          await this.getUserReviewWordState(this.sendReviewWordId())
          this.judgeReviewIsCollect()
        }
      }
    }


    // star()//收藏单词
    this.getUserNoLearnWords()
    if(getStudyMore().btn == 'true'){
      try {
        await this.getStudyMoreNumber({studyMoreNumber:parseInt(getStudyMore().wordsNumber)})
      } catch (error) {
        console.log(error);
      }
    }else{
      try {
        await this.getNeedNoLearnWords()
      } catch (error) {
        console.log(error);
      }
    }
    await this.$store.dispatch('home/GetUserPlan')
    //每天更新用户的已完成的学习计划单词(清空 complete)
    if(this.userPlan[0]){
      if (this.userPlan[0].timeStamp) {
        // console.log(1111);
        // const newTimeStamp = new Date().getTime()
        const TimeStamp = this.userPlan[0].timeStamp
        // console.log(TimeStamp);
        // console.log(this.isFormer('1654087311'));
        if(this.isFormer(TimeStamp) == true){
          // console.log(222);
          await this.$store.dispatch('card/UpdatePlanComlete',{complete:0})
          await this.$store.dispatch('card/UpdatePlanTimeStamp')
          await this.$store.dispatch('home/GetUserPlan')
        }
      }else{
      // console.log(333);
      await this.$store.dispatch('card/UpdatePlanTimeStamp')
      }
    }
    
    if(getStudyMore().btn == 'true'){
      await this.todayStudyMord()
    }else{
      await this.today()
    }
    // trim()
    // this.NoLearnWord = this.randomArray(this.$store.state.card.needNoLearnWords)
    // console.log(this.randomArray(this.$store.state.card.needNoLearnWords));
    
    this.$nextTick(() => {
      //绑定自定义事件(复习)
      this.$refs.dialog.$on('parameters',this.getFormdata)
      //绑定自定义事件(学习更多单词)
      this.$refs.dialog.$on('studyMoreWord',this.getStudyMoreNumber)
    });
    
    // if(this.ModuleSwitch && this.ModuleSwitch=='true'){
    //   this.$store.dispatch('card/GetLearnWordBySelect',{number:this.wordsNumber})
    // }
    // this.$refs.dialog.$on('changeStudy',this.getFormdata)
    // console.log(this.sendWordId());
    //判断是否收藏并显示
    await this.getUserWordState(this.sendWordId())
    if(this.userWordStateById[0]){
      if(this.userWordStateById[0].iscollect == 0){
        this.$refs.littleStar.style.color = '#eef0f4'
      }else if(this.userWordStateById[0].iscollect == 1){
        this.$refs.littleStar.style.color = '#faaa5a'
      }
    }else{
      // console.log(1111);
    }
    

  },
  computed:{
    //随机数组
    word(){
      return this.randomArray(this.needNoLearnWords)
    },
    ...mapState('card',['needNoLearnWords','LearnWordBySelect','userWordStateById','userReviewWordStateById']),
		...mapState('home',['userPlan']),
    //打乱数组时显示的条件
    conditions(){
      return this.needNoLearnWords[this.word[this.indexNumber]]
    },
    //复习单词数组显示的条件
    ReviewConditions(){
      return this.LearnWordBySelect[this.indexReview]
    },
    audioSrc(){
      return `https://dict.youdao.com/dictvoice?audio=${this.showWord()}&type=1`
    },
    audioReviewSrc(){
      return `https://dict.youdao.com/dictvoice?audio=${this.showReviewWord()}&type=1`
    }
  },
  watch:{
    //进度条
    learningWords(newvaule,oldvaule){
      if(this.userPlan[0]){

        // console.log(this.progressWid);
        this.progressWid = newvaule / this.userPlan[0].plan_complete * 100
        // console.log(this.progressWid);
        if(this.progressWid === 100){
          this.$refs.progressbar.style.backgroundColor = '#43d281'
        }else{
          this.$refs.progressbar.style.backgroundColor = '#2c3143'
        }
      }
    },
    ModuleSwitch(newvaule){
      if (newvaule == 'true') {
        this.changeModule = true
      }
    },
    // indexNumber(newvaule,oldvaule){
    //   trim()
    // }
    //进度条(复习)
    indexReview(newvaule){
      this.progressReviewWid = newvaule / this.form.wordsNumber * 100
      
      if(this.progressReviewWid === 100){
        this.$refs.progressReviewbar.style.backgroundColor = '#43d281'
        this.$refs.rightIco.style.display = 'block'
      }else{
        this.$refs.progressReviewbar.style.backgroundColor = '#2c3143'
        this.$refs.rightIco.style.display = 'none'
      }
    },
    //
    indexNumber(newvaule){
      this.$nextTick(() => {
        this.playWordMusic()
      })
    }
  }
}


</script>

<style>
.card-grid {
  width: 648px;
  height: 671px;
  margin: 0 auto;
  transform: translate(4%, -2%);
  overflow: hidden;
}

.card-grid .title-card {
  margin: 32px 16px 24px;
  color: #2c3143;
  font-size: 22px;
}

.card-grid .card-container {
  position: relative;
  width: 100%;
  height: 340px;
  background-color: #fff;
  margin-bottom: 0;
  min-height: 318px;
  border-radius: 10px;
  overflow: hidden;
}

#disabled-card{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0.5;
  color: #808080;
  text-align: center;
  line-height: 345px;
  font-size: 47px;
}

.card-grid .card-container .card-main {
  width: 100%;
  height: 80%;
  padding: 24px;
}

.card-grid .card-container .card-main .card-word-top{
  width: 100%;
  float: left;

}

.card-grid .card-container .card-main .card-word {
  float: left;
  /* width: 100%; */
  height: 20%;
  margin-bottom: 22px;
  font-size: 40px;
  color: #037889;
  text-align: left;
  white-space: nowrap;
}

.card-grid .card-container .card-main .card-word-top .card-phonetic{
  height: 20%;
  float: left;
  line-height: 66px;
  margin-left: 20px;
}

.card-grid .card-container .card-main .card-word-top .card-phonetic > i{
  color: #037889;
  margin-right: 5px;
  cursor: pointer;
}
  
.card-grid .card-container .card-main .card-word-top .youcanchange{
  font-size: 20px;
}


.card-grid .card-container .card-main .main-left {
  float: left;
  width: 25%;
  height: 80%;
}

.card-grid .card-container .card-main .buymorecourse{
  width: 50%;
  height: 45%;
  text-align: center;
}

.card-grid .card-container .card-main .buymorecourse > button,.card-grid .card-container .card-main .restudy>button{
  width: 200px;
  height: 70px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #2c3143;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;
  margin-right: 20px;
  user-select: none;
}

.card-grid .card-container .card-main .buymorecourse>button:hover,.card-grid .card-container .card-main .restudy>button:hover{
  box-shadow: 0 5px 14px 0 rgb(82 63 105 / 20%);
  background-color: #565a69;
}

.card-grid .card-container .card-main .main-left .card-btn {
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

.card-grid .card-container .card-main .main-left .card-btn:hover {
  box-shadow: 0 5px 14px 0 rgb(82 63 105 / 20%);
}

.card-grid .card-container .card-main .main-left .card-collect{
  margin-top: 10px;
}

.card-grid .card-container .card-main .main-left .card-collect i{
  color: #eef0f4;
  font-size: 28px;
  cursor: pointer;
  transition: all 0.25s;
}

.card-grid .card-container .card-main .main-right {
  float: left;
  width: 75%;
  height: 80%;
}
.card-grid .card-container .card-main .main-right .card-answer {
  font-size: 16px;
}
.card-grid .card-container .card-main .main-right .card-answer .card-translate {
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  font-size: 18px;
  margin-bottom: 5px;
}
.card-grid .card-container .card-main .main-right .card-answer .card-cixing {
  margin-bottom: 5px;
  font-size: 13px;
  color: #7b7474;
}
.card-grid .card-container .card-main .main-right .card-answer .card-notes {
  color:#2c3143
}

.card-grid .card-container .card-main .restudy {
  width: 50%;
  height: 45%;
  text-align: center;
}

.card-grid .card-container .card-footer {
  width: 100%;
  height: 20%;
  padding: 24px;
  background-color: #f7f8fa;
}
.card-grid .card-container .card-footer button {
  float: left;
  width: 110px;
  height: 32px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #2c3143;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;
  margin-right: 20px;
  user-select: none;
}

.card-grid .card-container .card-footer button:hover {
  background-color: #565a69;
}

.card-grid .card-container .card-footer .switchover-word{
  float: right;
}

.card-grid .card-container .card-footer .switchover-word > div {
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

.card-grid .card-container .card-footer .switchover-word>div:hover{
  background-color: #2c3143;
  color: #fff;
}

.card-grid .card-schedule {
  width: 100%;
  height: 50px;
  background-color: #fff;
  margin-top: 195px;
  border-radius: 10px;
  opacity: .8;
  padding: 8px;
  overflow: hidden;
}

.card-grid .card-schedule > div.set-progress{
  float: left;
  margin: 11.2px 0;
  max-width: 260px;
}

.card-grid .card-schedule .set-progress > div.progress-number {
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

.card-grid .card-schedule div.set-progress > div.progress-background {
  float: left;
  width: 172px;
  height: 10px;
  max-width: 550px;
  background: #eef0f4;
  border-radius: 4px;
}

.card-grid .card-schedule div.set-progress div.progress-background > div.progress-bar {
  height: 10px;
  background: #2c3143;
  border-radius: 4px;
  transition: width .5s;
  min-width: 6px;
  max-width: 100%;
}

.card-grid .card-schedule>div.finish-more{
  float: left;
  /* margin: 11.2px 0; */
  line-height: 34px;
}

.card-grid .card-schedule>div.finish-more > i{
  position: relative;
  top: -1px;
  float: left;
  width: 16px;
  color: #43d281;
  margin:0 5px;
}

.card-grid .card-schedule>div.finish-more>p {
  float: left;
  font-size: 14px;
}

.card-grid .card-schedule>div.finish-more>button,.card-grid .card-schedule>div.more-review>button {
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

.card-grid .card-schedule>div.more-review {
  float: right;
}

.card-grid .card-schedule>div.more-review > button{
  float: none;
  margin-left: 0;
}

.card-grid .card-schedule>div.finish-more>button:hover,.card-grid .card-schedule>div.more-review>button:hover {
  background-color: #2c3143;
  color:#fff;
}
</style>