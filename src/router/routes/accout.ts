import {middleware} from '@/middleware/middleware'

export default [
    {
        path: '/account/settings',
        name: 'account.settings',
        component: () => import('@/pages/account/settings/index.vue'),
        ...middleware
    }
]
