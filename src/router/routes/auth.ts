import {redirect} from '@/middleware/middleware'

export default [
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/pages/auth/login/index.vue'),
        ...redirect
    },
    {
        path: '/auth/signup',
        name: 'signup',
        component: () => import('@/pages/auth/signup/index.vue'),
        ...redirect
    },
    {
        path: '/auth/password_restore',
        name: 'passwordRestore',
        component: () => import('@/components/Auth/PasswordRestore.vue'),
        ...redirect
    }
]
