<template>
    <div class="choice-fill">
        <div class="choice-top">
            <button @click="reStart">重新开始</button>
            <div class="choice-schedule">
                <div>{{complete}}</div>
                <div class="choice-progressBar">
                    <div class="choice-bar" :style="'width:'+this.progressWid+'%'">
                        <div class="progressBar-shadow"></div>
                    </div>
                </div>
                <div>{{plan}}</div>
            </div>
            <el-popover
            placement="bottom-end"
            title="更改学习计划"
            width="260"
            height="120"
            trigger="click"
            v-model="visible"
            popper-class="popover">
            <el-input-number class="inputNumber" v-model="planComplete" :min="5" :max="20" label="描述文字" :step="5" :step-strictly="true" :size="'small'"></el-input-number>
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="visible = false;sureUpdatePlan()">确定</el-button>
            <!-- <i class="bi bi-pencil-square" slot="reference" title="更改学习计划"></i> -->
            <!-- <el-button slot="reference">hover 激活</el-button> -->
            <button class="choice-barBtn" slot="reference">更改计划</button>
            </el-popover>
        </div>
        <div class="choice-content">
            <h2>请选择该单词的中文注解</h2>
            <div class="choice-tips">
                <div class="choice-dialog">{{showWord()}}<i class="bi bi-volume-down-fill" @click="playWordMusic()"></i></div>
            </div>
            <div class="choice-itemlist">
                <div class="choice-fillCenter">
                    <!-- <div class="choice-item choice-itemLeave">like</div> -->
                    <!-- <div class="choice-item" data-id="1"><div class="choice-letter">A</div><div class="choice-option">形容词:学院的，大学的，学会的，（学术，文艺）协会的; 学究的，学理上的，空谈的，非实用的; 〈美〉文科的，文学的; 柏拉图学派的,名词:学者; 大学教师，大学生，学会会员; 纸上空论，空论; [A-]柏拉图哲学信奉者</div></div> -->
                    <!-- <div class="choice-item" data-id="1"><div class="choice-letter">A</div><div class="choice-option">{{showNotes()}}</div></div>
                    <div class="choice-item" data-id="2"><div class="choice-letter">B</div><div class="choice-option">名词:专科学校; 学会，学院; 一般的高等教育; 私立学校，学术团体</div></div>
                    <div class="choice-item" data-id="3"><div class="choice-letter">C</div><div class="choice-option">名词:培根; 腊肉; 熏猪肉; 咸猪肉</div></div>
                    <div class="choice-item" data-id="4"><div class="choice-letter">D</div><div class="choice-option">名词:账，账目; 存款; 记述，报告; 理由,不及物动词:解释; 导致; 报账,及物动词:认为; 把…视作</div></div> -->
                    <div class="choice-item" v-for="option, index in this.showOptions()" :key="option.id" :data-id="option.id" @click="changeOptions($event,option.id,index,option.words)">
                        <div class="choice-item-positive">
                            <div class="choice-letter">{{abcd(index)}}</div>
                            <div class="choice-option">{{option.notes}}</div>
                        </div>
                        <div class="choice-item-reverse">
                            <div class="choice-letter">{{abcd(index)}}</div>
                            <!-- <div class="choice-option">{{option.notes}}</div> -->
                            <div class="choice-option">
                                <p>{{option.words}}<i class="bi bi-volume-down-fill"></i></p>
                                <p>{{option.phonetic}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="choice-check" ref="choiceCheck" style="background-color: #d7ffb8;background-color:#ffdfe0;background-color: #fff;">
            <div class="choice-checkBtnLeft">
                <div class="choice-skipBtn" v-if="!IsRight && !IsSorry"><button :disabled="checBtnDisabled" @click="skip">跳过</button></div>
                <div class="choice-rightTip" v-if="IsRight">
                    <div class="choice-checkIco"><i class="bi bi-check"></i></div>
                    <div class="choice-checkInfo">
                        <div class="choice-verygood">非常好!</div>
                        <div class="choice-answer">{{showAnswer()}}</div>
                    </div>
                </div>
                <div class="choice-wrongTip" v-if="IsSorry">
                    <div class="choice-wrongIco"><i class="bi bi-x"></i></div>
                    <div class="choice-wrongInfo">
                        <div class="choice-trueAnswersIs">正确答案是：</div>
                        <div class="choice-rightAnswer">{{showAnswer()}}</div>
                    </div>
                </div>
            </div>
            <div class="choice-checkBtnRight">
                <button class="whenPass" :disabled="checBtnDisabled" @click="checkAnswer" ref="Continuebtn">检查</button>
            </div>
        </div>
        <audio controls="controls" hidden :src="this.audioSrc()" ref="audio"></audio>
        <audio controls="controls" hidden :src="audioOptionSrc" ref="audioOption"></audio>
        <audio controls="controls" volume="0.5" hidden src="/audio/Wrong.mp3" ref="audio2"></audio>
        <audio controls="controls" hidden src="/audio/Bingo.mp3" ref="audio1"></audio>


    </div>
</template>

<script>
import {mapState} from 'vuex'
import {setFillPlan, getFillPlan, clearFillPlan} from '../../../../utils/fillPlan'
export default {
    name:'Fill',
    data() {
        return {
            number:0,//学习计划
            indexNumber:0,//步
            BingoNumber:0,//答对的步
            optionsId:0,//选项id,检查选项时用
            IsRight:false,//回答正确时显示的内容
            IsSorry:false,//回答错误时显示的内容
            checkbtn:true,//检查 和 继续 按钮
            checBtnDisabled: false,//是否禁用check按钮和跳过按钮
            optinosBtn: true,//选项点击,true为可点击
            flageA:false,//选项A是否翻转
            flageB:false,//选项B是否翻转
            flageC:false,//选项C是否翻转
            flageD:false,//选项D是否翻转
            progressWid:0,//进度条宽度
            plan:0,
            complete:0,
            visible:false,
            planComplete:0,
            audioOptionSrc:'',
        }   
    },
    methods: {
        //播放回答正确的音乐
        playRightMusic() {
            this.$refs.audio1.volume = 0.1
            this.$refs.audio1.currentTime = 0;//从头开始播放
            this.$refs.audio1.play(); //播放
            setTimeout(()=>{
                this.$refs.audio1.pause();//停止
            },3000);
        },
        //播放回答错误的音乐
        playWrongMusic() {
            this.$refs.audio2.volume = 0.1
            this.$refs.audio2.currentTime = 0;//从头开始播放
            this.$refs.audio2.play(); //播放
            setTimeout(()=>{
                this.$refs.audio2.pause();//停止
            },3000);
        },
        //播放单词读音
        playWordMusic() {
            this.$refs.audio.currentTime = 0;//从头开始播放
            this.$refs.audio.play(); //播放
            // setTimeout(()=>{
            //     this.$refs.audio.pause();//停止
            // },5000);
        },
        //播放选项读音
        playOptionMusic() {
            // this.$refs.audioOption.volume = 0.1
            this.$refs.audioOption.currentTime = 0;//从头开始播放
            this.$refs.audioOption.play(); //播放
            // setTimeout(()=>{
            //     this.$refs.audioOption.pause();//停止
            // },3000);
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
        //根据自定义属性获取元素
        getElementByAttr(tag, dataAttr, reg) {
            var aElements = document.getElementsByTagName(tag);
            var aEle = [];
            for(var i = 0; i < aElements.length; i++) {
                var ele = aElements[i].getAttribute(dataAttr);
                if(reg.test(ele)) {
                    aEle.push(aElements[i]);
                }
            }
            return aEle;
        },
        showId(){
            if(this.conditions){
                return this.LearnedWordMcq[this.word[this.indexNumber]].id
            }
        },
        showWord(){
            if(this.conditions){
                return this.LearnedWordMcq[this.word[this.indexNumber]].words
            }
        },
        showNotes(){
            if(this.conditions){
                return this.LearnedWordMcq[this.word[this.indexNumber]].notes
            }
        },
        showOptions(){
            if(this.conditions){
                return this.LearnedWordMcq[this.word[this.indexNumber]].Options
            }
        },
        showAnswer(){
            // console.log(this.showId());
            // const answer = this.getElementByAttr('ddocument.querySelector("div[dataid=222]")iv','data-id',eval('/^'+this.showId()+'$/'))
            // console.log(this.getElementByAttr('div','data-id',eval('/^'+this.showId()+'$/')));
            const answer = document.querySelector(`div[data-id="${this.showId()}"]`)
            // console.log(answer);
            if(answer){
                return answer.children[0].children[0].innerText +" " +answer.children[0].children[1].innerText
            }
            // console.log(answer.children[0].innerText);
            // console.log(typeof answer);
        },
        //显示ABCD
        abcd(index){
            switch (index) {
                case 0:
                    return 'A'
                case 1:
                    return 'B'
                case 2:
                    return 'C'
                case 3:
                    return 'D'
                default:
                    break;
            }
        },
        //选择ABCD
        changeOptions(e,id,index,words){
            // console.log(e.currentTarget.children[1]);
            this.audioOptionSrc = "https://dict.youdao.com/dictvoice?audio="+words+"&type=1"
            if(this.optinosBtn == false){
                switch (index) {
                    case 0:
                        if(this.flageA == false){
                            e.currentTarget.classList.add("choice-item-flip")
                            this.$nextTick(() => {
                                this.playOptionMusic()
                            })
                            this.flageA = true
                        }else{
                            e.currentTarget.classList.remove("choice-item-flip")
                            this.flageA = false
                        }
                        break;

                    case 1:
                        if(this.flageB == false){
                            e.currentTarget.classList.add("choice-item-flip")
                            this.$nextTick(() => {
                                this.playOptionMusic()
                            })
                            this.flageB = true
                        }else{
                            e.currentTarget.classList.remove("choice-item-flip")
                            this.flageB = false
                        }
                        break;

                    case 2:
                        if(this.flageC == false){
                            e.currentTarget.classList.add("choice-item-flip")
                            this.$nextTick(() => {
                                this.playOptionMusic()
                            })
                            this.flageC = true
                        }else{
                            e.currentTarget.classList.remove("choice-item-flip")
                            this.flageC = false
                        }
                        break;
                
                    case 3:
                        if(this.flageD == false){
                            e.currentTarget.classList.add("choice-item-flip")
                            this.$nextTick(() => {
                                this.playOptionMusic()
                            })
                            this.flageD = true
                        }else{
                            e.currentTarget.classList.remove("choice-item-flip")
                            this.flageD = false
                        }
                        break;
                
                    default:
                        break;
                }
                
                
            }else{
                for (let index = 0; index < 4; index++) {
                    e.currentTarget.parentNode.children[index].classList.remove("choice-itemSelected")
                }
                e.currentTarget.classList.add("choice-itemSelected")
                this.optionsId =  id

                

                return e.currentTarget
            }
            
            // if(id == this.showId()){
            //     console.log("对");
            // }else{
            //     console.log("错");
            // }
        },
        //继续按钮
        async nextbtn(){
            const choiceItem = document.querySelectorAll(".choice-item")   
            // console.log(choiceItem);
            for (let index = 0; index < 4; index++) {
                // const element = array[index];
                choiceItem[index].classList.remove("choice-item-flip")
            }
            this.flageA = false
            this.flageB = false
            this.flageC = false
            this.flageD = false

            if(this.indexNumber == parseInt(this.LearnedWordMcq.length) - 1){
                console.log('结束');
                if(getFillPlan().complete == getFillPlan().plan){
                    this.$message({
                        type:'success',
                        message: '恭喜你，完成了今日计划！',
                        showClose: true
                    })
                    this.checBtnDisabled = true
                    this.optinosBtn = false
                }else{
                    try {
                        this.number = getFillPlan().plan - getFillPlan().complete
                        // console.log(this.number);
                        await this.$store.dispatch('fill/GetMCQBySelect',{number:this.number})
                        this.indexNumber = -1
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            
            this.optionsId = 0
            this.IsRight = false
            this.IsSorry = false
            this.$refs.choiceCheck.style.backgroundColor = '#fff'
            this.$refs.Continuebtn.innerText = '检查'
            this.$refs.Continuebtn.classList.remove('whenPassWrong')
            this.indexNumber++

            if(this.plan !== this.complete){
                this.$nextTick(() => {
                    this.playWordMusic()
                })
            }

            

            this.optinosBtn = true
            this.checkbtn = true
        },
        //检查答案是否正确 和 继续按钮
        async checkAnswer(){
            if(this.checkbtn == true){
                // 检查答案
                if(this.optionsId == 0){
                    this.$message({
                        type:'warning',
                        message: '请选中你的答案！',
                        customClass:'messageSuccess',
                        duration:2500
                    })
                    return
                }
                if(this.optionsId == this.showId()){
                    console.log("对");
                    const complete = getFillPlan().complete + 1
                    // console.log(complete);

                    setFillPlan({
                        plan:getFillPlan().plan,
                        complete:complete,
                        timeStamp:getFillPlan().timeStamp
                    })

                    this.complete = getFillPlan().complete

                    this.BingoNumber++
                    this.IsRight = true
                    this.IsSorry = false
                    this.$refs.choiceCheck.style.backgroundColor = '#d7ffb8'
                    this.$refs.Continuebtn.innerText = '继续'

                    this.$nextTick(() => {
                        this.playRightMusic()
                        this.playWordMusic()
                    })

                }else{
                    console.log("错");
                    this.IsRight = false
                    this.IsSorry = true
                    this.$refs.choiceCheck.style.backgroundColor = '#ffdfe0'
                    this.$refs.Continuebtn.classList.add('whenPassWrong')
                    this.$refs.Continuebtn.innerText = '继续'
                    
                    this.$nextTick(() => {
                        this.playWrongMusic()
                    })
                }
                
                this.optinosBtn = false
                this.checkbtn = false
                
            }else{
                // 继续按钮
                this.nextbtn()
            }
                
        },
        //跳过
        skip(){
            this.IsRight = false
            this.IsSorry = true
            this.$refs.choiceCheck.style.backgroundColor = '#ffdfe0'
            this.$refs.Continuebtn.classList.add('whenPassWrong')
            this.$refs.Continuebtn.innerText = '继续'

            this.$nextTick(() => {
                this.playWrongMusic()
                this.playWordMusic()
            })

            this.optinosBtn = false
            this.checkbtn = false
        },
        //重新开始
        reStart(){
            this.$confirm('是否确认重新开始？','提示',{
					confirmButtonText: '确定',
          			cancelButtonText: '取消',
					type:'warning',
					showClose:false
				}).then(async() => {
                    if(this.checkbtn == false){
                        this.flageA = false
                        this.flageB = false
                        this.flageC = false
                        this.flageD = false

                        this.optionsId = 0
                        this.IsRight = false
                        this.IsSorry = false
                        this.$refs.choiceCheck.style.backgroundColor = '#fff'
                        this.$refs.Continuebtn.innerText = '检查'
                        this.$refs.Continuebtn.classList.remove('whenPassWrong')

                        this.optinosBtn = true
                        this.checkbtn = true

                    }

                    this.number = getFillPlan().plan

                    await this.$store.dispatch('fill/GetMCQBySelect',{number:this.number})
                    this.indexNumber = 0
                    this.BingoNumber = 0
                    setFillPlan({
                        plan:getFillPlan().plan,
                        complete:0,
                        timeStamp:getFillPlan().timeStamp
                    })

                    this.complete = getFillPlan().complete

                    this.checBtnDisabled = false
				}).catch(() => {
					this.$message({
                        type:'warning',
                        message: '已取消',
                        duration:2500,
						customClass:'el-cancel'
                    })
				})
        },
        //更改学习句子计划       
        async sureUpdatePlan(){
            try {
                const newPlan = this.planComplete
                console.log(newPlan);


                setFillPlan({
                    plan:newPlan,
                    complete:getFillPlan().complete,
                    timeStamp:getFillPlan().timeStamp
                })
                this.plan = getFillPlan().plan
                this.number = getFillPlan().plan - getFillPlan().complete

                await this.$store.dispatch('fill/GetMCQBySelect',{number:this.number})

                this.BingoNumber = 0
                this.indexNumber = 0
            } catch (error) {
                this.$message({
                    message: '修改计划失败！',
                    type: 'error',
                    customClass:'otherCourser',
                });
                console.log(error);
            }
        },
        audioSrc(){
            if(this.showWord()){
                return `https://dict.youdao.com/dictvoice?audio=${this.showWord()}&type=1`
            }
        }
    },
    async mounted() {
        // console.log(localStorage.hasOwnProperty("isRemember"));
        if(!localStorage.hasOwnProperty("fillPlan")){
            // console.log(123);
            setFillPlan({
                plan:5,
                complete:0,
                timeStamp:new Date() / 1000
            })
        }
        // console.log(typeof getFillPlan().paln);
        this.number = getFillPlan().plan - getFillPlan().complete

        this.complete = getFillPlan().complete
        this.plan = getFillPlan().plan
        // console.log(this.number);
        try {
            await this.$store.dispatch('fill/GetMCQBySelect',{number:this.number})
        } catch (error) {
            this.$message({
                type:'success',
                message: '恭喜你，完成了今日全部回答',
                showClose: true
            })
            this.checBtnDisabled = true
            this.optinosBtn = false
            console.log(error);
        }
    },
    computed:{
        ...mapState('fill',['LearnedWordMcq']),
        //随机数组
        word(){
            return this.randomArray(this.LearnedWordMcq)
        },
        //打乱数组时显示的条件
        conditions(){
            return this.LearnedWordMcq[this.word[this.indexNumber]]
        },
    },
    watch:{
        complete(newvaule){
            this.progressWid = newvaule / getFillPlan().plan * 100
        },
        plan(newvaule){
            this.progressWid = getFillPlan().complete / newvaule * 100
        }
    }

}
</script>

<style>

</style>