<template>
	<section class="g-rebackCash">
			<div class="f-title" v-on:click="back"><span class="f-cashBack"></span>立即还款</div>
			<div class="f-recash2">还款金额<span class="f-themmn1">100.00<small> + 0.00 (利息)</small></span><span class="f-menuGo2"></span></div>
			<div class="f-recash">还款总金额<span class="f-themmn2">100.00</span></div>
			<div class="f-recash3">验证码<div class="f-yzm"><span class="f-yzmBtn">获取验证码</span><input type="text" class="f-code" /></div></div>
			<div class="f-reCashBtn"><div class="f-ffff" v-on:click="rebackCash">确认还款</div></div>
			<div class="j-pop"></div>
			<alert v-if="this.$store.state.alertFlag.state"></alert>
		</section>
</template>

<script type="text/ecmascript-6">
  import Alert from '../commonVue/alert'
  export default {
    data() {
      return {
        phone: ''
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
    },
// 子组件
    components: {
      Alert
    }
  }
</script>

<style lang="scss" scoped>
	.g-rebackCash{
    .f-recash,.f-recash2,.f-recash3{
      height: 60px;
      line-height: 60px;
      padding-left: 20px;
      position: relative;
      border-bottom: 1px solid #E4E4E4;
      font-size: 1.05rem;
      span{
          position: absolute;
          right: 60px;
          top: 1px;
      }
      .f-menuGo2{
          width: 20px;
          height: 20px;
          position: absolute;
          top: 21px;
          right: 20px;  
          background-image: url(../../../static/go.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
      }
      .f-yzm{
          position: absolute;
          width: 200px;
          height: auto;
          top: -2px;
          right: 25px;
          font-size: 1.05rem;
          .f-yzmBtn{
              position: absolute;
              width: auto;
              height: 25px;
              line-height: 25px;
              background-color: gainsboro;
              border-radius: 25px;
              top: 21px;
              right: -9px;
              font-size: 0.95rem;
              padding: 0px 7px;
          }
          .f-code{
              width: 100%;
              height: 30px;
              line-height: 32px;
              outline: none;
              border: 1px solid #E4E4E4;
              border-radius: 5px;
              top: 5px;
              padding-left: 10px;
          }
      }
  }
  .f-reCashBtn{
      width: 80%;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: white;
      background-color: #169BD5;
      margin: 25px auto auto auto;
      border-radius: 5px;
      position: relative;
      .f-aaaa{
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 555;
          background-color: gainsboro;
          display: none;
          border-radius: 5px;
      }
      .f-ffff{
          display: block;
          width: 100%;
          height: 100%;
      }
  }
  .j-pop {
      width: 80%;
      height: 45px;
      line-height: 45px;
      position: fixed;
      top: 21%;
      left: 50%;
      margin-left: -40%;
      background-color: rgba( 0, 0, 0, 0.5);
      border-radius: 45px;
      z-index: 900;
      text-align: center;
      color: #ffffff;
      font-size: 1.1rem;
      display: none;
  }
  .f-theYHhd{
      width: 100%;
      height: 30px;
      background-color: #FFFFCC;
      font-size: 1rem;
      text-align: center;
      div{
          display: inline-block;
          width: 25px;
          height: 25px;
          background-image: url(../../../static/voice2.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: relative;
          top: 1px;
      }
      span{
          position: relative;
          top: -6px;
          left: 2px;
      }
    }
}
</style>