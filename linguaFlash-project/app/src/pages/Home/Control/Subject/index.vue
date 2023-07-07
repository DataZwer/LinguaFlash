<template>
    <div class="variations-grid" >
        <ul>
            <li data-li="1" v-for="(subject, index) in allSubjects" :key="subject.id" @click="open(subject)">
                <div class="grid-header"><i class="bi bi-mortarboard"></i></div>
                <div class="grid-info">
                    <p class="grid-name">{{allSubjects[index].name}}</p>
                    <p class="grid-desc">{{allSubjects[index].description}}</p>
                </div>
                <div class="grid-footer">
                    <i class="bi bi-lock-fill"></i>
                    <el-rate
                      v-model="allSubjects[index].level"
                      disabled
                      score-template="{value}"
                      :max=5>
                      </el-rate>
                </div>
                <!-- <i class="bi bi-unlock-fill"></i> -->
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {unScroll} from '../../../../js/ForMod/index'
export default {
    name:'Subject',
    computed:{
		...mapState('home',['allSubjects'])
	},
    methods: {
        open(subject){
            this.$store.state.home.SubModFlag = true;
            unScroll()
            // console.log(subject);
            // console.log(subject.category);
            // console.log(this.$store.state.home.allForeigns);
            let oldforeign = this.$store.state.home.allForeigns;
            let newforeign = oldforeign.filter(function(value, index){
                return value.id === subject.category
            })
            // console.log(newforeign[0]);
            // console.log(newforeign[0].name);
            if(newforeign[0]){
                subject.category = newforeign[0].name
            }
            if(!subject.Activated){
                subject.Activated = false
            }
            // console.log(subject);
			this.$store.commit('home/GETSUBMODINFO',subject)

        }
    },
}
</script>

<style>

</style>