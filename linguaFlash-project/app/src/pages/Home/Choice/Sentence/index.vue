<template>
    <div class="choice-sentence" >
        <div class="choice-top">
            <button @click="reStart">重新开始</button>
            <div class="choice-schedule">
                <div>{{BingoNumber}}</div>
                <div class="choice-progressBar">
                    <div class="choice-bar" :style="'width:'+this.progressWid+'%'">
                        <div class="progressBar-shadow"></div>
                    </div>
                </div>
                <div>{{this.StylePlan()}}</div>
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
        <div class="choice-finish" v-show="checBtnDisabled">
            <div class="choice-finish-tool">
                <h2>恭喜你，完成了今日全部回答！棒棒棒！</h2>
                <div>你可以选择重新开始学习或设置更多的学习计划</div>
            </div>
        </div>
        <div class="choice-content"  v-show="!checBtnDisabled">
            <div class="choice-prompt">
                <h2>用{{this.ChineseOrEnglish == true ? '中文' : '英语'}}写出这句话</h2>
                <div class="choice-skilled">
                    <div class="stripes" ref="stripes">
                        <div class="stripe one"></div>
                        <div class="stripe two"></div>
                        <div class="stripe three"></div>
                        <div class="stripe four"></div>
                        <div class="stripe five"></div>
                    </div>
                    <div class="repeat-description"><span ref="proficiencyTip"></span></div>
                </div>
                <!-- 
                记忆满点！
                唾手可得！
                就要学起来了！
                这个单词需要多练练！
                没见过的新单词！ -->
            </div>
            <div class="choice-tips">
                <div class="choice-dialog">{{this.showTips()}}</div>
            </div>
            <div class="choice-row" ref="sentenceRow">
            </div>
            <div class="choice-itemlist">
                <div class="choice-makeCenter" ref="choiceOptions">
                    <!-- <div class="choice-item choice-itemLeave">like</div> -->
                    <div class="choice-item" v-for="options,index in this.options" :key="index" :data-id="index" @click="selectOptionsAbled && selectOptions($event, index)">{{options}}</div>
                </div>
            </div>
        </div>
        <div class="choice-check" ref="choiceCheck" style="background-color: #d7ffb8;background-color:#ffdfe0;background-color: #fff;">
            <div class="choice-checkBtnLeft">
                <div class="choice-skipBtn" v-if="!IsRight && !IsSorry"><button @click="skip">跳过</button></div>
                <div class="choice-rightTip" v-if="IsRight">
                    <div class="choice-checkIco"><i class="bi bi-check"></i></div>
                    <div class="choice-checkInfo">
                        <div class="choice-verygood">非常好!</div>
                        <div class="choice-answer">{{this.showAnswer()}}</div>
                    </div>
                </div>
                <div class="choice-wrongTip" v-if="IsSorry">
                    <div class="choice-wrongIco"><i class="bi bi-x"></i></div>
                    <div class="choice-wrongInfo">
                        <div class="choice-trueAnswersIs">正确答案是：</div>
                        <div class="choice-rightAnswer">{{this.showAnswer()}}</div>
                    </div>
                </div>
            </div>
            <div class="choice-checkBtnRight">
                <button class="whenPass" :disabled="checBtnDisabled"  @click="checkSentence"  ref="Continuebtn">检查</button>
                <!-- <button class="whenPass" @click="ContinueTo" ref="Continuebtn">继续</button> -->
            </div>
        </div>
        <audio controls="controls" hidden src="/audio/Bingo.mp3" ref="audio"></audio>
        <audio controls="controls" hidden src="/audio/Wrong.mp3" ref="audio2"></audio>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name:'Sentence',
    data() {
        return {
            indexNumber:0,//步
            BingoNumber:0,//答对 步
            options:[],//选项
            IsRight:false,//回答正确时显示的内容
            IsSorry:false,//回答错误时显示的内容
            checkbtn:true,//检查 和 继续 按钮
            selectOptionsAbled:true,//是否启用 选择 词语选项
            ChineseOrEnglish:true,//true为英译中,false为中译英
            progressWid:0,//进度条宽度
            checBtnDisabled: false,//是否禁用check按钮
            visible:false,
            planComplete:0,
        }
    },
    methods: {
        //播放回答正确的音乐
        playRightMusic() {
            this.$refs.audio.currentTime = 0;//从头开始播放
            this.$refs.audio.play(); //播放
            setTimeout(()=>{
                this.$refs.audio.pause();//停止
            },3000);
        },
        //播放回答错误的音乐
        playWrongMusic() {
            this.$refs.audio2.currentTime = 0;//从头开始播放
            this.$refs.audio2.play(); //播放
            setTimeout(()=>{
                this.$refs.audio2.pause();//停止
            },3000);
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
        //打乱数组顺序
        shuffle(arr){
            var l = arr.length
            var index, temp
            while(l>0){
                index = Math.floor(Math.random()*l)
                temp = arr[l-1]
                arr[l-1] = arr[index]
                arr[index] = temp
                l--
            }
            return arr
        },
        //取出两个数组的不同元素
        // getArrDifference (arr1, arr2) {
        //     return arr1.concat(arr2).filter(function (v, i, arr) {
        //         return arr.indexOf(v) === arr.lastIndexOf(v)
        //     })
        // },
        //数组去重
        unique(arr) {
            let newArr = [arr[0]];
            for (let i = 1; i < arr.length; i++) {
                let repeat = false;
                for (let j = 0; j < newArr.length; j++) {
                    if (arr[i] === newArr[j]) {
                        repeat = true;
                        break;
                    }else{
                        
                    }
                }
                if (!repeat) {
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        },
        //从数组中随机取出几个数组元素
        getRandomArrayElements(arr, count) {
            var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
            while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        },
        transferId(){
             if (this.conditions) {
                return this.UserNeedSentence[this.word[this.indexNumber]].id
             }
        },
        showTips(){
            if(this.conditions){
                if (this.ChineseOrEnglish == true) {
                    return this.UserNeedSentence[this.word[this.indexNumber]].En_sentence
                } else {
                    let Ch_sentence = this.UserNeedSentence[this.word[this.indexNumber]].Ch_sentence
                    return Ch_sentence.replace(/\s*/g,'')
                }

            }
        },
        showAnswer(){
            if (this.conditions) {
                if (this.ChineseOrEnglish == true) {
                    return this.UserNeedSentence[this.word[this.indexNumber]].Ch_sentence
                } else {
                    return this.UserNeedSentence[this.word[this.indexNumber]].En_sentence
                }
            }
        },
        transferProficiency(){
            if (this.conditions) {
                return this.UserNeedSentence[this.word[this.indexNumber]].proficiency
            }
        },
        showProficiency(){
            if (this.conditions) {
                // console.log(this.UserNeedSentence[this.word[this.indexNumber]].proficiency);
                switch (this.UserNeedSentence[this.word[this.indexNumber]].proficiency) {
                    case 0:
                        // console.log('000');
                        for (let index = 0; index < 5; index++) {
                            this.$refs.stripes.children[index].className="stripe"
                        }
                        this.$refs.proficiencyTip.innerText = "没见过的新句子！"
                        break;

                    case 1:
                        // console.log('111');
                        for (let index = 0; index < 5; index++) {
                            this.$refs.stripes.children[index].className="stripe"
                        }
                        for (let index = 0; index < 1; index++) {
                            this.$refs.stripes.children[index].classList.add("one")
                        }
                        this.$refs.proficiencyTip.innerText = "还不太熟悉哦！"
                        break;

                    case 2:
                        // console.log('222');
                        for (let index = 0; index < 5; index++) {
                            this.$refs.stripes.children[index].className="stripe"
                        }
                        for (let index = 0; index < 2; index++) {
                            this.$refs.stripes.children[index].classList.add("two")
                        }
                        this.$refs.proficiencyTip.innerText = "抓紧学起来！"
                        break;

                    case 3:
                        // console.log('333');
                        for (let index = 0; index < 5; index++) {
                            this.$refs.stripes.children[index].className="stripe"
                        }
                        for (let index = 0; index < 3; index++) {
                            this.$refs.stripes.children[index].classList.add("three")
                        }
                        this.$refs.proficiencyTip.innerText = "还需要多练练！"
                        break;

                    case 4:
                        // console.log('444');
                        for (let index = 0; index < 5; index++) {
                            this.$refs.stripes.children[index].className="stripe"
                        }
                        for (let index = 0; index < 4; index++) {
                            this.$refs.stripes.children[index].classList.add("four")
                        }
                        this.$refs.proficiencyTip.innerText = "唾手可得！"
                        break;

                    case 5:
                        // console.log('555');
                        for (let index = 0; index < 5; index++) {
                            this.$refs.stripes.children[index].className="stripe"
                            this.$refs.stripes.children[index].classList.add("five")
                        }
                        this.$refs.proficiencyTip.innerText = "熟练度满点！"
                        break;
                
                    default:
                        break;
                }
            }
        },
        //计算获取的所有单词熟练度与五的差之和（学习计划）
        StylePlan(){
            if (this.conditions) {
                // console.log(UserNeedSentence);
                let num = 0
                for (let index = 0; index < this.UserNeedSentence.length; index++) {
                    num = num + 5 - parseInt(this.UserNeedSentence[index].proficiency)
                }
                return num
            }
        },
        //选择 选项
        selectOptions(event, index){
            // console.log(event.target);
            let item = event.target.cloneNode(true)
            this.$refs.sentenceRow.appendChild(item)
            event.target.classList.add("choice-itemLeave")
            // console.log(index);
            // this.$refs.sentenceRow.children.length
            // console.log(this.$refs.sentenceRow.children.length);

            this.$refs.sentenceRow.lastElementChild.addEventListener("click",(e) => {
                this.$refs.sentenceRow.removeChild(e.target)
                
                // console.log(e.target.getAttribute("data-id"));
                let dataId = e.target.getAttribute("data-id")
                let choiceMakeCenter = document.querySelector(".choice-makeCenter")
                let choiceItem = choiceMakeCenter.querySelector(`.choice-item[data-id="${dataId}"]`)

                choiceItem.classList.remove("choice-itemLeave")
            })
        },
        //更新选项
        updateOptions(){
            if(this.UserNeedSentence){
                // console.log(this.ChineseOrEnglish);
                if (this.ChineseOrEnglish == true) {
                     // const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5) 
                    // const arr = this.UserNeedSentence[this.word[this.indexNumber]].Ch_sentence.split(' ');
                    // console.log(arr);
                    // console.log(shuffleArray(arr))
                    console.log('中');
                    let confusion_Ch = this.UserNeedSentence[this.word[this.indexNumber]].confusion_Ch.split(' ')
                    let Ch_sentence = this.UserNeedSentence[this.word[this.indexNumber]].Ch_sentence.split(' ')
                    // console.log(otheritem);
                    let otherItem = JSON.parse(JSON.stringify(this.UserNeedSentence))

                    otherItem.splice(this.word[this.indexNumber],1)
                    
                    //凑数用的选项
                    let OfQuantity = []
                    for (let index = 0; index < otherItem.length; index++) {
                        // console.log(otherItem[index].Ch_sentence.split(' '));
                        OfQuantity = OfQuantity.concat(otherItem[index].Ch_sentence.split(' '))
                    }
                    //数组去重
                    OfQuantity = this.unique(OfQuantity)
                    
                    //真正的答案和混洗选项
                    const options = [...Ch_sentence,...confusion_Ch]
                
                    //凑数用的选项 不能和已有的选项重合
                    let newarr = OfQuantity.filter(item=>!options.includes(item))

                    //根据句子长度随机取出元素
                    // console.log(this.UserNeedSentence[this.word[this.indexNumber]].En_sentence.split(' ').length);
                    var max = 11;
                    var min = 8;
                    var random = parseInt(Math.random()*(max-min)+min)
                    newarr = this.getRandomArrayElements(newarr,random-this.UserNeedSentence[this.word[this.indexNumber]].En_sentence.split(' ').length)
                    
                    //真正的答案和混洗选项和凑数的选项（即最终的给用户的选项）
                    let finalOptions = [...options, ...newarr]

                    //去除空的元素
                    finalOptions = finalOptions.filter(function (s) {
                        return s && s.trim(); 
                    })
                    //打乱数组顺序
                    let arr = this.shuffle(finalOptions)

                    //赋值
                    this.options = arr
                } else {
                     // const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5) 
                    // const arr = this.UserNeedSentence[this.word[this.indexNumber]].Ch_sentence.split(' ');
                    // console.log(arr);
                    // console.log(shuffleArray(arr))
                    console.log('英')
                    let confusion_En = []
                    if(this.UserNeedSentence[this.word[this.indexNumber]].confusion_En){
                        confusion_En = this.UserNeedSentence[this.word[this.indexNumber]].confusion_En.split(' ')
                    }
                    let En_sentence = this.UserNeedSentence[this.word[this.indexNumber]].En_sentence.split(' ')
                    // console.log(otheritem);
                    let otherItem = JSON.parse(JSON.stringify(this.UserNeedSentence))

                    otherItem.splice(this.word[this.indexNumber],1)
                    
                    //凑数用的选项
                    let OfQuantity = []
                    for (let index = 0; index < otherItem.length; index++) {
                        // console.log(otherItem[index].Ch_sentence.split(' '));
                        if(otherItem[index].En_sentence){
                            OfQuantity = OfQuantity.concat(otherItem[index].En_sentence.split(' '))
                        }
                    }
                    //数组去重
                    OfQuantity = this.unique(OfQuantity)
                    
                    //真正的答案和混洗选项
                    const options = [...En_sentence,...confusion_En]
                
                    //凑数用的选项 不能和已有的选项重合
                    let newarr = OfQuantity.filter(item=>!options.includes(item))

                    //根据句子长度随机取出元素
                    // console.log(this.UserNeedSentence[this.word[this.indexNumber]].En_sentence.split(' ').length);
                    let max = 11;
                    let min = 8;
                    let random = parseInt(Math.random()*(max-min)+min)
                    newarr = this.getRandomArrayElements(newarr,random-this.UserNeedSentence[this.word[this.indexNumber]].Ch_sentence.split(' ').length)
                    
                    //真正的答案和混洗选项和凑数的选项（即最终的给用户的选项）
                    let finalOptions = [...options, ...newarr]

                    //去除空的元素
                    finalOptions = finalOptions.filter(function (s) {
                        return s && s.trim(); 
                    })

                    //打乱数组顺序
                    let arr = this.shuffle(finalOptions)

                    //赋值
                    this.options = arr
                }
               

            }
        },
        //下一个句子
        nextSentence(){
            let random = Math.round(Math.random());
            if(random == 0){
                this.ChineseOrEnglish = true
            }else{
                this.ChineseOrEnglish = false
            }
            this.indexNumber++
            this.$refs.sentenceRow.innerHTML = ''
            for (let index = 0; index < this.$refs.choiceOptions.children.length; index++) {
                this.$refs.choiceOptions.children[index].classList.remove("choice-itemLeave")
            }
            this.updateOptions()//更新选项
            this.showProficiency()//熟练度
            this.IsRight = false
            this.IsSorry = false
            this.$refs.choiceCheck.style.backgroundColor = '#fff'
            this.$refs.Continuebtn.innerText = '检查'
            this.$refs.Continuebtn.classList.remove('whenPassWrong')

            this.checkbtn = true
            this.selectOptionsAbled = true
        },
        //检查句子按钮
        async checkSentence(){
            
            if(this.checkbtn == true){
                let answer = ''
                for (let index = 0; index < this.$refs.sentenceRow.children.length; index++) {
                    if(index === this.$refs.sentenceRow.children.length - 1 ){
                        answer = answer + this.$refs.sentenceRow.children[index].innerText
                    }else{
                        answer = answer + this.$refs.sentenceRow.children[index].innerText+' '
                    }
                }
                
                if(answer === this.showAnswer()){
                    this.playRightMusic()
                    this.$store.dispatch('sentence/UpdateUserSentenceProficiency',{id:parseInt(this.transferId())})//熟练度+1
                    // console.log(this.transferProficiency());
                    if(this.transferProficiency() == 4){
                        this.$store.dispatch('sentence/UpdatePlanSentenceComplete')//学习计划SentenceComplete+1
                    }
                    this.BingoNumber++
                    this.IsRight = true
                    this.IsSorry = false
                    this.$refs.choiceCheck.style.backgroundColor = '#d7ffb8'
                    this.$refs.Continuebtn.innerText = '继续'
                }else{
                    this.playWrongMusic()
                    this.IsRight = false
                    this.IsSorry = true
                    this.$refs.choiceCheck.style.backgroundColor = '#ffdfe0'
                    this.$refs.Continuebtn.classList.add('whenPassWrong')
                    this.$refs.Continuebtn.innerText = '继续'
                }
                this.checkbtn = false
                this.selectOptionsAbled = false
            }
            else{
                //跳到 下一个句子
                // console.log(this.indexNumber);
                // console.log(parseInt(this.UserNeedSentence.length));
                if(this.indexNumber == parseInt(this.UserNeedSentence.length) - 1){
                    console.log('结束');
                    // console.log(this.BingoNumber);
                    // console.log(this.StylePlan());
                    if(this.BingoNumber == this.StylePlan()){
                        this.$message({
                            type:'success',
                            message: '恭喜你，完成了今日全部回答！',
                            showClose: true
                        })
                    }else{
                        try {
                            await this.$store.dispatch('sentence/GetUserNeedSentence')
                            this.indexNumber = -1
                            this.nextSentence()
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }else{
                    //下一个句子
                    this.nextSentence()
                }
            }
        },
        //跳过按钮
        skip(){
            this.playWrongMusic()
            this.IsRight = false
            this.IsSorry = true
            this.$refs.choiceCheck.style.backgroundColor = '#ffdfe0'
            this.$refs.Continuebtn.classList.add('whenPassWrong')
            this.$refs.Continuebtn.innerText = '继续'
    
            this.checkbtn = false
            this.selectOptionsAbled = false
        },
        //重新开始
        reStart(){
            this.$confirm('是否确认重新开始？','提示',{
					confirmButtonText: '确定',
          			cancelButtonText: '取消',
					type:'warning',
					showClose:false
				}).then(async() => {
                    await this.$store.dispatch('sentence/UpdateUserPlanSentenceComplete',{complete:0})
                    await this.$store.dispatch('sentence/GetUserNeedSentence')
                    this.StylePlan()
                    this.BingoNumber = 0
                    this.indexNumber = 0
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
                await this.$store.dispatch('sentence/UpdateUserPlanSentencePlan',{complete:this.planComplete});
                this.$message({
                    message: '修改计划成功！',
                    type: 'success',
                    customClass:'otherCourser',
                });
                await this.$store.dispatch('sentence/GetUserNeedSentence')
                this.StylePlan()
                this.BingoNumber = 0
                this.indexNumber = 0
            } catch (error) {
                this.$message({
                    message: '修改计划失败！',
                    type: 'error',
                    customClass:'otherCourser',
                });
            }
        }        
        
    },
    async mounted(){
        try {
            await this.$store.dispatch('sentence/GetUserNeedSentence')
        } catch (error) {
            this.$message({
                type:'success',
                message: '恭喜你，完成了今日全部回答',
                showClose: true
            })
            console.log(error);
            this.checBtnDisabled = true//禁用check按钮
            return;
        }

        this.updateOptions()
        this.showProficiency()
        this.StylePlan()
    },
    computed:{
        ...mapState('sentence',['UserNeedSentence']),
        //随机数组
        word(){
            return this.randomArray(this.UserNeedSentence)
        },
        //打乱数组时显示的条件
        conditions(){
            return this.UserNeedSentence[this.word[this.indexNumber]]
        },
    },
    watch:{
        BingoNumber(newvaule){
            this.progressWid = newvaule / this.StylePlan() * 100
            // if(this.$refs.progressbar){
            //     if(this.progressWid === 100){
            //         this.$refs.progressbar.style.backgroundColor = '#43d281'
            //     }else{
            //         this.$refs.progressbar.style.backgroundColor = '#2c3143'
            //     }
            // }
        }
    }

}
</script>

<style>

</style>