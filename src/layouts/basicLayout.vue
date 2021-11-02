<template>
  <div class="basic-layout">
    <c-menu
      :list="menu"
    />
    <div class="content">
      <div class="header">
        <div class="avatar">
          <a-dropdown placement="bottomLeft">
            <div class="user">
              <a-avatar icon="user" />
              <span class="name">{{user.name || ''}}</span>
            </div>
            <a-menu slot="overlay">
              <a-menu-item @click="logout">退出登录</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
      <div class="body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CMenu from '@components/c-menu'
import { ROUTE } from '@router/menu'
import { filterMenu } from '@utils/util'

export default {
  components: {
    CMenu
  },
  data () {
    return {
      menu: [],    //菜单列表
      permi: [],   // 菜单权限
    }
  },
  computed: {
    ...mapState({
      user: state => state.app.user,
      permission: state => state.app.permission,
    })
  },
  created () {
    // 按权限过滤菜单,转一下json，避免对象原型修改
    let list = [], 
    m = JSON.parse(JSON.stringify(ROUTE[0].children)),
    permi = this.permission.filter(item => item.type === 'menu');
    list = filterMenu(m, permi);
    this.permi = permi
    this.menu = list
    this.controlMenu()
  },
  mounted() {
    console.log(this.user)
  },
  methods: {
    // 菜单权限控制，路由拦截。注意，组件内部拦截，刷新界面、输入地址时，钩子函数不会触发
    controlMenu() {
      // 刷新界面、输入地址时，校验权限
      let flag =  this.permission.some(item => item.path === window.location.pathname);
      if(!flag) {
        this.$router.push('/login')
      }
      this.$router.beforeEach((to, from, next) => {
        let flag =  this.permission.some(item => item.path === to.path);
        if(flag) {
          next();
        } else {
          this.$router.push('/login')
        }
      })
    },
    // 退出登录
    logout() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.basic-layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .content {
    width: 100%;
    .header {
      height: 50px;
      position: relative;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
      .avatar {
        position: absolute;
        right: 10px;
        line-height: 50px;
        cursor: pointer;
        .name {
          padding: 0 10px;
        }
      }
    }
    .body {
      padding: 10px;
    }
  }
}
</style>
