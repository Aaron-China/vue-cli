<template>
	<section class="g-order">
			<div class="f-title" v-on:click="back"><span class="f-orderBack"></span>消费记录</div>
			<div class="f-menu">
				<div class="f-menuItem1 f-menuItem">已出账单</div>
				<div class="f-menuItem2 f-menuItem">未出账单</div>
			</div>
			<div class="f-menuCon">
				<div class="f-orderTitle">
					<span class="f-orderTitleName">账单月份</span>
					<span class="f-orderM"></span>
					<span class="f-orderA">
						<span class="f-orderTM"></span>
						<span class="f-moreOrder"></span>
						<div class="f-allOrder"></div>
					</span>
				</div>
				<div class="f-mouthData">
					<div style="font-size: 1rem; margin-bottom: 15px;">剩余应还</div>
					<div class="f-orderAllCash"><span class="f-weodmd1"></span></div>
					<div class="f-ozszhhkr">最后还款日 本月20日</div>
					<ul class="f-orderDitalList"></ul>
				</div>
			</div>
			<div class="f-btndMb">
				<div class="f-rbcBtn f-nbdbta">立即还款</div>
			</div>
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
.g-order{
    width: 100%;
    min-height: 100%;
    .f-menu{
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 1.05rem;
        div{
            width: 50%;
            height: 50px;
            text-align: center;
            line-height: 50px;
            box-sizing: border-box;
            border-bottom:  1px solid #E4E4E4;
        }
        .f-menuItem1{
            border-right: 1px solid #E4E4E4;
            background-color: honeydew;
            color: darkorange;
        }
    }
    .f-menuCon{
        width: 100%;
        font-size: 1.05rem;
        padding: 7px 0px;
        .f-orderTitle{
            width: 100%;
            height: 35px;
            line-height: 35px;
            text-align: center;
            position: relative;
            .f-orderTitleName{
                position: absolute;
                left: 8px;
                top: 30px;
            }
            .f-orderA{
                display: block;
                width: 120px;
                height: 30px;
                position: absolute;
                top: 30px;
                right: 12px;
                color: gray;
                .f-moreOrder{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    right: -5px;
                    top: 7px;
                    background-image: url(../../../static/go.png);
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
                .f-allOrder{
                    width: 100px;
                    height: 0px;
                    position: absolute;
                    right: 0px;
                    top: 35px;
                    background-color: white;
                    z-index: 50;
                    color: #000000;
                    overflow: hidden;
                    overflow-y: scroll;
                    transition: 0.5s ease;
                    box-shadow: 0px 0px 10px black;
                    div{
                        height: 25px;
                        line-height: 25px;
                    }
                }
            }
        }
        .f-mouthData{
            text-align: center;
            padding-bottom: 50px;
            div:nth-child(1){
                font-size: 2.8rem;
                margin-top: 50px;
            }
            div:nth-child(3){
                font-size: 1rem;
                color: #FF9900;
                margin-top: 10px;
            }
            ul{
                width: 100%;
                list-style: none;
                margin: 20px 0 0 0;
                padding: 0;
                li{
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    position: relative;
                    overflow: hidden;
                    border-bottom: 1px solid #E4E4E4;
                    font-size: 1.1rem;
                    .f-mdl{
                       float: left;
                       margin-left: 15px; 
                    }
                    .f-mdc{
                        float: right;
                        margin-right: 40px;
                    }
                    .f-mdr{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        right: 12px;
                        top: 20px;
                        background-image: url(../../../static/go.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        color: transparent;
                        overflow: hidden;
                    }
                }
            }
        }
    }
    .f-btndMb{
        width: 100%;
        background-color: white;
        position: fixed;
        bottom: 0;
        left: 0;
        padding-bottom: 15px;
        z-index: 23;
        .f-rbcBtn{
            display: block;
            width: 80%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: white;
            border-radius: 5px;
            margin: 0 auto;
            background-color: #169BD5;
        }
    }
}
</style>