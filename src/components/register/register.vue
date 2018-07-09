<template>
	<section class="g-register">
		<div class="f-title" v-on:click="back"><span class="f-registerBack"></span>信息认证</div>
		<ul>
			<li>
				<span class="f-infor">姓　名　: </span>
				<input type="text" class="m-conInput" value="" placeholder="请输入姓名" v-model="name" />
			</li>
			<li>
				<span class="f-infor">身份证　: </span>
				<input type="text" class="m-conInput" value="" placeholder="请输入身份证号" v-model="idCard" />
			</li>
			<li class="f-liSpecial"></li>

			<li>
				<span class="f-infor">　银行卡号　:</span>
				<input type="text" class="m-conInput" value="" placeholder="请输入银行卡号" v-model="bankCard" />
			</li>
			<li>
				<span class="f-infor">　　　银行　:</span>

				<span class="f-bankSpan" v-on:click="bankShow">
						<span class="f-userBank" v-bind:style="{color : bankColor}">{{bankName}}</span>
						<span class="f-allBank"></span>
				</span>
				<div class="f-bankList" v-show="bankListFlag">
					<div v-for="item in bankList" v-on:click="selectBank(item)" v-on:m>{{item}}</div>
				</div>
			</li>
			<li>
				<span class="f-infor">预留手机号　:</span>
				<input type="tel" class="m-conInput" value="" placeholder="请输入预留手机号" v-model="bankPhone" />
			</li>
			<li class="f-liSpecial"></li>
		</ul>
		<p class="f-registerXy">
			<input type="checkbox" class="f-agreeFile" value="" v-on:change="readFile" /> 我已阅读并同意
			<span>《 娱白条信用付款服务协议》</span>、
			<span>《娱白条自动付款服务协议》</span>
		</p>
		<div class="f-registerBtn" v-on:click="register">立即开通</div>

		<div class="f-fucengtz">
			<div><span class="f-sucess"></span>开通成功！</div>
			<div>您的额度为： 　<span style="font-size: 1.3rem;">100 </span>元</div>
			<div><span class="f-fcTime">3</span>　秒后跳转到支付页面</div>
		</div>

		<div class="f-mengban"></div>
		<div class="f-alert" v-if="this.$store.state.tip.tipFlag">{{this.$store.state.tip.tipMsg}}</div>
	</section>
</template>

<script type="text/ecmascript-6">
  import { getTest } from '../../server/index.js'
  export default {
    data() {
      return {
        name: '',
        idCard: '',
        bankCard: '',
        bankName: '请选择银行',
        bankPhone: '',
        fileValue: false,
        bankColor: 'gray',
        bankListFlag: false,
        bankList: ['中国银行', '农业银行', '招商银行', '工商银行', '平安银行', '交通银行', '邮政储蓄', '杭州银行', '华夏银行', '南京银行', '北京银行', '浙江银行']
      }
    },
    mounted() {},
    methods: {
      back() {
        this.$router.push('/login')
      },
      bankShow() {
        if (this.bankListFlag === false) {
          this.bankListFlag = true
        } else {
          this.bankListFlag = false
        }
      },
      selectBank(bank) {
        console.log(bank)
        this.bankName = bank
        this.bankColor = 'black'
        this.bankListFlag = false
      },
      register() {
        let thiss = this
        if (this.name === '') {
          this.checkRegister('姓名不能为空')
        } else if (this.idCard === '') {
          this.checkRegister('身份证号不能为空')
        } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(thiss.idCard)) {
          this.checkRegister('身份证号格式不正确')
        } else if (this.bankCard === '') {
          this.checkRegister('银行卡号不能为空')
        } else if (thiss.bankCard.length < 16 || thiss.bankCard.length > 19) {
          this.checkRegister('银行卡号格式不正确')
        } else if (this.bankName === '请选择银行') {
          this.checkRegister('银行名称不能为空')
        } else if (this.bankPhone === '') {
          this.checkRegister('预留手机号不能为空')
        } else if (!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(thiss.bankPhone)) {
          this.checkRegister('预留手机号格式不正确')
        } else if (this.fileValue === false) {
          this.checkRegister('请阅读并同意娱白条协议')
        } else {
          getTest({
            url: 'register.php',
            data: JSON.stringify({
              'name': thiss.name,
              'idCard': thiss.idCard,
              'bankCard': thiss.bankCard,
              'bankName': thiss.bankName,
              'bankPhone': thiss.bankPhone
            })
          })
          .then(response => {
            console.log(response.data)
            if (response.data.code === '0000') {
              setTimeout(function() {
                thiss.$router.push('/main');
              }, 600)
            }
            thiss.checkRegister(response.data.message)
          })
        }
      },
      readFile() {
        if (this.fileValue === false) {
          this.fileValue = true
        } else {
          this.fileValue = false
        }
      },
// 信息验证
      checkRegister(msg) {
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
	.g-register {
		width: 100%;
		height: 100%;
		min-width: 350px;
		.f-title {
			width: 100%;
			height: 45px;
			text-align: center;
			line-height: 45px;
			border-bottom: 1px solid gainsboro;
			position: relative;
			span {
				display: inline-block;
				width: 25px;
				height: 25px;
				float: left;
				position: absolute;
				top: 11px;
				left: 10px;
				background-image: url(../../../static/back.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
		}
		a {
			text-decoration: none;
		}
		.f-registerCon {
			text-align: center;
			margin-top: 100px;
			input {
				width: 80%;
				height: 30px;
				padding-left: 15px;
				border-radius: 30px;
				outline: none;
				box-shadow: none;
				border: 1px solid gainsboro;
				font-size: 0.9rem;
			}
			p {
				text-align: center;
				font-size: 0.7rem;
				a {
					color: #169BD5;
				}
			}
		}
		.f-registerBtn {
			width: 80%;
			height: 36px;
			text-align: center;
			line-height: 38px;
			border-radius: 5px;
			background-color: #169BD5;
			margin: 0 auto;
			font-size: 1.1rem;
			color: white;
		}
		.g-register {
			width: 100%;
			height: auto;
			position: relative;
		}
		ul {
			list-style: none;
			width: 100%;
			margin: 0;
			padding: 0;
			li {
				width: 100%;
				height: 50px;
				line-height: 50px;
				position: relative;
				font-size: 1rem;
				border-top: 1px solid #F2F2F2;
				.f-infor {
					float: left;
					margin-left: 25px;
					display: block;
				}
				.m-conInput {
					float: left;
					display: block;
					height: 50px;
					border: none;
					outline: none;
					width: 200px;
					font-size: 1rem;
					margin-left: 40px;
					position: relative;
					top: 0px;
				}
				.m-text7 {
					top: 0px;
				}
				.f-bankSpan {
					display: block;
					width: 61%;
					float: left;
					margin-left: 9%;
					height: 50px;
					line-height: 50px;
					.f-userBank {
						float: left;
						width: 100%;
						height: 50px;
						font-size: 0.9rem;
						color: gray;
					}
				}
				.f-allBank {
					display: inline-block;
					width: 20px;
					height: 20px;
					position: absolute;
					top: 14px;
					right: 25px;
					background-image: url(../../../static/go.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
				.m-conInput {
					float: left;
					width: 61%;
					box-sizing: border-box;
					margin-left: 9%;
				}
				.f-bankList {
					position: absolute;
					top: 50px;
					left: 39%;
					z-index: 200;
					width: 58%;
					height: auto;
					max-height: 250px;
					background-color: white;
					color: #000000;
					overflow-x: hidden;
					overflow-y: scroll;
					transition: 0.5s ease;
					font-size: 0.95rem;
					border-radius: 3px;
					box-shadow: 0px 0px 15px gray;
					div {
						line-height: 32px;
						text-align: left;
						padding-left: 20px;
					}
				}
			}
			.f-liSpecial {
				width: 100%;
				height: 15px;
				background-color: #F2F2F2;
				border: none;
			}
		}
		.f-registerBtn {
			width: 80%;
			height: 36px;
			text-align: center;
			line-height: 38px;
			border-radius: 5px;
			background-color: #169BD5;
			margin: 10px auto 20px auto;
			font-size: 1rem;
			color: white;
		}
		.f-registerFlie {
			text-align: center;
			font-size: 0.85rem;
			margin-top: -10px;
			color: #949494;
			margin-top: 35px;
		}
		a {
			color: #479EFF;
		}
		.f-registerXy {
			width: 80%;
			margin: 35px auto 10px auto;
			font-size: 0.85rem;
			text-align: center;
			color: #949494;
			span {
				color: #409EFF;
			}
		}
		.f-bankRefirm {
			width: 100%;
			height: auto;
			padding: 10px 0px;
			display: flex;
			justify-content: space-between;
			div:nth-child(1) {
				line-height: 17px;
				position: relative;
				top: 8px;
				padding: 0px 10px;
				font-size: 0.8rem;
				color: #949494;
			}
		}
		.f-bankMessage {
			width: 110px;
			height: 35px;
			text-align: center;
			line-height: 35px;
			color: white;
			background-color: #FF9900;
			border-radius: 5px;
			position: relative;
			top: 5px;
			margin-right: 5px;
			font-size: 0.85rem;
		}
		.f-infor {
			float: left;
			display: block;
			width: 30% !important;
			text-align: right !important;
			margin-left: 0 !important;
		}
		.f-fucengtz {
			width: 80%;
			height: 230px;
			position: fixed;
			top: 20%;
			left: 10%;
			z-index: 400;
			text-align: center;
			font-size: 1rem;
			background-color: white;
			border-radius: 5px;
			box-shadow: 0px 0px 10px white;
			display: none;
			div:nth-child(1) {
				height: 40px;
				line-height: 40px;
				margin-top: 0px;
			}
			div:nth-child(2) {
				margin-top: 45px;
			}
			div:nth-child(3) {
				margin-top: 40px;
			}
		}
		.f-fcTime {
			font-size: 2rem;
			color: gray;
			font-weight: bold;
		}
		.f-mengban {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.7);
			z-index: 300;
			display: none;
		}
		.m-text5 {
			top: 1px !important;
		}
		.f-fcdBtn {
			width: 120px;
			height: 35px;
			line-height: 35px;
			text-align: center;
			background-color: #169BD5;
			border-radius: 5px;
			margin: 40px auto 0px auto;
			color: white;
			cursor: pointer;
			letter-spacing: 2px;
		}
		.f-fcnr {
			position: relative;
			overflow: hidden;
			height: 50px;
		}
		.f-thetexts {
			width: auto;
			height: auto;
			padding: 3px 8px;
			background-color: #169BD5;
			color: white;
			border-radius: 5px;
			position: absolute;
			top: 4px;
			right: 8%;
			font-size: 1rem;
		}
	}
</style>