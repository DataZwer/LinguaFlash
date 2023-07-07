<template>
    <div class="grid-item">
        <div class="course-selection">
            <a href="javascript:">
                <div class="course-icon">
                    <!-- :src="require('../../../../../public/images/'+userForeign.imgurl)" -->
                    <img :src="Userimgurl">
                </div>
                <div class="course-info">
                    <div class="info-title">{{userForeign.name}}</div>
                    <div class="info-subtitle">{{userForeign.introduce}}</div>
                </div>
                <div class="course-arrow" @click="chang()"><i class="bi bi-three-dots"></i></div>
            </a>
        </div>
        <div class="cta"><button @click="startLearn()">开始学习&nbsp;<i class="bi bi-arrow-right-circle"></i></button></div>
    </div>
</template>

<script>
import {unScroll,buttoncheck} from '../../../../js/ForMod/index'
import {mapState} from 'vuex'
export default {
    name:'Foreign',
    data() {
        return {
            // Userimgurl:''
        }
    },
    methods: {
        chang(){
            this.$store.state.home.ForModFlag = true;
            unScroll();
            buttoncheck()
        },
        startLearn(){
            this.$router.push({
                path:'/card',
            })
        }
    },
    computed:{
		...mapState('home',['userForeign']),
        Userimgurl(){
            if(this.userForeign.imgurl){
                return require('../../../../../public/images/'+this.userForeign.imgurl)
            }else{
                return ''
            }
        }
        
	},
    mounted() {
        
        // console.log(this.userForeign.imgurl);
        
    },
    
}
</script>

<style>

</style>