<template>
  <div class="g-login">
		<div class="f-loginCon">
			<div>
				<span class="f-iconP"></span>
				<input type="tel" class="f-phine" placeholder="请输入手机号" value="" v-model="phone" />
			</div>
			<div>
				<span class="f-iconC"></span>
				<input type="tel" class="f-phine" placeholder="请输入验证码" value="" v-model="phoneCode" />
				<div class="f-getCode" v-on:click="getCode">{{codeMsg}}</div>
			</div>
			<div class="f-loginBtn" v-on:click="login">登录 / 注册</div>
		</div>
		<div class="f-alert" v-if="this.$store.state.tip.tipFlag">{{this.$store.state.tip.tipMsg}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getTest } from '../../server/index.js'
  export default {
    data() {
      return {
        phone: '',
        phoneCode: '',
        btnFlag: true,
        btnFlagC: true,
        codeMsg: '获取验证码',
        codeFlag: true
      }
    },
    mounted() {},
    methods: {
// 登录
      login() {
        let thiss = this
        if (this.btnFlag === true) {
          this.btnFlag = false
          if (this.phone === '') {
            this.checkLogin('手机号不能为空')
          } else if (!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.phone)) {
            this.checkLogin('手机号格式不正确')
          } else if (this.phoneCode === '') {
            this.checkLogin('验证码不能为空')
          } else {
            getTest({
              url: 'login.php',
              data: JSON.stringify({
                'phone': thiss.phone,
                'phoneCode': thiss.phoneCode
              })
            })
            .then(response => {
              console.log(response.data)
              if (response.data.code === '0000') {
                window.localStorage.setItem('ybtdldtksz', '8c2i6a3j98xd2g38z32e21g')
                setTimeout(function() {
                  thiss.$router.push('/' + response.data.data.path)
                }, 500)
              }
              thiss.checkLogin(response.data.message)
            })
          }
          setTimeout(function() {
            thiss.btnFlag = true
          }, 1500)
        }
      },
// 获取验证码
      getCode() {
        let thiss = this
        if (this.btnFlagC === true) {
          this.btnFlagC = false
          if (this.phone === '') {
            this.checkLogin('手机号不能为空')
          } else if (!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.phone)) {
            this.checkLogin('手机号格式不正确')
          } else {
            if (thiss.codeFlag === true) {
              thiss.codeFlag = false
              let time = 60
              let t = setInterval(function() {
                time -= 1;
                thiss.codeMsg = time + 's 后再发送'
                if (time === 0) {
                  clearInterval(t);
                  thiss.codeMsg = '获取验证码'
                  thiss.codeFlag = true
                }
              }, 1500)
              getTest({
                url: 'getPhoneCode.php',
                data: JSON.stringify({
                  phone: thiss.phone
                })
              })
              .then(response => {
                console.log(response.data)
                if (response.data.code === '0000') {
                  thiss.phoneCode = response.data.data.code
                }
                thiss.checkLogin(response.data.message)
              })
            }
          }
        }
        setTimeout(function() {
          thiss.btnFlagC = true
        }, 1500)
      },
// 信息验证
      checkLogin(msg) {
        let thiss = this;
        this.$store.commit('SET_TIP_INFOR', {tipFlag: true, tipMsg: msg})
        setTimeout(function() {
          thiss.$store.commit('SET_TIP_INFOR', {tipFlag: false, tipMsg: ''})
        }, 1500)
      }
    }
  }
</script>

<style lang="scss" scoped>
	.g-login {
		width: 100%;
		height: 100%;
		position: relative;
		/*background-image: url(../../../static/loginBan.png);*/
		background-repeat: no-repeat;
		background-size: 100% 100%;
		.f-loginCon {
			position: absolute;
			top: 57%;
			left: 0;
			width: 100%;
			text-align: center;
			div{
				width: 80%;
				height: 60px;
				border-bottom: 1px solid white;
				margin: 0 auto;
				position: relative;
				.f-iconP{
					display: inline-block;
					position: absolute;
					top: 23px;
					left: 3px;
					width: 22px;
					height: 28.4px;
					background-image: url(../../../static/phone.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
				.f-iconC{
					display: inline-block;
					position: absolute;
					top: 26px;
					left: 2px;
					width: 24px;
					height: 24px;
					background-image: url(../../../static/code.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
				input{
					position: relative;
					top: 20px;
					left: 2px;
					width: 80%;
					height: 35px;
					background-color: transparent;
					color: white;
					border: none;
					outline: none;
					font-size: 1.05rem;
					padding-left: 35px;
				}
				.f-getCode{
					width: auto;
					height: auto;
					position: absolute;
					top: 28px;
					right: 6px;
					color: white;
					border: none;
					font-size: 1rem;
				}
			}
			.f-loginBtn{
				width: 80%;
				margin: 40px auto 0px auto;
				height: 45px;
				background-color: #EEAB1A;
				line-height: 45px;
				text-align: center;
				color: white;
				border-radius: 5px;
				border: none;
			}
		}
	}
	
	input::-webkit-input-placeholder{ 
		color: white;
		font-size: 0.9rem;
	} 
	input:-moz-placeholder{ 
		color: white; 
		font-size: 0.9rem;
	} 
	input::-moz-placeholder{ 
		color: white; 
		font-size: 0.9rem;
	} 
	input:-ms-input-placeholder{ 
		color: white; 
		font-size: 0.9rem;
	}
</style>