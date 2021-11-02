<template>
  <div class="c-menu" :style="{ width: width }">
    <div class="header">XXS</div>
    <div class="contain">
      <!-- 一级菜单 -->
      <div 
        class="m1"
        v-for="m1 in list"
        :key="m1.name"
      >
        <div @click="(e) => handleClick(e, 0, m1)">
          <div :class="{'row': true, 'row1': true, 'actLine': actLine(m1), 'active': row(m1)}">
            {{m1.title}}
            <a-icon class="open" v-if="m1.children && m1.children.length" :type="icon(m1.name)" />
          </div>
          <!-- 二级菜单 -->
          <div :class="{'item': true, 'active': children(m1)}">
            <div 
              v-for="m2 in m1.children"
              :key="m2.name"
            >
              <div @click="(e) => handleClick(e, 1, m2)">
                <div :class="{'row': true, 'row2': true, 'active': row(m2)}">
                  {{m2.title}}
                  <a-icon class="open" v-if="m2.children && m2.children.length" :type="icon(m2.name)" />
                </div>
                <!-- 三级菜单 -->
                <div :class="{'item': true, 'active': children(m2)}">
                  <div 
                    v-for="m3 in m2.children"
                    :key="m3.name"
                  >
                    <div @click="(e) => handleClick(e, 2, m3)">
                      <div :class="{'row': true, 'row3': true, 'active': row(m3)}">{{m3.title}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-menu',
  props:{
    width: {     // 宽度
      type: String,
      default: '250px'
    },
    list: {     // 菜单列表
      type: Array,
      default: []
    },
    active: {   // 值
      type: String,
      default: ''
    },
    change: {   // 菜单变化的回调
      type: Function
    },
  },
  data(){
    return {
      activeKeys: '',   // 当前激活菜单链
      activeKey: '',    // 当前激活菜单
    }
  },
  watch:{
    activeKeys(d) {
      this.activeKeys = d
    },
    active(d) {
      this.activeKey = d
    }
  },
  computed:{},
  mounted () {
  },
  methods:{
    // icon激活状态
    icon(d) {
      return this.activeKeys.indexOf(d) >= 0 ? 'down' : 'right'
    },
    // 有子菜单的一级菜单。加一个竖线
    actLine(d) {
      return this.activeKeys.indexOf(d.name) >= 0
    },
    // 子菜单菜单激活状态
    children(d) {
      return d.children && d.children.length && (this.activeKeys.indexOf(d.name) >= 0)
    },
    // 菜单激活状态
    row(d) {
      return this.activeKey === d.name
    },
    // 菜单点击
    handleClick(e, idx, d) {
      e.stopPropagation(); 
      let arr = this.activeKeys.split('-');
      let flag = arr.some(item => item === d.name);
      // 已存在
      if(flag) {
        if(idx === 0) {
          arr = []
        } else if(idx === 1) {
          arr[1] = ''
          arr[2] = ''
        }
      } else {
        arr[idx] = d.name
      }
      this.activeKeys = arr.join('-')
      // 没有子菜单，需跳转页面
      if(!(d.children && d.children.length)) {
        this.activeKey = d.name
        this.$router.push(d.path)
        this.$emit('change', d)
      }
    }
  },
}
</script>

<style lang="less" scoped>
  .c-menu {
    height: 100vh;
    background-color: #4065e0;
    color: #fff;
    font-size: 16px;
    .header {
      font-size: 50px;
      text-align: center;
      line-height: 70px;
    }
    .contain {
      height: calc(100vh - 70px);
      overflow: auto;
      .row {
        padding: 14px 5px 14px 10px;
        cursor: pointer;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        .open {
          font-size: 13px;
          position: absolute;
          top: 20px;
          right: 10px;
          z-index: 9;
        }
        &:hover {
          color: @active;
          background-color: #2546B1;
        }
      }
      .actLine {
        border-left: 2px solid #00f6f0;
      }
      .row2 {
        padding-left: 20px;
      }
      .row3 {
        padding-left: 30px;
      }
      .row.active {
        color: #00F6F0;
        background-color: #2546B1;
      }
      .item {
        height: 0px;
        overflow: hidden;
      }
      .item.active {
        height: auto;
        background-color: #2C4EBE;
      }
    }
  }
</style>
