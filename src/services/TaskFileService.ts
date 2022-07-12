import api from '@/helpers/http/api'
import {Task} from '@/interfaces/task'

class TaskFileService {

    async uploadAll(id: number, files): Promise<Task> {
        const body = new FormData()
        files.map(file => (!file.task ? body.append('files', file, file.name) : null))
        const res = await api.put(`/task/${id}/`, body)
        return <Task>res.data
    }

    async upload(id: number, file): Promise<Task> {
        const body = new FormData()
        body.append('files', file, file.name)
        const res = await api.put(`/task/${id}/`, body)
        return <Task>res.data
    }

    async delete(id: number, fileId): Promise<any> {
        return api.delete(`/task/${id}/delete-file/`, {data: {id: fileId}})
    }

}

export default new TaskFileService()
