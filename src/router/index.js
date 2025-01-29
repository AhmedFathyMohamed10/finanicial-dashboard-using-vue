import Vue from 'vue'
import VueRouter from 'vue-router'
import Overview from '../views/Overview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/overview'
  },
  {
    path: '/overview',
    name: 'OverviewDashboard',
    component: Overview
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileSettings.vue')
  },
  {
    path: '/projects',
    name: 'ProjectsList',
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/missions',
    name: 'Missions',
    component: () => import('../views/Missions.vue')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('../views/Feedback.vue')
  },
  {
    path: '/earnings',
    name: 'Earnings',
    component: () => import('../views/Earnings.vue')
  },
  {
    path: '/withdrawals',
    name: 'Withdrawals',
    component: () => import('../views/Withdrawings.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/billing-subscriptions',
    name: 'BillingSubscriptions',
    component: () => import('../views/BillingSubscriptions.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../views/Reports.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router