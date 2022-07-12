import {Project} from '@/interfaces/project'
import ProjectFileService from '@/services/ProjectFileService'

const namespaced = true

const state = {
    files: []
}

const actions = {
    async uploadAll(ctx, {id, files}) {
        try {
            await ProjectFileService.uploadAll(id, files)
        } catch (e) {throw e}
    },
    async upload(ctx, {id, file}) {
        try {
            const project: Project = await ProjectFileService.upload(id, file)
            const {files} = project
            ctx.commit('setFiles', files)
        } catch (e) {throw e}
    },
    async delete(ctx, {id, fileId}) {
        try {
            await ProjectFileService.delete(id, fileId)
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
