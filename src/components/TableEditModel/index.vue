<template>
  <a-modal
    :visible="visible"
    :title="title"
    :width="width"
    :destroyOnClose="isDestroyOnClose"
    :maskClosable="isMaskClosable"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="form"
      :model="newFormData"
      :rules="rules"
      @submit="handleOk"
    >
      <a-row :gutter="24">
        <a-col
          v-for="(item, key) in formItems"
          :key="key"
          :span="item.span || 12"
          v-show="!item.hide"
        >
          <a-form-model-item
            :label="item.label"
            :labelCol="{span: item.labelCol || 7}"
            :wrapperCol="{span: item.wrapperCol || 13}"
            :prop="item.key"
          >
            <a-input
              v-if="item.type === 'input'"
              style="width: 100%"
              :disabled="!!item.disabled"
              v-model="newFormData[item.key]"
              placeholder="请输入"
              @change="
                (e) => item.needBack && handleBack(e.target.value, item.key)
              "
            />

            <a-input
                v-if="item.type === 'input-addonBefore'"
                :addon-before="item.addonBefore"
                style="width: 100%"
                :disabled="!!item.disabled"
                v-model="newFormData[item.key]"
                placeholder="请输入"
                @change="
                (e) => item.needBack && handleBack(e.target.value, item.key)
              "
            />

            <a-input-number
              v-if="item.type === 'number'"
              style="width: 100%"
              :min="item.min || 0"
              :precision="item.precision || 0"
              :disabled="!!item.disabled"
              v-model="newFormData[item.key]"
              :placeholder="item.placeholder || '请输入'"
              @change="
                (e) => item.needBack && handleBack(e.target.value, item.key)
              "
            />

            <a-select
              v-if="item.type === 'select'"
              style="width: 100%"
              :disabled="!!item.disabled"
              :mode="item.mode || 'default'"
              :show-search="!item.showSearch"
              :allowClear="!!item.allowClear"
              :placeholder="item.placeholder || '请选择'"
              v-model="newFormData[item.key]"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              :filter-option="
                (input, option) => {
                  return (
                    option.componentOptions.children[0].text
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  )
                }
              "
              @change="(e) => item.needBack && handleBack(e, item.key)"
            >
              <a-select-option
                v-for="(optionItem, optionKey) in item.option"
                :key="optionKey"
                :title="optionItem.title || optionItem.label"
                :value="optionItem.value"
              >
                {{ optionItem.label }}
              </a-select-option>
            </a-select>

            <large-select
              v-if="item.type === 'largeSelect'"
              :show-search="!!item.showSearch"
              :allowClear="!!item.allowClear"
              :list="item.option"
              :disabled="!!item.disabled"
              v-model="newFormData[item.key]"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            />

            <a-radio-group
              v-if="item.type === 'radio'"
              :disabled="!!item.disabled"
              v-model="newFormData[item.key]"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            >
              <a-radio
                v-for="(optionItem, optionKey) in item.option"
                :key="optionKey"
                :value="optionItem.value"
              >
                {{ optionItem.label }}
              </a-radio>
            </a-radio-group>

            <batch-Input
              v-if="item.type === 'batchInput'"
              :disabled="!!item.disabled"
              v-model="newFormData[item.key]"
              placeholder="请输入"
              @change="(e) => batchInputChange(e, item.key, item.needBack)"
            />

            <a-date-picker
              v-if="item.type === 'datepicker'"
              style="width: 100%"
              :getCalendarContainer="(triggerNode) => triggerNode.parentNode"
              :format="item.format || 'YYYY-MM-DD'"
              :show-time="item.showTime"
              v-model="newFormData[item.key]"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            />

            <a-range-picker
              v-if="item.type === 'rangepicker'"
              style="width: 110%"
              :getCalendarContainer="(triggerNode) => triggerNode.parentNode"
              :format="item.format || 'YYYY-MM-DD'"
              :disabled="!!item.disabled"
              :show-time="!!item.showTime"
              v-model="newFormData[item.key]"
              :placeholder="item.placeholder || ['开始日期', '结束日期']"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            >
            </a-range-picker>
            <a-time-picker
              v-if="item.type === 'timepicker'"
              :getCalendarContainer="(triggerNode) => triggerNode.parentNode"
              style="width: 100%"
              v-model="newFormData[item.key]"
              :disabled="!!item.disabled"
              :format="item.format || 'HH:mm'"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            />
            <div
                v-if="item.type === 'timerangepicker'"
                style="width: 100%"
            >
              <a-time-picker v-model="newFormData[item.keys[0]]"
                             style="width: 49%;"
                             placeholder="开始时间"
                             :disabled="!!item.disabled"
                             :format="item.format || 'HH:mm'"
              />
              <a-time-picker v-model="newFormData[item.keys[1]]"
                             style="width: 49%; margin-left: 2%;"
                             placeholder="结束时间"
                             :disabled="!!item.disabled"
                             :format="item.format || 'HH:mm'"
              />
            </div>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <template slot="footer">
      <a-button key="back" :disabled="loading" @click="handleCancel">
        取消
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        确定
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import LargeSelect from '@components/LargeSelect'
import batchInput from '@components/batchInput/index'

export default {
  components: {
    batchInput,
    LargeSelect
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    visible: {
      // 弹窗是否显示
      type: Boolean,
      default: false
    },
    width: {
      // 弹窗宽度
      type: Number,
      default: 800
    },
    title: {
      // 弹窗标题
      type: String,
      default: ''
    },
    type: {
      // 操作类型
      type: String,
      default: ''
    },
    isDestroyOnClose: {
      // 是否销毁窗口
      type: Boolean,
      default: true
    },
    isMaskClosable: {
      // 点击遮罩层是否关闭窗口
      type: Boolean,
      default: false
    },
    id: {},
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      newFormData: {gateMaterial: ''}
    }
  },
  watch: {
    visible (d) {
      if (d) {
        if (this.type === 'add') {
          this.newFormData = {gateMaterial: ''}
        }
      }
    },
    formData (d) {
      this.newFormData = { ...d }
    }
  },
  methods: {
    handleOk () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            type: this.type,
            data: { ...this.newFormData }
          }
          if (this.id) params.id = this.id || this.formData.id
          this.$emit('onClose', params)
        }
      })
    },
    handleCancel () {
      this.$emit('onClose', 'cancle')
    },
    batchInputChange(v, k, b) {
      this.newFormData[k] = v
      if(b) this.handleBack(v, k)
    },
    handleBack (v, k) {
      this.$emit('onBack', v, k, this.newFormData)
    }
  }
}
</script>

<style scoped></style>
