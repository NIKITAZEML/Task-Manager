import './router/hooks'
import './sw'
import Vue from 'vue'
import {Role} from '@/interfaces/user'
import {EventSystem, TaskModalPayloadContext, ModalAction} from '@/config/event'
import {BOARD_REPRESENTATION} from '@/config/app'
import {v4 as uuid} from 'uuid'
import './plugins/bootstrap'
import focus from '@/directives/v-focus'
import App from './App.vue'
import router from './router'
import store from './store'

export const EventBus = new Vue()

Vue.config.productionTip = false

const contextObjects = {Role, EventBus, EventSystem, ModalAction, TaskModalPayloadContext, uuid, BOARD_REPRESENTATION}

//@ts-ignore
for (const item in contextObjects)
    Vue.prototype[item] = contextObjects[item]
Vue.directive('focus', focus)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
