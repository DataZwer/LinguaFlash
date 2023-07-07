<template>
  <user-sentence-detail :is-edit='true'></user-sentence-detail>
</template>

<script>
import UserSentenceDetail from './components/UserSentenceDetail.vue'

export default {
    name: 'UserSentenceView',
    components: { UserSentenceDetail }
  }

</script>

<style>

</style>