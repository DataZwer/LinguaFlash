<template>
  <user-word-detail :is-edit='true'></user-word-detail>
</template>

<script>
import UserWordDetail from './components/UserWordDetail.vue'

export default {
    name: 'UserWordView',
    components: { UserWordDetail }
  }

</script>

<style>

</style>