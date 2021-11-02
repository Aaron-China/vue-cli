<template>
  <div class="wrapper">
    <div class="list-box">
      <table-search-model :formList="formList" @onSearch="writeTable">
        <div slot="tool-left">
          <a-button class="n-btn" @click="add" >新增</a-button>
          <a-button class="d-btn" style="margin-left: 15px;" @click="deleteM" >批量删除</a-button>
          <a-button class="n-btn" style="margin-left: 15px;" @click="exportE">导出</a-button>
        </div>
      </table-search-model>
      <c-table
        :loading="loading"
        :selected="true"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination"
        :total="pagination.total"
        :selectedRow="selectedRowId"
        @tableChange="tableChange"
        @selectChange="onSelectChange"
      >
      </c-table>
      <!-- 编辑弹窗 -->
      <table-edit-model
        :loading="modal.loading"
        :visible="modal.visible"
        :type="modal.type"
        :title="modal.title"
        :formData="modalForm"
        :formItems="modalFormList"
        :rules="rules"
        @onClose="modalClose"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CTable from "@/components/c-table";
import TableSearchModel from "@/components/TableSearchModel";
import TableEditModel from "@/components/TableEditModel";
import { getList } from "@api/report";
import { expoerExcel } from '@/utils/exportExcel'

export default {
  components: {
    TableSearchModel,
    TableEditModel,
    CTable
  },
  props: {},
  data() {
    return {
      loading: false,       // 表格loading
      selectedRowId: [],    //  表格选中的
      selectedRowKeys: [],  
      dataSource: [],       // 表格数据
      columns: [            // 表格列
        {
          title: '工厂名称', 
          dataIndex: "factoryName",
          key: "factoryName",
          width: 80,
        },
        {
          title: '物料编码', 
          dataIndex: "materialCode",
          key: "materialCode",
          width: 90
        },
        {
          title: '物料名称', 
          dataIndex: "materialName",
          key: "materialName",
          width: 130,
          ellipsis: true
        },
        {
          title: 'BOM层级', 
          dataIndex: "bomLevel",
          key: "bomLevel",
          width: 80
        },
        {
          title: '版本号', 
          dataIndex: "version",
          key: "version",
          width: 80
        },
        {
          title: '数量', 
          dataIndex: "qty",
          key: "qty",
          width: 100
        },
        {
          title: '操作',
          key: '',
          dataIndex: '',
          width: 70,
          align: 'center',
          customRender: (text, record) => {
            return (<a onClick={() => this.edit(record) }>编辑</a>)
          }
        },
      ],
      pagination: {         // 表格分页
        current: 1,
        pageSize: 20,
        total: 0,
      },
      search: {},           // 表格查询条件
      formList: [           // 表格查询项
        { label: '工厂编码', key: 'factoryNo', type: 'select', option: [] },
        { label: '物料编码', key: 'materialCode', type: 'input' },
        { type: "btn" }
      ],
      modal: {              // 弹窗控制
        loading: false,
        visible: false,
        title: '',
        type: 'add',
      },
      modalForm: {},        // 弹窗数据
      modalFormList: [
        { label: '工厂代码', key: 'factoryNo', type: "select", option: [] },
        { label: '物料编码', key: 'materialCode', type: "input" },
        { label: '物料名称', key: 'materialName', type: "input" },
        { label: '版本号', key: 'version', type: "input" },
        { label: '数量', key: 'qty', type: "number" },
      ],
      rules: {
        factoryNo: [{ required: true, trigger: 'change', message: '该项为必填项' }],
        materialCode: [{ required: true, trigger: 'change', message: '该项为必填项' }],
        materialName: [{ required: true, trigger: 'change', message: '该项为必填项' }],
        version: [{ required: false, trigger: 'change', message: '该项为必填项' }],
        qty: [{ required: true, trigger: 'change', message: '该项为必填项' }],
      },
    };
  },
  computed: {
    ...mapState({
      factoryList: state => state.app.factoryList,
    })
  },
  created() {
    this.formList[0].option = this.factoryList
    this.modalFormList[0].option = this.factoryList
    this.getData();
  },
  methods: {
    // 查询表格数据
    getData() {
      this.loading = true
      const params = {
        ...this.search,
        current: this.pagination.current,
        size: this.pagination.pageSize
      }
      getList(params).then(res => {
        if (res) {
          this.dataSource = res.records;
          this.pagination.current = res.current
          this.pagination.pageSize = res.size
          this.pagination.total = res.total
        }
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
      });
    },
    // 选择表格数据
    onSelectChange(keys, rows) {
      this.selectedRowId = [...keys];
      this.selectedRowKeys = rows;
    },
    // 分页、筛选、排序变化
    tableChange(pagination, filters, sorter) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.getData()
    },
    // 搜索
    writeTable(data) {
      this.search = { 
        ...data,
      }
      this.pagination.current = 1
      this.getData();
    },
    // 新增
    add() {
      this.modal = {
        loading: false,
        visible: true,
        title: '新增',
        type: 'add',
      }
    },
    // 编辑
    edit(d) {
      this.modal = {
        loading: false,
        visible: true,
        title: '编辑',
        type: 'edit',
      }
      this.modalForm = {...d}
    },
    // 新增/编辑弹窗保存
    modalClose(d) {
      if(d !== 'cancle') {
        let obj = d.data, list = [];
        if(d.type === 'edit') {
          list = this.dataSource.map(item => {
            return item.id === obj.id ? obj : item
          })
        } else {
          list = [...this.dataSource, {...obj, id: this.dataSource.length + 1}]
        }
        this.dataSource = [...list]
      }
      this.modal = {
        loading: false,
        visible: false,
        title: '',
        type: 'add',
      }
      this.modalForm = {}
    },
    // 批量删除
    deleteM() {
      let list = this.dataSource.filter(item => {
        return !this.selectedRowId.some(s => s === item.id)
      })
      this.dataSource = [...list]
    },
    // 导出
    exportE() {
      let newC = []
      this.columns.forEach(item => {
        if(item.dataIndex !== "operation") {
          newC.push(item)
        }
      })
      expoerExcel(newC, this.dataSource, `${this.$route.meta.title}`)
    },
  }
};
</script>
<style lang="scss" >
</style>
