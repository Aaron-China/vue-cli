<template>
  <div :class="['c-large-select', uid]">
    <a-select 
      style="width: 100%"
      :allowClear="allowClear"
      showSearch
      v-bind:value="value"
      :open="open"
      :placeholder="placeholder"
      @search="handleSearch"
      @change="handleChange"
      :getPopupContainer="triggerNode => triggerNode.parentNode"
      :filter-option="() => true"
      @dropdownVisibleChange="handleDrop"
    >
      <a-select-option v-for="op in listData" :key="op.value" :title="op.title || op.label" :price="op.price" :value="op.value">
        {{op.label}}
      </a-select-option>
    </a-select>
    <div v-show="open && resData.length > rows" class="sc" :style="{height: listHeight+'px'}">
      <div class="scbc" :style="{height: totalHeight+'px'}"></div>
    </div>
  </div>
</template>

<script>
const ROWS = 8,          // 局部渲染的数据条数
      HEIGHT = 31.6,      // 每行的高度
      LISTHEIGHT = 250;  // 可视高度

export default {
  props: {
    value: {
      default: null
    },
    allowClear: {
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    // 下拉列表的list
    list: {
      type: Array,
      default: () => []
    },
    rows: {   // 可视区域高度
      type: Number,
      default: ROWS
    },
    rowHeight: { // 每行的高度
      type: Number,
      default: HEIGHT
    },
    listHeight: { // 可是区域高度
      type: Number,
      default: LISTHEIGHT
    },
  },
  data() {
    return {
      uid: '',  // 唯一id，用于监听事件
      scrollEle: '',  // 滚动条dom对象
      idx: 0,            // 当前开始下标
      totalHeight: 250,
      listData: [],   // 下拉列表数据
      resData: [],   // 下拉列表所有数据数据，主要针对搜索的情况需要及时变化滚动条
      open: false,  // 下拉列表是否展开了
      mousedown: false, // 自定义滚动条按下事件标志
    };
  },
  watch: {
    list (d) {
      const { list, rows, rowHeight } = this
      this.listData = list.length > rows ? list.slice(0, rows) : list
      this.resData = list
      this.totalHeight = list.length * rowHeight
      this.initScroll()
    },
  },
  created() {
    const { list, rows, rowHeight } = this
    this.uid = `s_${(new Date()).valueOf()}`
    this.listData = list.length > rows ? list.slice(0, rows) : list
    this.resData = list
    this.totalHeight = list.length * rowHeight
  },
  beforeDestroy() {
    if(this.scrollEle) {
      let sc = document.querySelector(`.${this.uid} .sc`);
      if(sc) {
        sc.removeEventListener('scroll', this.handleScroll);
        sc.removeEventListener('mousedown');
        sc.removeEventListener('mouseup');
      }
      this.scrollEle = ""
    }
    this.open = false
    this.listData = []
    this.resData = []
  },
  methods: {
    handleSearch(d) {
      let newList = this.list.filter(item => item.label.toLowerCase().indexOf(d.toLowerCase()) >= 0)
      this.resData = newList
      this.totalHeight = newList.length * this.rowHeight
      this.listData = newList.slice(0, this.rows)
    },
    handleChange(d, op) {
      const { list, rows, rowHeight } = this
      if(list.length > rows) {
        let tar = list.find(item => item.value === d)
        this.listData = [tar, ...list.filter(item => item.value !== d).slice(0, rows - 1)]
        this.resData = [...this.list]
        this.totalHeight = this.resData.length * rowHeight
      }
      let tar = list.find(item => item.value === d)
      this.$emit('change', d, op, tar)
    },
    handleDrop(d) {
      this.open = this.mousedown ? true : d
    },
    initScroll() {
      if(!this.scrollEle && this.resData.length > this.rows) {
        let node = document.querySelector(`.${this.uid} .sc`);
        if(node) {
          this.scrollEle = node
          document.querySelector(`.${this.uid} .sc`).addEventListener('scroll', this.handleScroll);
          document.querySelector(`.${this.uid} .sc`).addEventListener('mousedown', () => { this.mousedown = true });
          document.querySelector(`.${this.uid} .sc`).addEventListener('mouseup', () => { this.mousedown = false });
        }
      }
      if(this.scrollEle && this.resData.length > this.rows) {
        this.scrollEle.scrollTop = 0
      }
    },
    // 监听虚拟滚轮变化，计算展示的数据
    handleScroll(e) {
      const { scrollTop, scrollHeight } = e.target
      let lenMax = this.resData.length, nIdx;
      if(scrollTop === 0) { // 滑到顶，从头展示
        this.listData = this.resData.slice(0, this.rows)
        this.idx = 0
      } else if(scrollTop - (scrollHeight - this.listHeight) > -this.rowHeight ) { // 滑到底了，但是js监听精度不准，需要做一行的误差容错
        nIdx = lenMax - this.rows
        this.listData = this.resData.slice(nIdx, nIdx + this.rows)
        this.idx = nIdx
      } else {  // 其他情况，照常处理数据
        nIdx = Math.ceil(scrollTop * lenMax / scrollHeight)
        if(nIdx !== this.idx && nIdx <= (lenMax - this.rows)) {
          this.listData = this.resData.slice(nIdx, nIdx + this.rows)
          this.idx = nIdx
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .c-large-select {
    position: relative;
    .sc {
      position: absolute;
      top: 40px;
      right: 0;
      width: 16px;
      overflow-x: hidden;
      overflow-y: scroll;
      z-index: 9999;
      .scbc {
        width: 15px;
        border-radius: 2px;
        background-color: #F1F1F1;
      }
    }
  }
</style>
