import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from '@/helpers/cookie/Cookie'
import {commit} from '@/store'
import Account from './routes/accout'
import Auth from './routes/auth'
import Board from './routes/board'

Vue.use(VueRouter)

const routes = [
    ...Auth,
    ...Account,
    ...Board,
    {
        path: '/',
        name: 'index',
        component: () => import('@/pages/index.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/components/404NotFound.vue')
    },
    {path: '*', redirect: {name: '404'}}
]

const router = new VueRouter({mode: 'history', base: process.env.BASE_URL, routes})

router.beforeEach((to, from, next) => {
    const token = Cookie.get('token')
    if (token) commit('user/auth', true)
    else commit('user/auth', false)
    next()
})

export default router
