import CommentService from '@/services/CommentService'
import {Comment} from '@/interfaces/task'

export const namespaced = true

const state = {
    comments: [] as Comment[]
}

const actions = {
    async create(ctx, {taskId, comment}) {
        const newComment: Comment = await CommentService.create(taskId, comment)
        ctx.commit('add', newComment)
    },
    async update(ctx, {taskId, comment}) {
        const newComment: Comment = await CommentService.update(taskId, comment)
        ctx.commit('update', newComment)
    },
    async delete(ctx, {taskId, commentId}) {
        await CommentService.delete(taskId, commentId)
        ctx.commit('delete', commentId)
    }
}

const mutations = {
    add: (state, payload) => state.comments.push(payload),
    update: (state, payload) => state.comments.forEach(comment => (comment.id === payload.id ? comment = payload : null)),
    delete: (state, id) => state.comments = state.comments.filter(comment => comment.id !== id),
    setComments: (state, payload) => state.comments = payload
}

const getters = {
    getComments: state => state.comments
}

export default {namespaced, state, actions, mutations, getters}
