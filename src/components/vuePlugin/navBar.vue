<template>
	<section class="g-navBar">
		<div class="f-back"></div>
		<span class="f-title">{{title}}</span>
		<transition name="search">
			<div class="f-searchIn" v-if="goSearch">
				<input type="text" name="search" v-model="searchvalue" />
			</div>
		</transition>
		<div class="f-control">
			<div class="f-search" v-on:click="goSearch = !goSearch"></div>
			<div class="f-more">...</div>
		</div>
	</section>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        title: '标题',
        goSearch: false,
        searchvalue: ''
      }
    },
    mounted() {},
    methods: {
      back() {
        this.$router.push('/main')
      },
      rebackCash() {
// 同步的  commit
// this.$store.commit('SET_ALERT_DETAIL', {title: '提示', content: '您确定要还款吗？'})
// this.$store.commit('SET_ALERT_FLAG', {state: true, type: ''})

// 异步的 dispatch
        this.$store.dispatch('actionTest').then(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
	.g-navBar{
		width: 100%;
		height: 60px;
		line-height: 60px;
		text-align: center;
		position: relative;
		overflow: hidden;
		font-size: 18px;
		.f-back{
			position: absolute;
			top: 13px;
			left: 10px;
			width: 30px;
			height: 35px;
			background-image: url(img/back.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
		.f-searchIn{
			position: absolute;
			top: 13px;
			left: 20%;
			width: 50%;
			height: 35px;
			border-radius: 35px;
			overflow: hidden;
			box-sizing: border-box;
			border: 1px solid #909090;
			input{
				position: absolute;
				width: 90%;
				height: 100%;
				border: none;
				outline: none;
				padding-left: 10%;
				top: 0;
				left: 0;
			}
		}
		.f-control{
			position: absolute;
			right: 10px;
			top: 2px;
			.f-search{
				position: relative;
				top: 5px;
				right: 5px;
				display: inline-block;
				width: 27px;
				height: 27px;
				background-image: url(img/search.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
			} 
			.f-more{
				position: relative;
				top: -7px;
				left: 2px;
				display: inline-block;
				font-weight: bold;
				color: #696969;
				letter-spacing: 2px;
				padding: 0px 10px;
				font-size: 22px;
			}
		}
		.search-enter-active {
  		animation: bounce-in 0.8s;
  		border: 1px solid red;
		}
		.search-leave-active {
		  display: none;
		}
		@keyframes search-in {
		  0% {
		    width: 0px;
		  }
		  50% {
		    width: 40%;
		  }
		  75% {
		    width: 50%;
		  }
		  100% {
		    width: 60%;
		  }
		}
	}
</style>