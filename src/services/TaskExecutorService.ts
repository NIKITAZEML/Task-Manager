import {TaskExecutor} from '@/interfaces/task'
import api from '@/helpers/http/api'

class TaskExecutorService {

    async delete(id: number, executorId: number): Promise<any> {
        const res = await api.post(`/task/${id}/delete-executor/`, {id: executorId})
        return res.data
    }

}

export default new TaskExecutorService()
