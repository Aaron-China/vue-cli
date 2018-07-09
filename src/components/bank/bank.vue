<template>
	<section class="g-bank">
			<div class="f-title" v-on:click="back"><span class="f-bankBack" v-on:click="back"></span>我的银行卡</div>
			<ul>
				<li>银行卡号<span class="f-bkHao">**** **** **** 8892</span></li>
				<li>
					所属银行
					<span>
						<span class="f-userBank">农业银行</span>
					</span>
				</li>
				<li>预留手机号<span  class="f-userHao">186****6635</span></li>
			</ul>
		</section>
</template>

<script type="text/ecmascript-6">
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
      }
    }
  }
</script>

<style lang="scss" scoped>
.g-bank{
    width: 100%;
    height: 100%;
    ul{
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        font-size: 1.05rem;
        height: 100%;
        li{
            height: 70px;
            line-height: 70px;
            position: relative;
            border-bottom: 1px solid #E4E4E4;
            padding-left: 15px;
            span{
                display: inline-block;
                width: 47%;
                float: right;
                margin-right: 10px;
                .f-userBank{
                    float: left;
                    width: 100%;
                    height: 70px;
                }
            }
            .f-allBank{
                display: inline-block;
                width: 20px;
                height: 20px;
                position: absolute;
                top: 25px;
                right: 25px;
                background-image: url(../../../static/go.png);
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}
</style>