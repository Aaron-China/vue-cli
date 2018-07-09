<template>
  <div class="menuBot">
    <router-link tag="div" class="menu-item" v-for="(item,index) in menuInfor" v-bind:to="item.path" >
      <span class="tab-link">{{item.name}}</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        menuInfor: [
          {name: '推荐', path: '/recommend'},
          {name: '歌手', path: '/singer'},
          {name: '排行', path: '/rank'},
          {name: '登录', path: '/login'},
          {name: '测试', path: '/my'}
        ]
      }
    },
    mounted() {
    },
    methods: {
      menuChange(index) {
        console.log(index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menuBot{
    width: 100%;
		height: 60px;
		position: fixed;
		bottom: 0px;
		left: 0;
		z-index: 100;
		display: flex;
		justify-content: space-around;
		text-align: center;
		line-height: 60px;
		background-color: white;
		color: black;
	}
	.menuBot .menu-item{
		width: 25%;
	}
	.menuBot .menu-item span{
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.menuBot .menuActive{
		background-color: darkgray;
		color: red;
  }
</style>