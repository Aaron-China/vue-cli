<template>
  <div class="table-search-modal">
    <a-form
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 17 }"
      :form="form"
      @submit="handleSearch"
    >
      <a-row :gutter="24">
        <a-col v-for="(item, idx) in formList" :key="idx" :span="6" :style="{ display: idx < count ? 'block' : 'none' }">
          <a-form-item
            :label="item.label"
            v-if="item.type === 'input'"
          >
            <a-input
              style="width: 100%"
              v-decorator="[
                `${item.key}`,
                {
                  initialValue:item.defaultValue || null,
                  rules: [
                    {
                      required: !!item.required,message: `请输入${item.label}`
                    },
                  ],
                },
              ]"
              @change="(e) => item.needBack && handleBack(e.target.value, item.key)"
              :placeholder="item.placeholder || '请输入'"
            />
          </a-form-item>

          <a-form-item
            :label="`${item.label}`"
            v-if="item.type === 'number'"
          >
            <a-input-number
              v-if="item.type === 'number'"
              style="width: 100%"
              @change="(e) => item.needBack && handleBack(e.target.value, item.key)"
              v-decorator="[
                `${item.key}`,
                {
                  initialValue:item.defaultValue || null,
                  rules: [
                    {
                      required: !!item.required,message: `请输入${item.label}`
                    },
                  ],
                },
              ]"
              :placeholder="item.placeholder || '请输入'"
              :min="item.min || 0"
              :precision="item.precision || 0"
            />
          </a-form-item>

          <a-form-item
            :label="`${item.label}`"
            v-if="item.type === 'select'"
            :labelCol="{span: item.labelCol || 7}"
            :wrapperCol="{span: item.wrapperCol || 17}"
          >
            <a-select
              style="width: 100%"
              v-decorator="[
                `${item.key}`,
                {
                  initialValue:item.defaultValue || undefined,
                  rules: [
                    {
                      required: !!item.required,message: `请输入${item.label}`
                    },
                  ],
                },
              ]"
              show-search
              allowClear
              :mode="item.mode || 'default'"
              @change="(e) => item.needBack && handleBack(e, item.key)"
              :placeholder="item.placeholder || '请选择'"
              :getPopupContainer="triggerNode => triggerNode.parentNode"
              :filter-option="(input, option) => {
                return (
                  option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }"
            >
              <a-select-option
                v-for="(optionItem,optionKey) in item.option"
                :key="optionKey"
                :title="optionItem.title || optionItem.label"
                :value="optionItem.value"
              >{{ optionItem.label }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :label="`${item.label}`"
            v-if="item.type === 'largeSelect'"
          >
            <large-select
              v-decorator="[`${item.key}`,{initialValue:item.defaultValue}]"
              show-search
              allowClear
              :list="item.option"
              @change="(v) => item.needBack && handleBack(v, item.key)"
            />
          </a-form-item>

          <a-form-item
            style="width: 100%"
            :label="`${item.label}`"
            v-if="item.type === 'batchInput'"
            :labelCol="{span: 6}"
          >
            <batch-Input
              v-decorator="[
                `${item.key}`, {
                  initialValue: item.defaultValue || null,
                  rules: [
                    { required: !!item.required, message: `请输入${item.label}` },
                    { pattern: !new RegExp(/^[a-zA-Z0-9,]*$/, 'g'), message: '仅允许输入数字和字母，并以英文逗号分隔' },
                    { validator: checkRepeat },
                    { validator: checklength }
                  ]
                },
              ]"
              :placeholder="item.placeholder || '请选择'"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            />
          </a-form-item>

          <a-form-item
            style="width: 100%"
            :label="`${item.label}`"
            v-if="item.type === 'rangepicker'"
            @change="(e) => item.needBack && handleBack(e, item.key)"
          >
            <a-range-picker
              style="width: 100%"
              :allowClear="item.allowClear || false"
              :getCalendarContainer="triggerNode => triggerNode.parentNode"
              v-decorator="[
                `${item.key}`,
                {
                  initialValue:item.defaultValue || null,
                  rules: [
                    {
                      required: !!item.required,message: `请输入${item.label}`
                    },
                  ],
                },
              ]"
              :format="item.format || 'YYYY-MM-DD'"
              :show-time="!!item.showTime"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            />
          </a-form-item>

          <a-form-item
            style="width: 100%"
            :label="`${item.label}`"
            v-if="item.type === 'datepicker'"
          >
            <a-date-picker
              style="width: 100%"
              :allowClear="item.allowClear || false"
              :getCalendarContainer="triggerNode => triggerNode.parentNode"
              v-decorator="[
                `${item.key}`,
                {
                  initialValue:item.defaultValue || null,
                  rules: [
                    {
                      required: !!item.required,message: `请输入${item.label}`
                    },
                  ],
                },
              ]"
              :format="item.format || 'YYYY-MM-DD'"
              :show-time="item.showTime"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            />
          </a-form-item>

          <a-form-item
              :style="'width: 100%;' + item.style"
              v-if="item.type === 'checkbox'"
          >
            <a-checkbox
                v-decorator="[
                `${item.key}`,
                {
                  rules: [ { required: !!item.required,message: `请输入${item.label}` }, ],
                },
              ]"
                @change="(e) => item.needBack && handleBack(e.target.value, item.key)">{{item.label}}</a-checkbox>
          </a-form-item>

          <a-form-item
            style="width: 100%"
            label=""
            v-if="item.type === 'btn'"
            :labelCol="{span: 0}"
          >
            <div style="min-width: 230px;">
              <a-button class="o-btn" icon="search" html-type="submit">查询</a-button>
              <a-button class="w-btn" style="margin-left: 10px" icon="reload" @click="handleReset">重置</a-button>
              <a style="margin-left: 8px; fontSize: 12px" @click="toggle" v-if="formList.length > 4">
                {{ expand ? '合并' : '展开' }}
                <a-icon :type="expand ? 'up' : 'down'" />
              </a>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <div class="left">
      <slot name="tool-left"></slot>
    </div>
  </div>
</template>

<script>
import LargeSelect from '@components/LargeSelect'
import batchInput from '@components/batchInput/index'

export default {
  components: {
    LargeSelect,
    batchInput
  },
  props: {
    // needBack: true 需要回调 触发 onBack 函数;  某一选项变化的回调
    formList: {
      type: Array,
      default: () => []
    },
    onSearch: {
      type: Function
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'search_modal' }),
      expand: false
    }
  },
  computed: {
    count () {
      return this.expand ? this.formList.length : 4
    }
  },
  watch: {
    expanded: {
      handler: function (d){
        this.expand = d
      },
      immediate: true
    }
  },
  methods: {
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((error, values) => {
        if (!error) {
          this.$emit('onSearch', values)
        }
      })
    },
    handleReset () {
      this.form.resetFields()
      const obj = {}
      this.formList.forEach(item => {
        if (item.defaultValue || item.defaultValue === 0) obj[item.key] = ''
      })
      this.form.setFieldsValue(obj)
      this.form.validateFieldsAndScroll((error, values) => {
        if (!error) {
          this.$emit('onSearch', {})
        }
      })
    },
    toggle () {
      this.expand = !this.expand
    },
    handleBack (v, k) {
      this.$emit('onBack', v, k)
    },
    checklength (rule, value, callback) {
      if (value) {
        const arr = value.split(',')
        if (arr.length > 500) {
          callback('最大支持500条数据')
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    checkRepeat (rule, value, callback) {
      if (value) {
        const arr = value.split(',')
        if ((new Set(arr)).size != arr.length) {
          callback('存在重复信息')
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
  }
}
</script>
<style lang="less">
  .table-search-modal {
    width: 100%;
    margin-bottom: 15px;
    .left {
      position: relative;
      text-align: left;
      width: auto;
    }
    .right {
      text-align: right;
    }
  }
</style>
