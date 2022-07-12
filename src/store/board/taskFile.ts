import TaskFileService from '@/services/TaskFileService'
import {Task, TaskFile} from '@/interfaces/task'

const namespaced = true

const state = {
    files: [] as TaskFile[]
}

const actions = {
    async uploadAll(ctx, {id, files}) {
        try {
            await TaskFileService.uploadAll(id, files)
        } catch (e) {throw e}
    },
    async upload(ctx, {id, file}) {
        try {
            const task: Task = await TaskFileService.upload(id, file)
            const {files} = task
            ctx.commit('setFiles', files)
        } catch (e) {throw e}
    },
    async delete(ctx, {id, fileId}) {
        try {
            await TaskFileService.delete(id, fileId)
            ctx.commit('delete', fileId)
        } catch (e) {throw e}
    }
}

const mutations = {
    add: (state, payload) => state.files.push(payload),
    delete: (state, id) => state.files = state.files.filter(file => file.id !== id),
    setFiles: (state, payload) => state.files = payload
}

const getters = {getFiles: state => state.files}

export default {namespaced, state, actions, mutations, getters}
