<template>
  <div id="app1">
  	<div></div>
  	<transition name="fade">
	    <keep-alive>
	      <router-view></router-view>
	    </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  // 先引入组件 起名为MenuBot，然后将组件注入到生成vue的组件代码，再在模板中使用这个标签
  export default {
    beforeUpdate() {
      if (window.localStorage.getItem('ybtdldtksz') === null || window.localStorage.getItem('ybtdldtksz') === undefined || window.localStorage.getItem('ybtdldtksz') === '') {
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss" scoped>
	#app1 {
		width: 100%;
		min-height: 100%;
		height: 100%;
		.fade-enter-active, .fade-leave-active {
		  transition: opacity 0.2s;
		}
		.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		  opacity: 0;
		}
	}
</style>