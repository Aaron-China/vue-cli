<template>
  <div class="c-batchInput">
    <a-input
      :value="value"
      style="width: 100%"
      :placeholder="placeholder"
      @change="inputChange"
    >
      <a-icon slot="addonAfter" type='copy' style="cursor: pointer" @click="showModal" />
    </a-input>

    <a-modal
      :visible="visible"
      :title="title"
      ok-text=" 确认"
      width="70%"
      cancel-text="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-textarea class="batch-input-text" :value="textarea" allow-clear :rows="16" @change="textChange" />
    </a-modal>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    title: {  // 标题
      type: String,
      default: ''
    },
    value: { // 值
      type: String,
    },
    placeholder: { // placeholder
      type: String,
      default: ''
    },
    change: {   //  值修改的回调
      type: Function
    },
  },
  data(){
    return {
      visible: false,   // 显示弹窗
      textarea: '',
    }
  },
  watch:{},
  computed:{},
  methods:{
    // 文本域 回调
    textChange(e) {
      this.textarea = e.target.value
    },
    // 输入框 回调
    inputChange(e) {
      this.textarea = e.target.value
      this.$emit('change', e.target.value)
    },
    // 弹窗取消
    handleCancel() {
      this.visible = false
    },
    // 弹窗确定
    handleOk() {
      this.visible = false
      const reg = new RegExp("[\r\n]","g");
      let newValue = (this.textarea || '').replace(reg, ',')
      if(newValue[newValue.length- 1] === ',') {
        newValue = newValue.slice(0, newValue.length - 1)
      }
      this.$emit('change', newValue)
    },
    //  展示弹窗
    showModal() {
      const reg = new RegExp(",","g");
      let newValue = (this.value || '').replace(reg, '\n')
      this.textarea = newValue
      this.visible = true
    },
  },
}
</script>
<style lang="less" scoped>
.c-batchInput {
  width: 100%;
}
.batch-input-text {
    height: 300px;
    margin: 20px auto 0 auto;
  }
</style>