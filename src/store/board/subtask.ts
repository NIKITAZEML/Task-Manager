import SubtaskService from '@/services/SubtaskService'
import SubtaskExecutorService from '@/services/SubtaskExecutorService'
import {Subtask} from '@/interfaces/subtask'

export default {
    namespaced: true,
    state: () => ({
        subtasks: [] as Subtask[]
    }),
    actions: {
        async create(ctx, {taskId, subtask}) {
            try {
                const newSubtask: Subtask = await SubtaskService.create(taskId, subtask)
                ctx.commit('add', newSubtask)
            } catch (e) {console.log(e)}
        },
        async update(ctx, {taskId, subtask}) {
            try {
                const newSubtask: Subtask = await SubtaskService.update(taskId, subtask)
                ctx.commit('update', newSubtask)
            } catch (e) {console.log(e)}
        },
        async delete(ctx, {taskId, subtaskId}) {
            try {
                const subtask: Subtask = await SubtaskService.delete(taskId, subtaskId)
                ctx.commit('delete', subtaskId)
            } catch (e) {console.log(e)}
        },
        async deleteAll(ctx, taskId) {
            try {
                await SubtaskService.deleteAll(taskId)
                ctx.commit('setSubtasks', [])
            } catch (e) {console.log(e)}
        },
        async deleteExecutor(ctx, {subtaskId, executorId}) {
            try {
                await SubtaskExecutorService.delete(subtaskId, executorId)
                ctx.commit('deleteExecutor', {subtaskId, executorId})
            } catch (e) {console.log(e)}
        }
    },
    mutations: {
        update: (state, payload) => state.subtasks.forEach(subtask => (subtask.id === payload.id ? subtask = payload : null)),
        add: (state, payload) => state.subtasks.push(payload),
        delete: (state, id) => state.subtasks = state.subtasks.filter(subtask => subtask.id !== id),
        deleteExecutor: (state, {subtaskId, executorId}) => {
            const subtask = state.subtasks.find(t => t.id === subtaskId)
            subtask.executors = subtask.executors.filter(e => e.id !== executorId)
        },
        setSubtasks: (state, payload) => state.subtasks = payload
    },
    getters: {
        getSubtasks: state => state.subtasks
    }
}
