<template>
    <div class="words-progress">
        <h2>数据统计</h2>
        <div class="totalWords">
            <div class="totalWords-icon"><i class="bi bi-star-fill"></i></div>
            <div class="totalWords-number">{{userInfo.collect_words}}</div>
            <div class="totalWords-label">重难点单词</div>
        </div>
        <div class="totalWords practice">
            <div class="totalWords-icon"><i class="bi bi-tags-fill"></i></div>
            <div class="totalWords-number">{{userInfo.learned_words}}</div>
            <div class="totalWords-label">已学会的单词</div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name:'Stat',
    computed:{
		...mapState('user',['userInfo'])
	},
}
</script>

<style>

</style>