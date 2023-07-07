<template>
    <div class="today">
        
        <div class="today-title"><h2>今日进度</h2>
        <!-- <el-popover
            placement="left-start"
            title="更改学习计划"
            width="260"
            height="120"
            trigger="click"
            v-model="visible"
            popper-class="popover">
            <el-input-number class="inputNumber" v-model="planComplete" :min="5" :max="20" label="描述文字" :step="5" :step-strictly="true" :size="'small'"></el-input-number>
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="visible = false;sureUpdatePlan()">确定</el-button> -->
            <i class="bi bi-pencil-square" @click="showPlanMod()" title="更改学习计划"></i>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <!-- </el-popover> -->
        </div>
        <div class="today-sets" v-if="userPlan[0]">
            <div class="today-icon">{{userPlan[0].complete}}</div>
            <div class="today-info">
                <div class="today-til">每日目标&nbsp;
                    <i class="bi bi-check-circle-fill" v-if="userPlan[0].plan_complete ==userPlan[0].complete"></i>
                    <i class="bi bi-x-circle-fill" v-else></i>
                </div>
                <!-- <i class="bi bi-x-circle-fill"></i> <i class="bi bi-check-circle-fill"></i>-->
                <p class="today-text">完成一组<span>{{userPlan[0].plan_complete}}</span>张词卡</p>
                <p class="today-desc">您今日已完成 <span>{{userPlan[0].complete}}</span> 张词卡。学完{{userPlan[0].plan_complete}}张词卡，完成今日目标！加油！</p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {contrast,unified} from '../../../../js/Plan/index'
import {unScroll} from '../../../../js/ForMod/index'
export default {
    name:'Plan',
    data() {
        return {
            // visible:false,
            
        }
    },
    methods: {
        showPlanMod(){
            this.$store.state.home.PlanModFlag = true;
            unScroll()
        },
          
    },
    async mounted() {
        contrast();
        // unified();
        console.log('this.userPlan',this.userPlan);
        
            if (this.userPlan.length == 0) {
                console.log('userplan');
                await this.$store.dispatch('card/AddPlanForUserRegister');
        }
        
    },
    computed:{
		...mapState('home',['userPlan'])
	},
}
</script>

<style>
.popover{
    height: 90px;
}
.inputNumber{
    margin-right: 10px;
}
</style>