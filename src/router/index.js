import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import SignUp from '../views/SignUp.vue'
import LoginTodo from '../views/LoginTodo'
import Todo from '../views/Todo'

// const checkDetails = (to, from, next) => {
//   const localDetails = localStorage.getItem('userDetails')
//   if (localDetails) {
//     next()
//     return
//   }
//   next('/login')
// }
const routes = [
  {
    path: '/',
    name: 'LoginTodo',
    component: LoginTodo
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo,
    // beforeEnter: checkDetails
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
