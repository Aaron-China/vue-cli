<template>
	<div class="alertZJ">
	  <div class="f-alert">
	    <div class="f-aTop">{{this.$store.state.alertData.title}}</div>
	    <div class="f-aCon">{{this.$store.state.alertData.content}}</div>
	    <div class="f-aBot">
	    	<span class="f-abOk" v-on:click="alertOpetate('ok')">{{this.$store.state.alertData.operateOk}}</span>
	    	<span class="f-abCan" v-on:click="alertOpetate('can')">{{this.$store.state.alertData.operateCan}}</span>
	    </div>
	  </div>
	</div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        alertInfor: {}
      }
    },
    mounted() {
      this.alertType()
    },
    methods: {
      // 判断如果有数据，就定时小时，否则，就点击消失
      alertType() {
        let alertDatas = this.$store.state.alertData
        if (alertDatas.time !== '') {
          setTimeout(function() {
            console.log('关闭')
          }, alertDatas.time)
        }
      },
      alertOpetate(type) {
        if (type === 'ok') {
          this.$store.commit('SET_ALERT_FLAG', {state: false, type: 'ok'})
        } else {
          this.$store.commit('SET_ALERT_FLAG', {state: false, type: 'can'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
	.alertZJ{
		width: 100%;
		position: absolute;
		background-color: rgba(0,0,0,0.6);
		top: 0;
		bottom: 0;
		z-index: 9999;
	}
  .f-alert{
  	width: 80%;
  	height: auto;
  	position: absolute;
  	top: 20%;
  	left: 50%;
  	margin-left: -40%;
  	background-color: white;
  	border: 1px solid gray;
  	border-radius: 5px;
  	color: black;
  }
  .f-alert .f-aTop{
  	height: 50px;
  	line-height: 50px;
  	text-align: center;
  	font-size: 1.1rem;
  	border-bottom: 1px solid darkgray;
  	letter-spacing: 1px;
  }
  .f-alert .f-aCon{
  	padding: 25px 10px;
  	font-size: 0.9rem;
  }
  .f-alert .f-aBot{
  	text-align: right;
  	font-size: 0.9rem;
  	padding: 20px 0px 6px 0px;
  }
  .f-alert .f-aBot .f-abOk{
  	display: inline-block;
  	box-sizing: border-box;
  	padding: 0px 15px;
  	margin-right: 10px;
  	border-radius: 5px;
  	background-color: #3FA9FF;
  	color: white;
  	height: 30px;
  	line-height: 30px;
  }
  .f-alert .f-aBot .f-abCan{
  	display: inline-block;
  	padding: 0px 15px;
  	margin-right: 10px;
  	border: 1px solid #D9D9D9;
  	border-radius: 5px;
  	height: 30px;
  	line-height: 30px;
  }
</style>