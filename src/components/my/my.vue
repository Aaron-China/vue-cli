<template>
  <div class="my">
  	<div v-on:click="func1">哈哈</div>
  	<br />
  	<alert v-if="this.$store.state.alertFlag.state"></alert>
  	<search></search>
  </div>
</template>

<script type="text/ecmascript-6">
  import Alert from '../commonVue/alert'
  import Search from '../commonVue/search'
  export default {
    data() {
      return {
        menuInfor: []
      }
    },
    methods: {
      func1() {
        this.$store.commit('SET_ALERT_FLAG', {state: true, type: ''})
      }
    },
    components: {
      Alert,
      Search
    }
  }
</script>

<style lang="scss" scoped>

</style>