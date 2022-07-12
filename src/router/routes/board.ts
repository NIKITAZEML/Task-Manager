import {middleware} from '@/middleware/middleware'

export default [
    {
        path: '/boards',
        name: 'boards',
        component: () => import('@/pages/boards/index.vue'),
        ...middleware
    },
    {
        path: '/board/:id',
        name: 'board',
        component: () => import('@/pages/board/_id/index.vue'),
        ...middleware
    }
]
