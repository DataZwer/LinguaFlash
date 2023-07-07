<template>
  <div>
      <HomeNav/>
      <HomeTop/>
      <ForMod v-show="$store.state.home.ForModFlag"/>
      <SubMod v-show="$store.state.home.SubModFlag"/>
      <PlanMod v-show="$store.state.home.PlanModFlag"/>
        <router-view></router-view>
  </div>
</template>

<script>
import HomeNav from '../../components/HomeNav/index.vue'
import HomeTop from '../../components/HomeTop/index.vue'
import ForMod from '../../components/ForMod/index.vue'
import SubMod from '../../components/SubMod/index.vue'
import PlanMod from '../../components/PlanMod/index.vue'
import {mapActions} from 'vuex'
export default {
  name: 'Home',
  components: {
    HomeNav,
    HomeTop,
    ForMod,
    SubMod,
    PlanMod
  },
  mounted() {
  
  },
}
</script>
  
<style scoped>

</style>