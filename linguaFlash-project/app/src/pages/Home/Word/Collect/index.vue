<template>
    <div class="wordList-content" v-if="this.WordsListRst" v-loading="loading">
        <!-- <i class="bi bi-trash-fill"></i> -->
        <div class="wordItem" v-for="AllCollectWords in this.WordsListRst" :key="AllCollectWords.id">
            <p class="wordItem-word">
                <span>{{AllCollectWords.words}}</span>
                <i class="bi bi-trash" title="移除" @click="NoCollect(AllCollectWords.id)"></i>
                <el-tooltip :content="AllCollectWords.phonetic" placement="right" effect="light">
                    <i class="bi bi-volume-down-fill"></i>
                </el-tooltip>
            </p>
            <p class="wordItem-tran"><strong>{{AllCollectWords.translation}}</strong><i class="bi bi-chevron-down" @click="downUp($event)"></i></p>
            <!-- <transition-group 
                name="animate__animated animate__bounce"
                enter-active-class="animate__fadeInDownBig"
                leave-active-class="animate__fadeOutUp"> -->
                <p class="wordItem-details" style="display:none" >{{AllCollectWords.notes}}</p>
            <!-- </transition-group> -->
        </div>
    </div>
</template>


<script>
import jquery from "jquery"
// import {wordlist} from '../../../../js/Word/index'
// import 'animate.css';
import {mapState} from 'vuex'
export default {
    name:'Collect',
    data() {
        return {
            WordsList: [], // 单词列表
            WordsListRst: [], // 搜索筛选之后的单词列表
            loading:true
        }
    },
    props:{
        searchWords:{
            type:String
        }
    },
    async mounted() {
        try {
            await this.$store.dispatch('word/GetAllCollectWords');
            this.loading = false
        } catch (error) {
            console.log(error);
            this.loading = false
        }

        this.WordsList = this.AllCollectWords
        this.WordsListRst = this.AllCollectWords
    },
    computed:{
		...mapState('word',['AllCollectWords'])

	},
    methods: {
        NoCollect(id){
            this.$confirm('是否确定移除该单词？','提示',{
                confirmButtonText: '确定',
          			cancelButtonText: '取消',
					type:'warning',
					showClose:false
            }).then(async() => {
                await this.$store.dispatch('word/UpdateUserWordNotcollect',{id});
                this.$message({
                    type:'success',
                    message: '移除成功！',
                    duration:2500,
                    customClass:'el-cancel'
                })
                await this.$store.dispatch('word/GetAllCollectWords');
                this.WordsListRst = this.AllCollectWords
            }).catch(() => {
                this.$message({
                    type:'warning',
                    message: '已取消',
                    duration:2500,
                    customClass:'el-cancel'
                })
            })
        },
        downUp(event){
            // console.log(event.target);
            // event.target
            if(event.target.classList.contains('bi-chevron-down')){
                $(this).removeClass("bi-chevron-down").addClass("bi-chevron-up")
                event.target.classList.remove("bi-chevron-down")
                event.target.classList.add("bi-chevron-up")
                jquery(event.target).parent().siblings(".wordItem-details").slideDown(250)
                // event.target.parentNode.nextElementSibling.style.display = 'block'
                // this.flagNotes = true
            }else if(event.target.classList.contains('bi-chevron-up')){
                event.target.classList.remove("bi-chevron-up")
                event.target.classList.add("bi-chevron-down")
                jquery(event.target).parent().siblings(".wordItem-details").slideUp(250)
                // event.target.parentNode.nextElementSibling.style.display = 'none'
                // this.flagNotes = false
            }
        }
    },
    watch:{
        searchWords(newvalue){
            // console.log(newvalue);
            if(newvalue.trim() !== ''){
                this.WordsListRst = [];
                let regStr =  '';
                for(let i=0; i < newvalue.length; i++){
                    regStr = regStr + '(' + newvalue[i] + ')([\\s]*)'; //跨字匹配
                }
                let reg = new RegExp(regStr);
                // console.log(reg);
                for(let i=0; i<this.WordsList.length; i++){
                    let name = this.WordsList[i].words; //按照名字匹配
                    let translation = this.WordsList[i].translation; //按照翻译匹配

                    // console.log(name);
                    let regMatch = name.match(reg);
                    let regMatch2 = translation.match(reg);

                    // console.log(regMatch);
                    if(null !== regMatch) {// 将匹配的数据放入结果列表中
                        this.WordsListRst.push(this.WordsList[i]);
                    }
                    if(null !== regMatch2) {// 将匹配的数据放入结果列表中
                        this.WordsListRst.push(this.WordsList[i]);
                    }
                }

            }else{
                this.WordsListRst = this.WordsList
            }
        }
    }
    
}
</script>

<style>

</style>