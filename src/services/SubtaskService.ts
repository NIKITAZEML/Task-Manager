import {Subtask} from '@/interfaces/subtask'
import api from '@/helpers/http/api'

class SubtaskService {

    async create(id: number, payload: Subtask): Promise<Subtask> {
        const res = await api.post(`/task/${id}/checkpoint/`, payload)
        return <Subtask>res.data
    }

    async update(id: number, payload: Subtask): Promise<Subtask> {
        const res = await api.put(`/task/${id}/checkpoint/`, payload)
        return <Subtask>res.data
    }

    async delete(id: number, subtaskId: number): Promise<any> {
        const res = await api.delete(`/task/${id}/checkpoint/`, {data: {id: subtaskId}})
        return <Subtask>res.data
    }

    async deleteAll(id: number): Promise<any> {
        const res = await api.delete(`/task/${id}/clear-checkpoints/`)
        return res.data
    }

}

export default new SubtaskService()
