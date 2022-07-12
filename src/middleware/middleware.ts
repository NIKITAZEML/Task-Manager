import {getters} from '@/store'

export const middleware = {
    beforeEnter(to, from, next) {
        if (!getters['user/auth']) next({name: 'index'})
        else next()
    }
}

export const redirect = {
    beforeEnter: (to, from, next) => {
        if (getters['user/auth']) next({name: 'index'})
        else next()
    }
}
