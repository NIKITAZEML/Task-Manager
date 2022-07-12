import api from '@/helpers/http/api'
import {Task, TaskHistory, TaskIcon} from '@/interfaces/task'
import {sortByABC} from '@/helpers/utils'

import TaskFileService from '@/services/TaskFileService'

class TaskService {

    private taskFileService

    constructor() {
        this.taskFileService = TaskFileService
    }

    async getById(id: number): Promise<Task> {
        const res = await api.get(`/task/${id}/`)
        const task: Task = res.data
        console.log(task)
        return task
    }

    async getAll(): Promise<Task[]> {
        const res = await api.get('/task/search/')
        return <Task[]>res.data
    }

    async create(id: number, payload: Task): Promise<Task> {
        const {files} = payload
        const res = await api.post(`/board/${id}/create-task/`, payload)
        const task: Task = res.data

        if (files) await this.taskFileService.uploadAll(task.id, files)
        return task
    }

    async update(id: number, payload: Task): Promise<Task> {
        const res = await api.put(`/task/${id}/`, payload)
        return <Task>res.data
    }

    async delete(id: number): Promise<any> {
        const res = await api.delete(`/task/${id}/`)
        return <Task>res.data
    }

    async getAllWhereResponsible(id: number): Promise<Task[]> {
        const res = await api.get(`/board/${id}/my-tasks/`)
        return <Task[]>res.data
    }

    async move(id: number, payload): Promise<any> {
        const res = await api.post(`/board/${id}/my-tasks/`, payload)
        return res.data
    }

    async getHistory(id: number): Promise<TaskHistory[]> {
        const res = await api.get(`/task/${id}/changelogs/`)
        const history: TaskHistory[] = res.data
        return history
    }

    async getIcons(): Promise<TaskIcon[]> {
        const res = await api.get('/icons/')
        let icons: TaskIcon[] = res.data
        if (icons.length) icons = sortByABC(icons, 'description')
        return icons
    }

}

export default new TaskService()
