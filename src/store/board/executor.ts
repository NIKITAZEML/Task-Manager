import {TaskExecutor} from '@/interfaces/task'
import ExecutorService from '@/services/TaskExecutorService'

const namespaced = true

const state = {
    executors: [] as TaskExecutor[]
}

const actions = {
    async delete(ctx, {taskId, executorId}) {
        const res = await ExecutorService.delete(taskId, executorId)
        ctx.commit('delete', executorId)
    }
}

const mutations = {
    add: (state, payload) => {state.executors.push(payload)},
    update: (state, payload) => state.executors.forEach(executor => (executor.id === payload.id ? executor = payload : null)),
    delete: (state, id) => state.executors = state.executors.filter(executor => executor.id !== id),
    setExecutors: (state, payload) => state.executors = payload
}

const getters = {
    getExecutors: state => state.executors
}

export default {namespaced, state, actions, mutations, getters}
