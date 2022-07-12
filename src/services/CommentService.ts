import api from '@/helpers/http/api'
import {Comment} from '@/interfaces/task'

class CommentService {

    async create(id: number, payload: Comment): Promise<Comment> {
        const res = await api.post(`/task/${id}/comment/`, payload)
        return <Comment>res.data
    }

    async update(id: number, payload: Comment): Promise<Comment> {
        const res = await api.put(`/task/${id}/comment/`, payload)
        return <Comment>res.data
    }

    async delete(id: number, commentId: number): Promise<any> {
        const res = await api.delete(`/task/${id}/comment/`, {data: {id: commentId}})
        return res.data
    }

}

export default new CommentService()
