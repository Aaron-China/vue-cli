<template>
  <div class="login-page">
    <div class="login">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="login">
        <a-form-item label="账号">
          <a-input
            style="width: 206px"
            v-decorator="['username', { rules: [{ required: true, message: '请填写账号!' }] }]"
          />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            style="width: 206px"
            v-decorator="['password', { rules: [{ required: true, message: '请填写密码!' }] }]"
          />
        </a-form-item>
        <div class="item">
          <a-button class="btn" type="primary" @click="login">登陆</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      form: this.$form.createForm(this, { name: 'login' }),
    }
  },
  methods: {
    login() {
      this.form.validateFieldsAndScroll((error, values) => {
        if (!error) {
          let permission = [
            { type: 'menu', path: '/report', key: '' },
            { type: 'btn', path: '/report', key: 'add' },
            { type: 'btn', path: '/report', key: 'delete' },
            { type: 'btn', path: '/report', key: 'export' },
            { type: 'menu', path: '/setting/user/add' },
            { type: 'menu', path: '/setting/user/edit' },
            { type: 'menu', path: '/setting/user/delete' },
            { type: 'menu', path: '/setting/role' },
            { type: 'menu', path: '/login' },
          ], auth = {};
          permission.filter(item => item.type === 'btn').forEach(item => {
            if(auth[item.path]) {
              auth[item.path][item.key] = true
            } else {
              auth[item.path] = {}
            }
          })
          this.$store.commit('app/setUser', {
            user: { id: 1186, name: '张三' },
            permission,
            auth
          })
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .login {
    position: absolute;
    top: 20%;
    right: 10%;
    width: 300px;
    padding: 30px 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    .item {
      width: 100%;
      text-align: center;
      margin-top: 15px;
      .btn {
        width: 60%;
        margin: 0 auto;
      }
    }
  }
}
</style>
