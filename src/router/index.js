import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const My = (resolve) => {
  import('components/my/my').then((module) => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import('components/login/login').then((module) => {
    resolve(module)
  })
}
const Main = (resolve) => {
  import('components/main/index').then((module) => {
    resolve(module)
  })
}
const Order = (resolve) => {
  import('components/order/order').then((module) => {
    resolve(module)
  })
}
const Question = (resolve) => {
  import('components/question/question').then((module) => {
    resolve(module)
  })
}
const Bank = (resolve) => {
  import('components/bank/bank').then((module) => {
    resolve(module)
  })
}
const RebackCash = (resolve) => {
  import('components/rebackCash/rebackCash').then((module) => {
    resolve(module)
  })
}
const Register = (resolve) => {
  import('components/register/register').then((module) => {
    resolve(module)
  })
}

export default new Router({
  linkActiveClass: 'menuActive',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/my',
      component: My
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/main',
      component: Main
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/question',
      component: Question
    },
    {
      path: '/bank',
      component: Bank
    },
    {
      path: '/rebackCash',
      component: RebackCash
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
