<template>
	<section class="f-mainPage">
		<NavBar></NavBar>
		<!--selectFunc 选择完成的回调      searchList 下拉列表的数据-->
		<search @selectFunc="selectFunc" :searchList="searchList" :selectValue="selectValue" ref="refTest3" :syncTest.sync="syncTest"></search>
		<input type="text" ref="refTest1" value="11111" />
		<div ref="refTest2" v-on:click="console">22222</div>
		<div>{{syncTest}}</div>
	</section>
</template>

<script type="text/ecmascript-6">
  import NavBar from '../vuePlugin/navBar'
  import Search from '../vuePlugin/search'
  export default {
    data() {
      return {
        phone: '',
        searchList: ['草船借箭', '大富翁', '测试数据'],
        // 直接通过props传递对象 修改，挺便捷的,但是不规范
        selectValue: {
          data: '1'
        },
        // 通过emit修改，规范写法
        selectValue2: '',
        syncTest: '初始数据'
      }
    },
    mounted() {
      console.log(this.$refs.refTest1)
      console.log(this.$refs.refTest2)
      console.log(this.$refs.refTest3)
      console.log(this.$refs.refTest3.selectValue.data)
    },
    methods: {
      pageGo(path) {
        this.$router.push('/' + path)
      },
      selectFunc(value) {
        this.selectValue2 = value
//      console.log(this.selectValue)
//      console.log(this.selectValue2)
      },
      console() {
        console.log(this.syncTest)
      }
    },
    components: {
      NavBar,
      Search
    }
  }
</script>

<style lang="scss" scoped>
.f-mainPage{
	width: 100%;
	.g-banner{
    width: 100%;
    background-image: url(../../../static/main_bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    color: white;
    text-align: center;
    p:nth-child(1) {
      margin: 10px auto 0px auto;
      font-size: 1.3rem;
    }
    .f-banscri {
      margin: 15px auto 8px auto;
      font-size: 0.95rem;
    }
    .f-moneyMax{
      margin: 5px auto 0px auto;
      font-size: 2.4rem;
    }
    .f-returnCash{
      width: 120px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      background-color: white;
      color: #169BD5;
      display: inline-block;
      border-radius: 5px;
      font-size: 1rem;
      margin-top: 35px;
      position: relative;
      .f-mmmbd{
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: transparent;
          top: 0;
          left: 0;
      }
    }
	}
	.g-cashInfor{
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: space-between;
    div{
        width: 50%;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
    }
    div:nth-child(1){
        border-bottom: 1px solid #878787;
        border-right:  1px solid #878787;
    }
    div:nth-child(2){
        border-bottom: 1px solid #878787;
    }
}
	.g-operate{
	    width: 100%;
	    height: auto;
	    overflow: hidden;
	    ul{
	        list-style: none;
	        padding: 0;
	        margin: 0;
	        font-size: 1.05rem;
	        li{
	            height: 60px;
	            line-height: 60px;
	            padding-left: 25px;
	            position: relative;
	            span{
	                width: 20px;
	                height: 20px;
	                position: absolute;
	                top: 20px;
	                right: 20px;  
	                background-image: url(../../../static/go.png);
	                background-repeat: no-repeat;
	                background-size: 100% 100%;
	            }
	        }
	    }
	    .f-goodNews{
	        width: 340px;
	        height: 144.5px;
	        margin: 20px auto 30px auto;
	        text-align: center;
	        background-image: url(../../../static/banner.png);
	        background-repeat: no-repeat;
	        background-size: 100% 100%;
	    }
	}
}
</style>
