<template>
  <div class="c-large-table" :style="{paddingRight: this.dataSource.length > this.rows ? '10px' : 0}">
    <a-table
      :loading="loading"
      :columns="tableColumns"
      :row-key="record => record[rowKey]"
      :data-source="tableData"
      :row-selection="selected ? { selectedRowKeys: selectedRowKeys, onChange: handleSelect, onSelectAll: handleSelectAll } : null"
      @change="handleTableChange"
      :pagination="pagination"
      :scroll="scroll"
    >
    </a-table>
    <div v-show="this.dataSource.length > this.rows" class="sc" :style="{height: tableHeight+'px'}">
      <div class="scbc" :style="{height: totalHeight+'px'}"></div>
    </div>
    <span class="totalTip">共 {{total}} 条数据</span>
  </div>
</template>

<script>
const ROWS = 15,          // 局部渲染的数据条数
      HEIGHT = 28.8,      // 每行的高度
      TABLEHEIGHT = 433;  // 表格可视高度

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: Array,
      default: []
    },
    rowKey: {
      type: String,
      default: "id"
    },
    columns: {
      type: Array,
      default: []
    },
    pagination: {
      type: Object,
      default: {
        current: 1,
        pageSize: 20,
        tota: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["20", "50", "100", "200", "500", "1000", "2000"]
      }
    },
    rows: {   // 可视区域展示多少行
      type: Number,
      default: ROWS
    },
    rowHeight: { // 每行的高度
      type: Number,
      default: HEIGHT
    },
    tableHeight: { // 可是区域高度
      type: Number,
      default: TABLEHEIGHT
    },
    selected: { // 是否可选
      type: Boolean,
      default: false
    },
    scroll: { // 横向滚动，禁止纵向滚动
      type: Object,
      default: () => { return {x: true} }
    },
    selectChange: { // 可选的回调
      type: Function,
    }, 
    tableChange: { // 分页、筛选、排序的回调
      type: Function,
    },
    selectedRow: { // 分页、筛选、排序的回调
      type: Array,
      default: () => { return [] }
    },
    total: { 
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      scrollEle: '',
      tableData: [],
      selectedRowKeys: [],
      totalHeight: 433,  // 数据总高度
      idx: 0,            // 当前开始下标
    };
  },
  computed: {
    tableColumns() {
      let col = this.columns.map(item => {
        if(!item.align) item.align = 'center'
        if(item.maxLength) {
          item.customRender = (text, record, index) => {
            if(text && (text.length >= item.maxLength)) {
              let short = text.slice(0, item.maxLength - 1)
              return (<div class="slice-str">{short}...<p class="slice-str-all">{text}</p></div>)
            } else {
              return text
            }
          }
        }
        return item
      })
      return col
    }
  },
  watch: {
    dataSource () {
      const { dataSource, rows, rowHeight } = this
      this.tableData = dataSource.length > rows ? dataSource.slice(0, rows) : dataSource
      this.totalHeight = dataSource.length * rowHeight
      this.initScroll()
    },
    selectedRow(d) {
      this.selectedRowKeys = d
    },
  },
  created() {
    const { dataSource, rows, rowHeight } = this
    this.tableData = dataSource.length > rows ? dataSource.slice(0, rows) : dataSource
    this.totalHeight = dataSource.length * rowHeight
  },
  mounted() {
    this.initScroll()
  },
  beforeDestroy() {
    if(this.scrollEle) {
      document.querySelector('.c-large-table .sc').removeEventListener('scroll', this.handleScroll);
      this.scrollEle = ""
    }
  },
  methods: {
    initScroll() {
      if(!this.scrollEle && this.dataSource.length > this.rows) {
        let node = document.querySelector('.c-large-table .sc');
        if(node) {
          this.scrollEle = node
          document.querySelector('.c-large-table .sc').addEventListener('scroll', this.handleScroll);
        }
      }
      if(this.scrollEle && this.dataSource.length > this.rows) {
        this.scrollEle.scrollTop = 0
      }
    },
    onShowSizeChange(current, pageSize) {
      this.$emit("onShowSizeChange", current, pageSize);
    },
    pageChange(current, pageSize) {
      this.$emit("onChange", current, pageSize);
    },
    handleTableChange(pagination, filters, sorter) {
      if(this.scrollEle) this.scrollEle.scrollTop = 0
      this.$emit("tableChange", pagination, filters, sorter);
    },
    handleSelect(d, dl) {
      this.selectedRowKeys = d
      if(this.selected) this.$emit("selectChange", d, dl);
    },
    // 注意全选，需要手动填充数据
    handleSelectAll(d,dl) {
      let keys = [], dates = []
      if(d) {
        keys = this.dataSource.map(item => item[this.rowKey])
        dates = [...this.dataSource]
      }
      this.handleSelect(keys, dates)
    },
    // 监听虚拟滚轮变化，计算展示的数据
    handleScroll(e) {
      const { scrollTop, scrollHeight } = e.target
      let lenMax = this.dataSource.length, nIdx;

      if(scrollTop === 0) {
        this.tableData = this.dataSource.slice(0, this.rows)
        this.idx = 0
      } else if(scrollTop === (scrollHeight - this.tableHeight)) {
        nIdx = lenMax - this.rows
        this.tableData = this.dataSource.slice(nIdx, nIdx + this.rows)
        this.idx = nIdx
      } else {
        nIdx = Math.ceil(scrollTop * lenMax / scrollHeight)
        if(nIdx !== this.idx && nIdx <= (lenMax - this.rows)) {
          this.tableData = this.dataSource.slice(nIdx, nIdx + this.rows)
          this.idx = nIdx
        }
      }
    },
  },
};
</script>

<style lang="less">
  .c-large-table {
    position: relative;
    .totalTip {
      position: relative;
      top: -27px;
    }
    .ant-table-pagination.ant-pagination {
      margin: 12px 0 0 0 ;
    }
    .slice-str {
      position: relative;
      cursor: default;
      .slice-str-all {
        position: absolute;
        top: 18px;
        left: 40px;
        z-index: 99;
        display: none;
        min-width: 200px;
        border-radius: 5px;
        padding: 2px;
        font-size: 12px;
        background-color: rgba(0,0,0,0.8);
        color: white;
        text-align: left;
      }
      &:hover .slice-str-all{
        display: block;
      }
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
      padding: 3px 10px;
    }
    .sc {
      position: absolute;
      top: 25px;
      right: -6px;
      width: 16px;
      overflow-x: hidden;
      overflow-y: scroll;
      .scbc {
        width: 10px;
        border-radius: 2px;
        background-color: #F1F1F1;
      }
    }
  }
</style>
