/* eslint-disable */
/**
 * 按需加载需要的antd组件
 */
import Vue from 'vue'
import {
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Popover,
  Dropdown,
  List,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Popconfirm,
  message,
  notification,
  FormModel,
  Avatar
} from 'ant-design-vue'

Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Popconfirm)
Vue.use(notification)
Vue.use(FormModel)
Vue.use(Avatar)
 
Vue.prototype.$message = message
Vue.prototype.$notification = notification