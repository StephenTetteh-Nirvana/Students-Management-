import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import AddStudent from '../views/AddStudent.vue'
import EditStudent from '../views/EditStudent.vue'

import Database from '../views/DataBase.vue'


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/database',
    name: 'DataBase',
    component: Database
  },
  {
    path: '/login',
    name: 'LoginPage',
    component:LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/add',
    name: 'AddStudent',
    component:AddStudent
  },
  {
    path: '/edit/:studentId',
    name: 'EditStudent',
    component: EditStudent,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
